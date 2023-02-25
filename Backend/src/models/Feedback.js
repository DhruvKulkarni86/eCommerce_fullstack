const mongoose = require('mongoose')

const feedbackSchema = mongoose.Schema(
    {
        CustomerId: {
            type: String
        },
        CustomerEmail: {
            type: String
        },
        FeedbackText: {
            type: String
        },
        OrderId: {
            type: String
        },
        
    }
,{collection: 'Feedback'})

module.exports = mongoose.model('Feedback', feedbackSchema)