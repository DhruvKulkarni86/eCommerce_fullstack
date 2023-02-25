const express = require('express')
const router = express.Router()
const admin = require('../config/firebase-config')
const Product = require('../models/Products')
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

router.get("/all", async (req, res) => {
    //return res.status(200).send("response")

    
    let products
        
    try{
        // console.log("OLAAAAAAAAAAAAAAAAAAAA")
        products = await Product.find({}, {_id: 1, Name: 1, Price: 1, Quantity: 1, Category: 1, PlantCategory: 1, SubCategory: 1, BrowseImg: 1, ratingTotal: 1, noOfRaters: 1}).sort({_id: 1})    
        // console.log("PRODUCTS",products)
        return res.status(200).send(products)
    }
    catch(error){
        console.log(e);
        return res.status(400).send(error.message)
    }
})

router.get("/:pid", async (req, res) => {
    //Current Route - GET localhost:5000/product/products/:pid
    //New Route - GET localhost:5000/product/:pid
    let product
    try{
        product = await Product.findById(req.params.pid)
        return res.status(200).send(product)
    }
    catch(e){
        console.log(e);
        return res.status(400).json({
            message: e.message
        })
    }
})

router.get("/", async (req, res) => {
    //Current Route = GET localhost:5000/product/products
    //New Route = GET localhost:5000/product
    console.log("RQ", req.query);
    let pageNo = req.query.pageNo
    console.log("PG", pageNo);
    let sortBy = req.query.sortBy
    console.log("SORT", sortBy);
    //SortBy HighToLow, LowToHigh, Default
    let products
    let productCount = await Product.find().count()
    try{
        if(req.query.sortBy === "HighToLow"){
            products = await Product.find({}, {Name: 1, Price: 1, Category: 1, SubCategory: 1, BrowseImg: 1, MainImg: 1, Tags: 1, ratingTotal: 1, noOfRaters: 1}).sort({Price: -1}).skip((req.query.pageNo-1)*12).limit(12)
        }
        else if(req.query.sortBy === "LowToHigh"){
            products = await Product.find({}, {Name: 1, Price: 1, Category: 1, SubCategory: 1, BrowseImg: 1, MainImg: 1, Tags: 1, ratingTotal: 1, noOfRaters: 1}).sort({Price: 1}).skip((req.query.pageNo-1)*12).limit(12)
        }
        else{
            products = await Product.find({}, {Name: 1, Price: 1, Category: 1, SubCategory: 1, BrowseImg: 1, MainImg: 1, Tags: 1, ratingTotal: 1, noOfRaters: 1}).sort({_id: 1}).skip((req.query.pageNo-1)*12).limit(12)
        }
        // console.log(products)
        return res.status(200).json({
            data: products,
            productCount: productCount
        })    
    }
    catch(e){
        console.log(e);
        return res.status(400).json({
            message: e.message
        })
    }
})

router.get("/tags/:tags", async (req, res) => {
    //Current Route - GET localhost:5000/product/product/tags/Medicinal
    //New Route - GET localhost:5000/product/tags/Medicinal
    //Limit Return to 5 values alternate route
    //return res.status(300).send("response")
    
    console.log("response found")
    let products
    let tags = req.params.tags.split(",")
    let limit = req.query.limit
    try{
        if(limit){
            products = await Product.find({Tags: { $in: tags}}, {Name: 1, Price: 1, Category: 1, PlantCategory: 1, SubCategory: 1, BrowseImg: 1, ratingTotal: 1, noOfRaters: 1}).limit(limit)
        }
        else{
            products = await Product.find({Tags: { $in: tags}}, {Name: 1, Price: 1, Category: 1, PlantCategory: 1, SubCategory: 1,BrowseImg: 1, ratingTotal: 1, noOfRaters: 1})
        }
        return res.status(200).send(products)
    }
    catch(e){
        console.log(e);
        return res.status(400).json({
            message: e.message
        })
    }
})

router.get("/category/:category", async (req, res) => {
    //Current Route - GET localhost:5000/product/product/category
    //New Route - GET localhost:5000/product/category
    let products
    console.log("CAT", req);
    let pageNo = req.query.pageNo
    let sortBy = req.query.sortBy
    let productCount = await Product.find({Category: req.params.category}).count()
    console.log("PROD COUnt", productCount);
    try{
        if(req.query.sortBy === "HighToLow"){
            products = await Product.find({Category: req.params.category}, {Name: 1, Price: 1, Category: 1, SubCategory: 1, BrowseImg: 1, MainImg: 1, Tags: 1, ratingTotal: 1, noOfRaters: 1}).sort({Price: -1}).skip((req.query.pageNo-1)*12).limit(12)
        }
        else if(req.query.sortBy === "LowToHigh"){
            products = await Product.find({Category: req.params.category}, {Name: 1, Price: 1, Category: 1, SubCategory: 1, BrowseImg: 1, MainImg: 1, Tags: 1, ratingTotal: 1, noOfRaters: 1}).sort({Price: 1}).skip((req.query.pageNo-1)*12).limit(12)
        }
        else{
            products = await Product.find({Category: req.params.category}, {Name: 1, Price: 1, Category: 1, SubCategory: 1, BrowseImg: 1, MainImg: 1, Tags: 1, ratingTotal: 1, noOfRaters: 1}).sort({_id: 1}).skip((req.query.pageNo-1)*12).limit(12)
        }
        // console.log(products)
        return res.status(200).json({
            data: products,
            productCount: productCount
        })
    }
    catch(e){
        console.log(e);
        return res.status(400).json({
            message: e.message
        })
    }
})

