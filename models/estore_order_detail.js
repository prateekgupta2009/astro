const mongoose = require('mongoose');

// askQuestion schema 

const Estore_OrderDetailSchema = mongoose.Schema({
    order_id: {
        type: String,
        requried: true,
    },
    created_at: {
        type: Date,
        default: new Date()
    },
    product_id: {
        type: String,
        required : true,
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
    is_active:{
        type: String
    },
    is_deleted:{
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
    warn_quantity:{
        type: String,
    },
    sku:{
        type: String,
    },
    weight_carat:{
        type: String,
    },
    weight_ratti:{
        type: String,
    },
   name: {
       type: String,
   },
   regular_price_inr: {
       type: String,
   },
   sell_price_inr: {
       type: String,
       
   },
   regular_price_usd: {
       type: String,
   },
   sell_price_usd: {
       type: String,
   },
   key_feature: {
       type: String,
   },
   description:{
    type: String,
   },
   disclaimer:{
    type: String,
   },
   stock_quantity:{
    type: String,
   },
   quantity: {
       type: String,
       required : true        
   },
   image:{
       type: String,
       required : true
  },
  updated_at: {
    type: Date,
    default: new Date()
},
    EnergizationId:{
        type: String,
    },
    Energizationtype:{
        type: String,
    },
    Energizationoption:{
        type: String,
    },
    Energizationprice_inr:{
        type: String,
    },
    Energizationprice_usd:{
        type: String,
    },
    certificationId:{
        type: String,
    },
    certificationtype:{
        type: String,
    },
    certificationoption:{
        type: String,
    },
    certificationprice_inr:{
        type: String,
    },
    certificationprice_usd:{
        type: String,
    },
    wearename:{
        type: String,
    },
    wearerdob:{
        type: String,
    },
    wearerbirthplace:{
        type: String,
    },
    wearertob:{
        type: String,
    },
    wearergotra:{
        type: String,
    },
    created_at: {
        type: Date,
        default: new Date()
    },
    updated_at:{
        type: Date,
        default: new Date()
    }
  

});

// astrologers model

mongoose.model('estore_order_detail', Estore_OrderDetailSchema);

module.exports = mongoose.model('estore_order_detail')
