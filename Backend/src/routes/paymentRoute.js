const Razorpay = require("razorpay");
const express = require("express");
const uuid = require("uuid");
const crypto = require("crypto");
const Product = require('../models/Products');
const Order = require("../models/Order");
const Customer = require('../models/Customer')
const admin = require('../config/firebase-config')
const dayjs = require('dayjs');
const { getMaxListeners } = require("process");

const router = express.Router();

const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

const mailjet = require("node-mailjet").connect(
  "6f97dc0e783f9f371b613a40402e0ab2",
  "2f31cfa8d9ab802ca565dc625c599584"
);

async function decodeToken(req, res, next){
  const token = req.headers.authorization.split(" ")[1]
  try{
      const decodeValue = await admin.auth().verifyIdToken(token)
      if(decodeValue){
          req.decodeToken = decodeValue
          return next()
      }
      return res.json({
          message: "Unauthorized"
      })
  }
  catch(e){
      if(e.code==='auth/id-token-expired'){
        return res.status(401).send("Token Expired")
      }
      console.log(e)
      return res.json({
          message: "Internal Error"
      })
  }
}

async function mail(Order){
  console.log("ORDER VALUE", Order)
  console.log("ORDER DETAILS", Order.OrderDetails)
  let order = []
  for(const product of Order.OrderDetails){
    let ordervalue = {
      name: product.productName,
      quantity: product.productQty,
      price: product.Price
    }
    order.push(ordervalue)
  }
  console.log("Order Details", order)
  let Address = Order.Address.HouseNo + ' ' + Order.Address.Street + ' ' + Order.Address.Area + ' ' + Order.Address.City
  console.log(Address)
  const request = mailjet.post("send", { version: "v3.1" }).request({
    Messages: [
      {
        From: {
          Email: "balajinursery02@gmail.com",
          Name: "Balaji Nursery & Farms"
        },
        To: [
          {
            Email: Order.CustomerEmail,
            Name: Order.Name
          },
        ],
        TemplateID: 3887363,
        TemplateLanguage: true,
        Subject: "Order Summary",
        Variables: {
          order: order,
          cname: Order.Name,
          id: Order._id,
          date: Order.CreatedOn,
          address: Address,
          pno: Order.PhoneNumber,
          total: parseInt(Order.Amount)/100,
          paymode: Order.paymentMethod
        },
      },
    ],
  });
  request
  .then((result) => {
    console.log(result);
  })
  .catch((err) => {
    console.log(err);
  });
}

async function calculateAmount(req, res, next){
  try{
    let cart = req.body.Cart
    console.log("CART", cart)
    let cartAmount = 0
    await Promise.all( cart.map(async(product) => {
        const dbProduct = await Product.findById(product.productId)
        const price = dbProduct.Price
        cartAmount += price * product.productQty * 100 //Conversion for Rupee To Paise
        product.Price = price
        console.log("PPPRICE", price);
    }))
    req.totalAmount = cartAmount
    return next()
  }
  catch(e){
      console.log(e)
  }
}

async function saveID(orderID, uid){
  let customer = await Customer.findById(uid)
  customer.Orders.push(orderID)
  console.log("CUSTOMER ORDER VALUE",customer.Orders)
  customer.save()
}

async function deleteFromInventory(OrderDetails){
  console.log("INSIDE INVENTORY FUNCTION")
  await Promise.all( OrderDetails.map(async(product) => {
    console.log("PROD",product)
    const dbProduct = await Product.findById(product.productId)
    console.log("DBPROD", dbProduct)
    console.log("DBPRODQTY",dbProduct.Quantity)
    dbProduct.Quantity = parseInt(dbProduct.Quantity) - product.productQty
    console.log("DBPRODQTY1",dbProduct.Quantity)
    dbProduct.save()
}))
  console.log("END OF INVENTORY FUNCTION")
}

