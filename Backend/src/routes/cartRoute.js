const express = require('express')
const router = express.Router()
const admin = require('../config/firebase-config')
const Customer = require('../models/Customer')

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

router.get("/", decodeToken, async (req, res) => {
    let cart
    try{
        console.log(req.decodeToken.uid)
        let user = await Customer.findById(req.decodeToken.uid)
        if(user===null){
            return res.status(200).send([]);
        }
        cart = user.Cart
        console.log(cart)
        return res.status(200).send(cart)
    }
    catch(e){
        console.log(e);
        return res.status(400).json({
            message: e.message
        })
    }
})

router.put("/", decodeToken, async (req, res) => {
    let uid = req.decodeToken.uid
    console.log(uid)
    try{
        //cart = {ProductID: req.query.Pid, ProductName: req.query.PName, Quantity: req.query.Quantity, BrowseImg: req.query.BrowseImg}
        let user = await Customer.findById(uid)
        console.log(user)
        console.log("BRUH",req.body.cart)
        user.Cart = req.body.cart
        await user.save()
        return res.status(200).send(user.cart)
    }
    catch(e){
        console.log(e)
        return res.status(400).json({
            message: e.message
        })
    }
})

module.exports = router