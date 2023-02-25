const express = require('express')
const router = express.Router()
const admin = require('../config/firebase-config')
const Customer = require('../models/Customer')

//To merge this with customerRouter need to figure out way to check decodeValue.uid inside route
async function decodeToken(req, res, next) {
    const token = req.headers.authorization.split(" ")[1]
    console.log(token)
    try{
        const decodeValue = await admin.auth().verifyIdToken(token)
        console.log(decodeValue)
        // admin.auth().getUser(decodeValue.uid).then((userRecord) => {
        //     console.log(userRecord.toJSON())
        // })
        // admin.auth().getUser(decodeValue.uid).then((userRecord) => {
        //     req.providerId = userRecord.providerData[0].providerId
        //     console.log("A",req.providerId)
        //     console.log("ProviderData",userRecord.providerData[0].providerId)
        // })
        console.log(req.body)
        if(decodeValue){
            req.decodedToken = decodeValue
            return next()
        }
        return res.json({
            message: "Unauthorized"
        })
    }
    catch(e){
        console.log(e)
        return res.json({
            message: "Internal Error"
        })
    }
}

router.post("/signup", decodeToken, async (req, res) => {
        let cust;
        console.log("BOdY",req.body.FName)
        try{
            console.log()
            // admin.auth().getUser(req.decodedToken.uid).then((userRecord) => {
            //     let providerId = userRecord.providerData[0].providerId
            //     console.log("A",providerId)
            //     return providerId
            // })
            //admin.auth().getUser(req.decodedToken.uid).
            //console.log(req.decodedToken.firebase.sign_in_provider)
            if(req.decodedToken.firebase.sign_in_provider === "password"){
                    cust = new Customer({
                    _id: req.decodedToken.uid,
                    email: req.decodedToken.email,
                    PhoneNumber: null,
                    FName: req.body.FName,
                    LName: req.body.LName,
                    Cart: [],
                    Order: [],
                    AuthType: "email",
                    isAdmin: false
                })
            }
            else{
                return res.status(400).json({
                    message: err.message
                })
            }
            console.log(cust)
            cust = await(cust.save())
            return res.status(200).json({
                message: "SignUp Successful"
            })
        }
        catch(err){
            console.log(err.message)
            if(err.code === 11000){
                console.log("ERRERR");
                return res.status(409).json({
                    message: "User Already Exists"
                })
            }
            return res.status(400).json({
                message: "SignUp Failed"
            })
        }
})

router.post("/gsignup", decodeToken, async (req,res) => {
    try{
        if(req.decodedToken.firebase.sign_in_provider === "google.com"){
            let existCust = await Customer.findById(req.decodedToken.uid)
            if(existCust == null){
                let cust = new Customer({
                    _id: req.decodedToken.uid,
                    email: req.decodedToken.email,
                    PhoneNumber: null,
                    FName: req.decodedToken.name.split(" ")[0],
                    LName: req.decodedToken.name.split(" ")[1],
                    Cart: [],
                    Orders: [],
                    AuthType: "google",
                    isAdmin: false
                })
                console.log(cust)
                cust = await(cust.save())
                return res.status(200).json({
                    message: "SignUp Successful"
                })
            }
            else{
                return res.status(200).json({
                    message: "Profile Complete"
                })
            }
        }

    }
    catch(err){
        return res.status(400).json({
            message: err.message
        })
    }
})

module.exports = router