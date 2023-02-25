const mongoose = require('mongoose')

const customerSchema = mongoose.Schema(
    {
        _id: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        PhoneNumber: Number,
        FName: {
            type: String
        },
        LName: {
            type: String
        },
        //Since Each User Only has 1 cart
        Cart: [{
            productId: String,
            productName: String,
            productQty: Number,
            productImg: String,
            productPrice: Number,
        }],
        Orders: [String],
        AuthType: String,
        isAdmin: {
            type: Boolean,
            default: false
        }
    }
,{collection: 'Customer', _id: false})

module.exports = mongoose.model('Customer', customerSchema)