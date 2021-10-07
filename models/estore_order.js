const mongoose = require('mongoose');

// askQuestion schema 

const Estore_CreateOrderSchema = mongoose.Schema({

   
    user_id: {
        type: String,
        required: true,        
    },
    amount: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true
    },
    date:{
        type: String,
        required: true
    },
    discount:{
        type:String,
        default:"null"
    },
    address_id:{
        type:String,
        default:"null"
    },
    status:{
        type:String,
        default:"null"
    },
    paymentmode:{
        type:String,
        default:"null"
    },
    payment_status:{
        type:String,
        default:"null"
    },
    delivery_status:{
        type:String,
        default:"null"
    },
    currentorederId:{
        type:String,

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

// astrologers model

mongoose.model('estore_create_order', Estore_CreateOrderSchema);

module.exports = mongoose.model('estore_create_order')