router.get("/subcategory/:subcategory", async (req, res) => {
    //Modify Schema and DB values from plantCategory to SubCategories.
    //Another route for 1-2 products from each subcategory randomized.
    let products
    try{
        products = await Product.find({SubCategory: req.params.subcategory}, {Name: 1, Price: 1, Category: 1, SubCategory: 1, BrowseImg: 1})
        return res.status(200).send(products)
    }
    catch(e){
        console.log(e);
        return res.status(400).json({
            message: e.message
        })
    }
})


router.post("/", decodeToken, async (req, res) => {
    let dbAdmin = await Customer.findOne({email: req.decodeToken.email})
    console.log("ADMINNNNNN" , dbAdmin)
    console.log("isadmiNNNNNNNN" , dbAdmin.isAdmin)
    if(dbAdmin.isAdmin === false){
        return res.status(401).send("NOT ADMIN")
    }
    //Current Route - POST localhost:5000/product/product/
    //New Route - POST localhost:5000/product/
    let categorySuffix = req.body.Category
        if(categorySuffix == "Plant")
            categorySuffix = "A"
        else if(categorySuffix == "Seeds")
            categorySuffix = "B"
        else if(categorySuffix == "Planters")
            categorySuffix = "C"
        else if(categorySuffix == "Care")
            categorySuffix = "D"

    //AutoCreate PID
    console.log("CATTTTTT", req.body);
    let lastProduct = await Product.findOne({ Category: req.body.Category}).sort({ _id: -1})
    console.log("LAst",lastProduct)
    let pid = lastProduct._id.substring(1)
    pid = parseInt(pid) + 1 
    pid = categorySuffix + pid
    console.log("PIDD", pid)
    
    let product
    try{        
        product = new Product({
            _id: pid,
            Name: req.body.Name,
            Price: req.body.Price,
            Quantity: req.body.Quantity,
            ItemsSold: 0,
            Details: req.body.Details,
            BrowseImg: req.body.BrowseImg,
            MainImg: req.body.MainImg,
            Tags: req.body.Tags,
            Category: req.body.Category,
            SubCategory: req.body.SubCategory
        })
        product = await(product.save())
        console.log(product)
        return res.status(200).json({
            data: product
        })
    }
    catch(e){
        res.status(400).json({
            message: e.message
        })
    }
})

router.patch("/", decodeToken, async (req, res) => {
    let dbAdmin = await Customer.findOne({email: req.decodeToken.email})
    console.log("ADMINNNNNN" , dbAdmin)
    console.log("isadmiNNNNNNNN" , dbAdmin.isAdmin)
    if(dbAdmin.isAdmin === false){
        return res.status(401).send("NOT ADMIN")
    }
    //Current Route - PATCH localhost:5000/product/product/
    //New Route - PATCH localhost:5000/product/
    console.log("PATCHHHH", req.body.values.Name);
    let product
    try{
        product = await Product.findById(req.body.pid)
        product.Name = req.body.values.Name ? req.body.values.Name : product.Name
        product.Price = req.body.values.Price ? req.body.values.Price : product.Price
        product.Quantity = req.body.values.Quantity ? req.body.values.Quantity : product.Quantity
        product.ItemsSold = req.body.values.ItemsSold ? req.body.values.ItemsSold : product.ItemsSold
        product.Details = req.body.values.Details ? req.body.values.Details : product.Details
        product.BrowseImg = req.body.values.BrowseImg ? req.body.values.BrowseImg : product.BrowseImg
        product.MainImg = req.body.values.MainImg ? req.body.values.MainImg : product.MainImg
        product.Tags = req.body.values.Tags ? req.body.values.Tags : product.Tags
        product.Category = req.body.values.Category ? req.body.values.Category : product.Category
        product.SubCategory = req.body.values.SubCategory ? req.body.values.SubCategory : product.SubCategory
        product = await product.save()
        console.log(product.Price)
        return res.status(200).json({
            data: product,
            updateSuccessful: true
        })
    }
    catch(e){
        res.status(400).json({
            message: e.message
        })
    }
})

router.delete("/", decodeToken, async (req, res) => {
    let dbAdmin = await Customer.findOne({email: req.decodeToken.email})
    console.log("ADMINNNNNN" , dbAdmin)
    console.log("isadmiNNNNNNNN" , dbAdmin.isAdmin)
    if(dbAdmin.isAdmin === false){
        return res.status(401).send("NOT ADMIN")
    }
    console.log("PID", req.body.pid)
    //Current Route - DELETE localhost:5000/product/product/
    //New Route - DELETE localhost:5000/product/
    try{
        let product = await Product.findByIdAndDelete(req.body.pid)
        return res.status(200).json({
            data: product,
            deleteStatus: true
        })
    }
    catch(e){
        res.status(400).json({
            message: e.message
        })
    }
})

// router.get("/product", async (req, res) => {
//     let products
//     try{
//         if(req.query.pid){
//             products = await Product.findById(req.query.pid)
//         }
//         else{
//             if(req.query.limit && req.query.sort){
//                 products = await Product.find().sort({Price: 1}).limit(req.query.limit)
//             }
//             else if(req.query.limit){
//                 products = await Product.find().limit(req.query.limit)
//             }
//             else if(req.query.sort){
//                 products = await Product.find().sort({Price: 1})
//             }
//             else{
//                 products = await Product.find()
//             }
//         }
//         res.status(200).json({
//             data: products
//         })
//     } 
//     catch(e){
//         console.log(err)
//         return res.status(400).json({
//             message: err.message
//         })   
//     }
// })



module.exports = router