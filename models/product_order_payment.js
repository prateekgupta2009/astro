const mongoose = require('mongoose');

// ProductOrderSchema schema 

const ProductOrderPaymentSchema = mongoose.Schema({

    id: {
        type: String,
        requried : true,
        unique: true

    },
    user_id: {
        type: String,
        requried : true,
        unique: true
    },
    user_order_payment: [
        {
            created_at: {
                type: Date,
                default: new Date()
            },
            product_id: {
                type: String,
                required : true,
            },
            order_id:{
                type: String
            },
            amount:{
                type: String
            },
            checkout_url:{
                type: String
            },
            refund_url:{
                type: String
            },
            self_url:{
                type: String 
            },
            country_code:{
                type: String  
            },
            customer_id:{
                type: String
            },
            Description:{
                type: String
            },
            card_audience:{
                type: String
            },
            card_country_code:{
                type: String
            },
            cart_finger_print:{
                type: String
            },
            card_holder:{
                type: String
            },
            card_label:{
                type: String
            },
            card_number:{
                type: String
            },

            card_security:{
                type: String
            },
            failure_message:{
                type: String 
            },
            failure_reason:{
                type: String   
            },
            free_region:{
                type: String 
            },
            method:{
                type: String 
            },
            is_cancalable:{
                type: String
            },
            mode:{
                type: String
            },
            resource:{
                type: String
            },
            sequence_type:{
                type: String
            },
            setelment_amount:{
                type: String
            },
            status:{
                type: String
            },
            setelment_id:{
                type: String 
            },
            amount_refunded:{
                type:String
            },
            amount_reamaining:{
                type:String
            },
            authroized_at:{
                type:String 
            },
            canceled_at:{
                type:String 
            },
            expired_at:{
                type:String  
            },
            failed_at:{
                type:String 
            },
            is_deleted:{
                type:String 
            },
            editedon:{
                type: String,
                required : true,
            },
            edited_by:{
                type: String,
                required : true,
            },
            offer_code:{
                type: String,
                required : true,
            },
            discount_value:{
                type: String,
                required : true
            },
            offer_type:{
                type: String,
                required : true
            },
            billing_notes: {
               type: String,
               required : true
           },
          
          updated_at: {
            type: Date,
            default: new Date()
        },
           
        }
    ],
     created_at: {
         type: Date,
         default: new Date()
     }

});

// askQuestion model

mongoose.model('product_order_payment', ProductOrderPaymentSchema);

module.exports = mongoose.model('product_order_payment')
