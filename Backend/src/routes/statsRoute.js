//TO DELETE ALREADY EXISTS IN PAYMENT ROUTE
const Razorpay = require("razorpay");
const express = require('express')
const router = express.Router()
const admin = require('../config/firebase-config')
const Order = require('../models/Order')
const Products = require('../models/Products')
const Customer = require('../models/Customer')
const dayjs = require('dayjs')
var isBetween = require('dayjs/plugin/isBetween')
dayjs.extend(isBetween)
var customParseFormat = require('dayjs/plugin/customParseFormat')
dayjs.extend(customParseFormat)

const instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET,
  });

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

router.get("/", decodeToken ,async (req, res) => {

    let dbAdmin = await Customer.findOne({email: req.decodeToken.email})
    console.log("ADMINNNNNN" , dbAdmin)
    console.log("isadmiNNNNNNNN" , dbAdmin.isAdmin)
    if(dbAdmin.isAdmin === false){
        return res.status(401).send("NOT ADMIN")
    }

    let orders
    let customers
    let totalRevenue = 0
    let last24hrsRevenue = 0
    let last24hrsOrders = 0
    try{
        orders = await Order.find({Status: 'Success'})
        let currentDate = dayjs().toDate()
        let previousDate = dayjs().subtract(1, 'day').toDate()

        let prWeekDay0 = dayjs().subtract(1, 'week').toDate()
        let prWeekDay1 = dayjs().subtract(6,"day").toDate()
        let prWeekDay2 = dayjs().subtract(5,"day").toDate()
        let prWeekDay3 = dayjs().subtract(4,"day").toDate()
        let prWeekDay4 = dayjs().subtract(3,"day").toDate()
        let prWeekDay5 = dayjs().subtract(2,"day").toDate()
        let prWeekDay6 = dayjs().subtract(1,"day").toDate()

        let prWeek1 = dayjs().subtract(4, 'week').toDate()
        let prWeek2 = dayjs().subtract(3, 'week').toDate()
        let prWeek3 = dayjs().subtract(2, 'week').toDate()
        let prWeek4 = dayjs().subtract(1, 'week').toDate()

        let prMonth01 = dayjs().subtract(11, 'month')
        let prMonth02 = dayjs().subtract(10, 'month')
        let prMonth03 = dayjs().subtract(9, 'month')
        let prMonth04 = dayjs().subtract(8, 'month')
        let prMonth05 = dayjs().subtract(7, 'month')
        let prMonth06 = dayjs().subtract(6, 'month')
        let prMonth07 = dayjs().subtract(5, 'month')
        let prMonth08 = dayjs().subtract(4, 'month')
        let prMonth09 = dayjs().subtract(3, 'month')
        let prMonth10 = dayjs().subtract(2, 'month')
        let prMonth11 = dayjs().subtract(1, 'month')
        let prMonth12 = dayjs()
        
        
        let previous7DaysGraph = {
            "Day1": 0,
            "Day2": 0,
            "Day3": 0,
            "Day4": 0,
            "Day5": 0,
            "Day6": 0,
            "Day7": 0
        }

        let previous4WeekGraph = {
            "Week1": 0,
            "Week2": 0,
            "Week3": 0,
            "Week4": 0
        }

        let previous12MonthGraph = {
            "Month01": 0,
            "Month02": 0,
            "Month03": 0,
            "Month04": 0,
            "Month05": 0,
            "Month06": 0,
            "Month07": 0,
            "Month08": 0,
            "Month09": 0,
            "Month10": 0,
            "Month11": 0,
            "Month12": 0
        }
        
        /*console.log("PREVIOUSDATE",previousDate)
        console.log("CURRENTDATE",currentDate)
        console.log("PREVIOUSWEEK",previousWeek0)
        console.log("PREVIOUSWEEK+1", dayjs().subtract(6,"day").toDate())
        console.log("PREVIOUSWEEK+2", dayjs().subtract(5,"day").toDate())
        console.log("PREVIOUSWEEK+3", dayjs().subtract(4,"day").toDate())
        console.log("PREVIOUSWEEK+4", dayjs().subtract(3,"day").toDate())
        console.log("PREVIOUSWEEK+5", dayjs().subtract(2,"day").toDate())
        console.log("PREVIOUSWEEK+6", dayjs().subtract(1,"day").toDate())
        */

        for(const order of orders){
            //console.log("Direct DB VALUES",order.CreatedOn)
            console.log(order.CreatedOn)
            order.CreatedOnDayjs = dayjs(order.CreatedOn, "DD/MM/YYYY:HH-mm-ss")
            console.log(order.CreatedOnDayjs.$d)
            console.log(order.Amount/100)

            totalRevenue += order.Amount/100

            if(dayjs(order.CreatedOnDayjs.$d).isBetween(previousDate,currentDate)){
                last24hrsRevenue = parseInt(last24hrsRevenue) + order.Amount/100
                console.log("LAST 24 hrs", order.CreatedOn)
            }

            if(dayjs(order.CreatedOnDayjs.$d).isBetween(previousDate,currentDate)){
                last24hrsOrders += 1
            }
            //For last 7 days
            if(dayjs(order.CreatedOnDayjs.$d).isBetween(prWeekDay0,currentDate)){
                if(dayjs(order.CreatedOnDayjs.$d).isBetween(prWeekDay0, prWeekDay1))
                    previous7DaysGraph.Day1 = parseInt(previous7DaysGraph.Day1) + order.Amount/100
                else if(dayjs(order.CreatedOnDayjs.$d).isBetween(prWeekDay1, prWeekDay2))
                    previous7DaysGraph.Day2 = parseInt(previous7DaysGraph.Day2) + order.Amount/100
                else if(dayjs(order.CreatedOnDayjs.$d).isBetween(prWeekDay2, prWeekDay3))
                    previous7DaysGraph.Day3 = parseInt(previous7DaysGraph.Day3) + order.Amount/100
                else if(dayjs(order.CreatedOnDayjs.$d).isBetween(prWeekDay3, prWeekDay4))
                    previous7DaysGraph.Day4 = parseInt(previous7DaysGraph.Day4) + order.Amount/100
                else if(dayjs(order.CreatedOnDayjs.$d).isBetween(prWeekDay4, prWeekDay5))
                    previous7DaysGraph.Day5 = parseInt(previous7DaysGraph.Day5) + order.Amount/100
                else if(dayjs(order.CreatedOnDayjs.$d).isBetween(prWeekDay5, prWeekDay6))
                    previous7DaysGraph.Day6 = parseInt(previous7DaysGraph.Day6) + order.Amount/100
                else if(dayjs(order.CreatedOnDayjs.$d).isBetween(prWeekDay6, currentDate))
                    previous7DaysGraph.Day7 = parseInt(previous7DaysGraph.Day7) + order.Amount/100
                console.log("PREVIOUS 7 DAYS ORDER", order.CreatedOn)
            }

            //For last 4 week
            if(dayjs(order.CreatedOnDayjs.$d).isBetween(prWeek1, currentDate)){
                if(dayjs(order.CreatedOnDayjs.$d).isBetween(prWeek1, prWeek2))
                    previous4WeekGraph.Week1 = parseInt(previous4WeekGraph.Week1) + order.Amount/100
                if(dayjs(order.CreatedOnDayjs.$d).isBetween(prWeek2, prWeek3))
                    previous4WeekGraph.Week2 = parseInt(previous4WeekGraph.Week2) + order.Amount/100
                if(dayjs(order.CreatedOnDayjs.$d).isBetween(prWeek3, prWeek4))
                    previous4WeekGraph.Week3 = parseInt(previous4WeekGraph.Week3) + order.Amount/100
                if(dayjs(order.CreatedOnDayjs.$d).isBetween(prWeek4, currentDate))
                    previous4WeekGraph.Week4 = parseInt(previous4WeekGraph.Week4) + order.Amount/100
                console.log("PREVIOUS 4 WEEK ORDER", order.CreatedOn)
            }

            //For last 12 month
            if(order.CreatedOnDayjs.$y === dayjs().$y || order.CreatedOnDayjs.$y === dayjs().$y-1){
                if(order.CreatedOnDayjs.$M === prMonth01.$M && order.CreatedOnDayjs.$y === prMonth01.$y)
                    previous12MonthGraph.Month01 = parseInt(previous12MonthGraph.Month01) + order.Amount/100
                if(order.CreatedOnDayjs.$M === prMonth02.$M && order.CreatedOnDayjs.$y === prMonth02.$y)
                    previous12MonthGraph.Month02 = parseInt(previous12MonthGraph.Month02) + order.Amount/100
                if(order.CreatedOnDayjs.$M === prMonth03.$M && order.CreatedOnDayjs.$y === prMonth03.$y)
                    previous12MonthGraph.Month03 = parseInt(previous12MonthGraph.Month03) + order.Amount/100
                if(order.CreatedOnDayjs.$M === prMonth04.$M && order.CreatedOnDayjs.$y === prMonth04.$y)
                    previous12MonthGraph.Month04 = parseInt(previous12MonthGraph.Month04) + order.Amount/100
                if(order.CreatedOnDayjs.$M === prMonth05.$M && order.CreatedOnDayjs.$y === prMonth05.$y)
                    previous12MonthGraph.Month05 = parseInt(previous12MonthGraph.Month05) + order.Amount/100
                if(order.CreatedOnDayjs.$M === prMonth06.$M && order.CreatedOnDayjs.$y === prMonth06.$y)
                    previous12MonthGraph.Month06 = parseInt(previous12MonthGraph.Month06) + order.Amount/100
                if(order.CreatedOnDayjs.$M === prMonth07.$M && order.CreatedOnDayjs.$y === prMonth07.$y)
                    previous12MonthGraph.Month07 = parseInt(previous12MonthGraph.Month07) + order.Amount/100
                if(order.CreatedOnDayjs.$M === prMonth08.$M && order.CreatedOnDayjs.$y === prMonth08.$y)
                    previous12MonthGraph.Month08 = parseInt(previous12MonthGraph.Month08) + order.Amount/100
                if(order.CreatedOnDayjs.$M === prMonth09.$M && order.CreatedOnDayjs.$y === prMonth09.$y)
                    previous12MonthGraph.Month09 = parseInt(previous12MonthGraph.Month09) + order.Amount/100
                if(order.CreatedOnDayjs.$M === prMonth10.$M && order.CreatedOnDayjs.$y === prMonth10.$y)
                    previous12MonthGraph.Month10 = parseInt(previous12MonthGraph.Month10) + order.Amount/100
                if(order.CreatedOnDayjs.$M === prMonth11.$M && order.CreatedOnDayjs.$y === prMonth11.$y)
                    previous12MonthGraph.Month11 = parseInt(previous12MonthGraph.Month11) + order.Amount/100
                if(order.CreatedOnDayjs.$M === prMonth12.$M && order.CreatedOnDayjs.$y === prMonth12.$y)
                    previous12MonthGraph.Month12 = parseInt(previous12MonthGraph.Month12) + order.Amount/100
                console.log("PREVIOUS 12 MONTH ORDER", order.CreatedOn)
                console.log()
            }

        }

        customers = await Customer.find()
        let noOfProducts = await Products.find()
        // for(const order of orders){
        //     totalRevenue += order.Amount/100
        // }
        console.log("No Of Orders", orders.length)
        console.log("No Of Customer", customers.length)
        console.log("Total Revenue", totalRevenue)
        console.log("Previous 24 Hrs Revenue", last24hrsRevenue)
        console.log("Day 1",previous7DaysGraph);
        
        return res.status(200).json({
            noOfOrders: orders.length,
            noOfCustomers: customers.length,
            totalRevenue: totalRevenue,
            noOfProducts:noOfProducts.length,
            last24hrsOrders:last24hrsOrders,
            last24hrsRevenue: last24hrsRevenue,
            last7DaysGraph: previous7DaysGraph,
            previous4WeekGraph: previous4WeekGraph,
            previous12MonthGraph: previous12MonthGraph
        })
    }
    catch(e){
        console.log(e)
        return res.status(400).json({
            message: e.message
        })
    }
})

