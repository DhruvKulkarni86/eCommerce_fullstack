const mongoose = require('mongoose')

const productSchema = mongoose.Schema(
    {
        _id: {
            type: String,
            required: true
        },
        Name: {
            type: String,
            required: true
        },
        Price: {
            type: Number,
            required: true
        },
        Quantity: {
            type: Number,
            required: true
        },
        ItemsSold: {
            type: Number,
        },
        Details: {
            type: {
                Light: String,
                Watering: String,
                Maintenance: String,
                WhereToGrow: String,
                Material: String,
                Build: String,
                PlanterHeight: String,
                PlanterWidth: String,
                TimeTillHarvest: String,
                Description: String
            },
            required: false,
            _id: false,
        },
        BrowseImg: {
            type: String
        },
        MainImg: {
            type: String
        },
        Tags: {
            type: []
        },
        Category: {
            type: String
        },
        SubCategory: {
            type: String
        },
        ratingTotal: {
            type: Number,
            default: 0
        },
        noOfRaters: {
            type: Number,
            default: 0
        }
    }
,{collection: 'Product', _id: false})

module.exports = mongoose.model('Product', productSchema)