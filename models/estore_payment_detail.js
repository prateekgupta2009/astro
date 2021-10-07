const mongoose = require('mongoose');

// askQuestion schema 

const Estore_PaymentDetailSchema = mongoose.Schema({

   
    user_id: {
        type: String,
        required: true,        
    },
    payment_getway_id:{
        type: String,

    },
    order_id:{
        type: String,
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
//     expire_at: {type: Date,
//         default: Date.now, 
//         expires: 30
//    } 
});

// astrologers model

mongoose.model('estore_payment_detail', Estore_PaymentDetailSchema);

module.exports = mongoose.model('estore_payment_detail')
