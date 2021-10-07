const mongoose = require('mongoose');

const AskQuestion_PaymentDetailSchema = mongoose.Schema({

    user_id: {
        type: String,
        required: true,        
    },
    order_id:{
        type: String,
        required: true
    },
    pay_amount: {
        type: String,
    },
    time: {
        type: String,
    },
    date:{
        type: String,
    },
    amount_refunded:{
        type:String,
        default:"null"
    },
    contact:{
        type:String,
        default:"null"
    },
    currency:{
        type:String,
        default:"null"
    },
    description:{
        type:String,
        default:"null"
    },
    email:{
        type:String,
        default:"null"
    },
    international:{
        type:String,
        default:"null"
    },
    method:{
        type:String,
        default:"null"
    },
    payment_order_id:{
        type:String,
        default:"null"
    },
    payment_status:{
        type:String,
        default:"0"
    },
    created_at: {
        type: Date,
        default: new Date()
    },
    updatedAt:{
        type: Date,
        default: new Date()
    }
});


mongoose.model('askquestion_payment_detail', AskQuestion_PaymentDetailSchema);

module.exports = mongoose.model('askquestion_payment_detail')