router.get('/pie', decodeToken, async (req, res) => {

    let dbAdmin = await Customer.findOne({email: req.decodeToken.email})
    console.log("ADMINNNNNN" , dbAdmin)
    console.log("isadmiNNNNNNNN" , dbAdmin.isAdmin)
    if(dbAdmin.isAdmin === false){
        return res.status(401).send("NOT ADMIN")
    }
    console.log("PIE ROUTE CALLED")
    
    let day1 = dayjs().subtract(7, 'day').format("YYYY-MM-DD")
    console.log(day1)
    let startdate = dayjs().subtract(1, 'month').format("YYYY-MM-DD")
    let enddate = dayjs().format("YYYY-MM-DD")
    console.log(startdate, enddate)

    const allpay = await instance.payments.all({ 
      from: startdate,  to: enddate, count: '100'})
      .then((response) =>{
        //console.log(response);
        return res.status(200).json(response)
      })
       .catch((error) => {  
         if(error){
           return res.status(400).json(error.message)
         }
       })
  })

// router.post("/order", async (req, res) => {
//     let order
//     try{
//         /*
//         Steps -
//         Get OrderID, CustomerId, OrderDetails, OrderValue, PhoneNumber, Address from frontend
//         Get the remaining fields from querying DB with CustomerId
//         Verify TotalCart Value from frontend and db
//         If all is OK process transaction and get TranasctionId, OrderValue and finally store into the DB
//         */
        
//     }
//     catch(e){
//         return res.status(400).json({
//             message: e.message
//         })
//     }
// })

module.exports = router