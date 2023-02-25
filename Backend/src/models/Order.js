const mongoose = require('mongoose')

const orderSchema = mongoose.Schema(
    {
        _id: {
            type: String,
            // required: true
        },
        CustomerId: {
            type: String,
            // required: true
        },
        CustomerEmail: {
            type: String,
            // required: true
        },
        Name: {
            type: String
        },
        PhoneNumber: {
            type: String
        },
        OrderDetails: [{
            type: {
                productId: {
                    type: String,
                    // required: true
                },
                productName: {
                    type: String,
                    // required: true
                },
                productQty: {
                    type: Number,
                    // required: true
                },
                Price: {
                    type: Number,
                    // required: true
                }
            },
            // required: true
        }],
        Amount: {
            type: Number,
            // required: true
        },
        Address: {
            type: {
                HouseNo: String,
                Street: String,
                Area: String,
                City: String,
                Pincode: String
            }
            // required: true
        },
        CreatedOn: {
            type: String,
            default: Date.now.toString(),
            required: true
        },
        Currency: {
            type: String,
        },
        Receipt: {
            type: String
        },
        Notes: {
            type: String
        },
        razorpayPaymentID: {
            type: String
        },
        razorpaySignature: {
            type: String
        },
        Status: {
            type: String
        },
        deliveryStatus: {
            type: String
        },
        paymentMethod: {
            type: String
        },
        feedback: {
            type: Boolean,
            default: false
        }
    }
,{collection: 'Order', _id: false})

module.exports = mongoose.model('Order', orderSchema)