const mongoose = require('mongoose');

// ProductOrderSchema schema 

const ProductOrderDetailSchema = mongoose.Schema({

    // id: {
    //     type: String,
    //     requried : true,
    //     unique: true

    // },
    user_id: {
        type: String,
    },
    paymentid:{
        type: String,
    },
    userAddress_id:{
        type: String,
      },
      totalproductPrice:{
        type: String,
      },
      orderID:{
        type: String,
      },
    user_order_product: [
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
            product_quantity:{
                type: String
            },
            product_total_amount:{
                type: String
            },
            total_save:{
                type: String
            },
            tax_type:{
                type: String 
            },
            tax_rate:{
                type: String  
            },
            is_deleted:{
                type: String
            },
            is_active:{
                type: String
            },
            edit_total_amount:{
                type: String
            },
            edit_subtotal_amount:{
                type: String
            },
            edit_taxable:{
                type: String
            },
            edit_note:{
                type: String
            },
            edit_qty:{
                type: String
            },
            edit_product_price:{
                type: String
            },

            shipping_id:{
                type: String
            },
            delivery_charge:{
                type: String 
            },
            promo_amount:{
                type: String   
            },
            promocode:{
                type: String 
            },
            is_complete:{
                type: String 
            },
            delivery_status:{
                type: String
            },
            payment_mode:{
                type: String
            },
            payment_date:{
                type: String
            },
            is_cancel:{
                type: String
            },
            delivery_date:{
                type: String 
            },
            is_new:{
                type:String
            },
            completed_on:{
                type:String
            },
            resion:{
                type:String 
            },
            delivery_boy_id:{
                type:String 
            },
            sale_type:{
                type:String  
            },
            edit_total_amount:{
                type:String 
            },
            edit_subtotal:{
                type:String 
            },
            subcategory_id:{
                type: String,
                // required : true,
            },
            warn_quantity:{
                type: String,
                // required : true,
            },
            sku:{
                type: String,
                // required : true,
            },
            weight_carat:{
                type: String,
                // required : true
            },
            weight_ratti:{
                type: String,
                // required : true
            },
           name: {
               type: String,
            //    required : true
           },
           regular_price_inr: {
               type: String,
            //    required : true       
           },
           sell_price_inr: {
               type: String,
            //    required : true,
               
           },
           regular_price_usd: {
               type: String,
            //    required : true        
           },
           sell_price_usd: {
               type: String,
            //    required : true
           },
           key_feature: {
               type: String,
            //    required : true  
           },
           description:{
            type: String,
            // required : true
           },
           disclaimer:{
            type: String,
            // required : true 
           },
           stock_quantity:{
            type: String,
            // required : true
           },
           quantity: {
               type: String,
            //    required : true        
           },
           date:{
               type: String,
            //    required : true
           },
           image:{
               type: String,
            //    required : true
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

mongoose.model('product_order_detail', ProductOrderDetailSchema);

module.exports = mongoose.model('product_order_detail')