router.get("/test", async(req, res) => {
  let order = await Order.findById("order_JLvnm6c1Gdu99R")
  mail(order)
  res.status(200).send("OK")
})

router.post("/create-order", decodeToken, calculateAmount, async (req, res) => {
    try{

        let cart = req.body.Cart
        // console.log("CARTTT", cart)
        // let cartAmount = 0
        // const calcAmount = cart.reduce(
        //   (cartAmount, product) => cartAmount + abcd(product)
        // )
        // const abcd = async (product) => {
        //     const dbProduct = await Product.findById(product.productId)
        //     const price = dbProduct.Price
        //     let finalAmt = 0
        //     finalAmt += price * product.productQty * 100 //Conversion for Rupee To Paise
        //     product.Price = price
        //     return finalAmt
        // }
        // // cart.forEach(product => {
        // //     abcd(product)
        // // })


        let cartAmount = req.totalAmount
        console.log("CARTAMTTTT", cartAmount)
        const options = {
            amount: cartAmount,
            currency: "INR",
            receipt: `receipt_order_${uuid.v4().split("-")[0]}`,
            notes: "Payment"
        }
        const MainOrder = await instance.orders.create( options, (error, order) => {
          console.log("CARATATAT", cart)
          console.log("INSIDE ORDER", order)
          let saveOrder = new Order({
              _id: order.id,
              CustomerId: req.decodeToken.uid,
              CustomerEmail: req.decodeToken.email,
              Name: req.body.Name,
              PhoneNumber: req.body.PhoneNumber,
              OrderDetails: cart,
              Amount: order.amount,
              Address: req.body.Address, //NewFormat {Name, ContactNo, HouseNo, Street, Area, City, PinCode, District}
              CreatedOn: dayjs().format('DD/MM/YYYY:HH-mm-ss').toString(), //Use New JS Library
              Currency: options.currency,
              Receipt: options.receipt,
              Notes: options.notes,
              Status: "Created",
              deliveryStatus: "Pending"
              //Check if need to store razorpaysignature or not
          })
          console.log("SAVE ORDER", saveOrder)
          saveOrder.save()
          console.log("FINALSAVE ORDER", saveOrder)

          saveID(saveOrder._id, req.decodeToken.uid)
          
          if(error){
              console.log("PAyment Error",error)
              return res.status(400).send(error)
          }
          return res.status(200).send(order) //send phone number too
        })
    }
    catch(e){
        return res.status(400).json({
            message: e.message
        })
    }
})


/*router.get("/create-orders/:productId", async (req, res) => {
  const { productId } = req.params;
  const getProduct = product.find((produce) => produce.id == productId);
  const amount = getProduct.price * 100;
  const currency = "INR";
  let receiptId = `receipt_order_${uuid.v4().split("-")[0]}`;
  const receipt = receiptId;
  const notes = { desc: getProduct.name };
  const order = await instance.orders.create(
    { amount, currency, receipt, notes },
    (error, order) => {
      order_id = order.id;
      let ordersave;
      const saveOrders = new orderSchema(order)
      ordersave = saveOrders.save()
      if (error) {
        return res.status(500).json(error);
      }
      return res.status(200).json(order);
    }
  );
  //res.json(order);
});
*/

// router.post("/store-order", (req, res) => {
//   try {
//     const data = req.body;
//     saveTxn(data)
//       .then((resp) => {
//         res.status(200).send(resp);
//       })

//       .catch((err) => {
//         console.log(err, "savetxn");
//         res.status(400).send(err);
//       });
//   } catch (error) {
//     res.status(500).send(error);
//     console.log(error,"500");
//   }
// });

