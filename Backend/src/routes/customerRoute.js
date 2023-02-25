const express = require('express')
const router = express.Router()
const admin = require('../config/firebase-config')
const Customer = require('../models/Customer')
const Feedback = require('../models/Feedback')
const Order = require('../models/Order')
const Product = require('../models/Products')

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
        console.log(e)
        if(e.code==='auth/id-token-expired'){
            return res.status(401).send("Token Expired")
        }
        return res.json({
            message: "Internal Error"
        })
    }
}

router.get("/user", decodeToken, async (req, res) => {
    //Sorting by FName default, new route for search user by name
    let allCust = req.query.allCust
    try{
        //console.log(req.decodeToken.uid)
        let users
        if(allCust === false){
            users = await Customer.findById(req.decodeToken.uid)
        }
        else if(allCust = true){
            users = await Customer.find().sort({FName: 1})
        }
        res.status(200).json({
            data: users
        })
    }
    catch(e){
        console.log(err)
        res.status(400).json({
            message: err.message
        })
    }
})

router.get("/user/:FName", decodeToken, async (req, res) => {
    try{
        var users = await Customer.find({FName: req.params.FName})
        res.status(200).send(users)
    }
    catch(e){
        console.log(e)
        res.status(400).json({
            message: e.message
        })
    }
})


router.get("/frontendOrders", decodeToken, async (req, res) => {
    let orders
    try{
        orders = await Order.find({$and: [{CustomerId : req.decodeToken.uid}, {$or:[{Status: 'Success'},{Status: 'Failed'}]}]}, {razorpayPaymentID: 0, razorpaySignature: 0, Notes: 0, Receipt: 0, Currency: 0}).sort({_id: -1})
        return res.status(200).send(orders)
    }
    catch(e){
        res.status(400).send(e.message)
    }
})

router.get("/userAddr", decodeToken, async (req, res) => {
    let orders
    try{
        orders = await Order.find({$and: [{CustomerId : req.decodeToken.uid}, {$or:[{Status: 'Success'},{Status: 'Failed'}, {deliveryStatus:'Pending'}]}]}, {Address:1, Name:1, PhoneNumber:1}).sort({_id: -1})
        return res.status(200).send(orders)
    }
    catch(e){
        res.status(400).send(e.message)
    }
})


router.get("/allOrders", decodeToken, async(req, res) => {
    let dbAdmin = await Customer.findOne({email: req.decodeToken.email})
    console.log("ADMINNNNNN" , dbAdmin)
    console.log("isadmiNNNNNNNN" , dbAdmin.isAdmin)
    if(dbAdmin.isAdmin === false){
        return res.status(401).send("NOT ADMIN")
    }
    
    let orders
    try{
        orders = await Order.find({$or:[{Status: 'Success'},{Status: 'Failed'}]}, {razorpayPaymentID: 0, razorpaySignature: 0, Notes: 0, Receipt: 0, Currency: 0})
        return res.status(200).send(orders)
    }
    catch(e){
        res.status(400).send(e.message)
    }
})

router.get("/userOrders", decodeToken, async (req, res) => {
    let dbAdmin = await Customer.findOne({email: req.decodeToken.email})
    console.log("ADMINNNNNN" , dbAdmin)
    console.log("isadmiNNNNNNNN" , dbAdmin.isAdmin)
    if(dbAdmin.isAdmin === false){
        return res.status(401).send("NOT ADMIN")
    }

    let orders
    try{
        orders = await Order.find({_id : req.query.orderid}, {_id: 1, Name: 1, PhoneNumber: 1, CreatedOn: 1, OrderDetails: 1, Address: 1})
        return res.status(200).send(orders)
    }catch(e){
        res.status(400).send(e.message)
    }
})
// router.get("/adminorders", decodeToken, async (req, res) => {
//     let orders
//     try{
//         orders = await Order.fin()
//     }
// })

router.get("/feedback", decodeToken, async (req, res) => {
    let dbAdmin = await Customer.findOne({email: req.decodeToken.email})
    console.log("ADMINNNNNN" , dbAdmin)
    console.log("isadmiNNNNNNNN" , dbAdmin.isAdmin)
    if(dbAdmin.isAdmin === false){
        return res.status(401).send("NOT ADMIN")
    }

    try{
        let feedback = await Feedback.find().sort({_id: -1})
        return res.status(200).send(feedback)
    }
    catch(e){
        return res.status(400).send(e.message)
    }
    
})

router.post("/feedback", decodeToken, async (req, res) => {
    let feedback
    let order
    try{
        feedback = await Feedback.find({OrderId: req.body.orderId})
        //console.log(feedback)
        console.log(req.body)
        order = await Order.findById(req.body.orderId)
        console.log(order)
        if(feedback.length !== 0 || order.deliveryStatus !== "Delivered"){
            return res.status(401).send("Cannot Submit Feedback")
        }
        feedback = new Feedback({
            CustomerId: req.decodeToken.uid ,
            CustomerEmail: req.decodeToken.email ,
            FeedbackText: req.body.feedback,
            OrderId: req.body.orderId
        })  
        console.log(feedback)
        feedback = await feedback.save()
        order.feedback = true
        order.save()
        // for(const product of req.body.ProductRating){
        //     console.log(product)
        //     let pid = product.pid
        //     let rating = product.rating
        //     let dbProduct = await Product.findById(pid)
        //     dbProduct.ratingTotal = dbProduct.ratingTotal + rating
        //     dbProduct.noOfRaters += 1
        //     dbProduct.save()
        // }
        res.status(200).send("FEEDBACK TAKEN")
    }
    catch(e){
        res.status(400).send(e.message)
    }
})

router.post("/productRating", decodeToken, async(req, res) => {
    try{
        console.log("REQ BODY RATING", req.body);
        let pid = req.body.pid
        let rating = req.body.rating
        let dbProduct = await Product.findById(pid)
        dbProduct.ratingTotal = dbProduct.ratingTotal + rating
        dbProduct.noOfRaters += 1
        dbProduct.save()
        res.status(200).send("OK")
    }
    catch(e){
        res.status(400).send(e.message)
    }
})

router.patch("/status", decodeToken, async (req, res) => {
    let dbAdmin = await Customer.findOne({email: req.decodeToken.email})
    console.log("ADMINNNNNN" , dbAdmin)
    console.log("isadmiNNNNNNNN" , dbAdmin.isAdmin)
    if(dbAdmin.isAdmin === false){
        return res.status(401).send("NOT ADMIN")
    }
    let order
    try{
        order = await Order.findById(req.query.orderid)
        order.deliveryStatus = req.query.status
        order.save()
        return res.status(200).send(order)
    }
    catch(e){
        res.status(400).send(e.message)
    }
})

router.patch("/user", decodeToken, async (req, res) => {
    try{
        var user = await Customer.findById(req.query.uid)
        user.FName = req.query.FName ? req.query.FName : user.FName
        user.LName = req.query.LName ? req.query.LName : user.LName
        user.PhoneNumber = req.query.PhoneNumber ? req.query.PhoneNumber : user.PhoneNumber
        user = user.save()
        return res.status(200).json({
            data: user,
            updateSuccessful: true
        })
    }
    catch(e){
        console.log(err.message)
        res.status(400).json({
            message: err.message
        })
    }
})

module.exports = router