router.post("/success", async (req, res) => {
  //Delete Inventory when payment is done.
    try{
        const {
            orderCreationID,
            razorpayPaymentID,
            razorpayOrderID,
            razorpaySignature,
          } = req.body;

        const shasum = crypto.createHmac(
        "sha256",
        `${process.env.RAZORPAY_SECRET}`
        );
        shasum.update(`${orderCreationID}|${razorpayPaymentID}`);
        const digest = shasum.digest("hex");
        // console.log(digest, "digest");
        // console.log(orderCreationID, "orderid");
        // console.log(razorpayPaymentID, "payid");
        // console.log(razorpaySignature, "razorpaysign");
        // console.log(req.body);
        
        if (digest !== razorpaySignature){
            return res.status(400).json({ msg: "Transaction is not valid" });
        }
        
        let paymentMethod = await instance.orders.fetchPayments(razorpayOrderID)
        //console.log("PAYMENT METHOD", paymentMethod.items[0].method)  

        let saveOrder = await Order.findById(razorpayOrderID)
      
        //console.log(saveOrder)
        // let cart = saveOrder.OrderDetails
        // await Promise.all(cart.map(async(product) => {
        //     const dbProduct = await Product.findById(product.productId)
        //     dbProduct.Quantity -= product.productQty
        //     dbProduct.save()
        // }))
        saveOrder.Status = "Success"
        saveOrder.paymentMethod = paymentMethod.items[0].method
        saveOrder.razorpayPaymentID = razorpayPaymentID
        saveOrder.razorpaySignature = razorpaySignature
        deleteFromInventory(saveOrder.OrderDetails)
        saveOrder.save()
        
        // let customer = Customer.findById(saveOrder.CustomerId)
        // customer.Cart = []
        // console.log("CAAAAAAAAAAAARRTTTTTT", customer.Cart)
        // customer.save()
        
        mail(saveOrder)
        console.log("FINAL SAVEORDER", saveOrder)
        return res.status(200).send({
            msg: "Success",
            orderId: saveOrder._id,
            CustomerId: saveOrder.CustomerId,
            Amount: saveOrder.Amount,
            Receipt: saveOrder.Receipt,
            TransactionId: saveOrder.razorpayPaymentID,
            OrderID: saveOrder._id,
            Name: saveOrder,
            CreatedOn: saveOrder.CreatedOn,
            Address: saveOrder.Address,
            OrderDetails: saveOrder.OrderDetails,
            PhoneNumber: saveOrder.PhoneNumber
        })
    }
    catch(e){
        res.status(400).send(e)
    }
})

router.post('/failure', async (req, res) => {
  try{
    let orderId = req.body.orderId
    let saveOrder = await Order.findById(orderId)
    saveOrder.Status = "Failed"
    saveOrder.save()
    res.status(200).send("ok")
  }
  catch(e){
    res.status(400).send(e)
  }
})
/*
router.post("/success", async (req, res) => {
  try {
    const {
      orderCreationID,
      razorpayPaymentID,
      razorpayOrderID,
      razorpaySignature,
    } = req.body;
    const shasum = crypto.createHmac(
      "sha256",
      `${process.env.RAZORPAY_SECRET}`
    );
    shasum.update(`${orderCreationID}|${razorpayPaymentID}`);
    const digest = shasum.digest("hex");
    console.log(digest, "digest");
    console.log(orderCreationID, "orderid");
    console.log(razorpayPaymentID, "payid");
    console.log(razorpaySignature, "razorpaysign");
    console.log(req.body);
    if (digest !== razorpaySignature)
      return res.status(400).json({ msg: "Transaction is not valid" });

    // const newPayment = req.body;
    let transac;
    const txn = new transactionSchema({
      orderCreationID: req.body.orderCreationID,
      razorpayPaymentID: req.body.razorpayPaymentID,
      razorpayOrderID: req.body.razorpayOrderID,
      razorpaySignature:req.body.razorpaySignature
    });
    transac = await(txn.save())
    res.status(200).json({
      msg: "success",
      orderID: razorpayOrderID,
      paymentID: razorpayPaymentID,
      data: txn
    });
  } catch (error) {
    res.status(500).send(error);
  }
});
*/

module.exports = router;
