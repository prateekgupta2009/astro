const mongoose = require('mongoose');

// askQuestion schema 

const UserCartSchema = mongoose.Schema({
    user_id: {
        type: String,
        requried: true,
    },
    product_id:{
        type: String,
        requried: true,
    },
    quantity:{
        type: String,
        requried: true,
    },
    EnergizationId:{
        type: String,
        requried: true,
    },
    certificationId:{
        type: String,
        requried: true,
    },
    wearename:{
        type: String,
        requried: true
    },
    wearerdob:{
        type: String,
        requried: true
    },
    wearerbirthplace:{
        type: String,
        requried: true, 
    },
    wearertob:{
        type: String,
        requried: true
    },
    wearergotra:{
        type: String,
        requried: true  
    },
    
    // usercart: [
    //     {
    //         created_at: {
    //             type: Date,
    //             default: new Date()
    //         },
    //         subcategory_id: {
    //             type: String,
    //             // required : true,
    //         },
    //         warn_quantity: {
    //             type: String,
    //             // required : true,
    //         },
    //         sku: {
    //             type: String,
    //             // required : true,
    //         },
    //         weight_carat: {
    //             type: String,
    //             // required : true
    //         },
    //         weight_ratti: {
    //             type: String,
    //             // required : true
    //         },
    //         product_id: {
    //             type: String,
    //             //    required : true,
    //         },
    //         name: {
    //             type: String,
    //             //    required : true
    //         },
    //         regular_price_inr: {
    //             type: String,
    //             //    required : true       
    //         },
    //         sell_price_inr: {
    //             type: String,
    //             //    required : true,

    //         },
    //         regular_price_usd: {
    //             type: String,
    //             //    required : true        
    //         },
    //         sell_price_usd: {
    //             type: String,
    //             //    required : true
    //         },
    //         key_feature: {
    //             type: String,
    //             //    required : true  
    //         },
    //         description: {
    //             type: String,
    //             // required : true
    //         },
    //         disclaimer: {
    //             type: String,
    //             // required : true 
    //         },
    //         stock_quantity: {
    //             type: String,
    //             // required : true
    //         },
    //         quantity: {
    //             type: Number,
    //             //    required : true   

    //         },
    //         image: {
    //             type: String,
    //         },
    //         certificationPrice: {
    //             type: String,
    //         },
    //         EnergizationPrice: {
    //             type: String,
    //             //    required : true
    //         },

    //         certificationId: {
    //             type: String,
    //             //    required : true
    //         },
    //         EnergizationId: {
    //             type: String,
    //             //    required : true
    //         },
    //         energyWearer: {
    //             type: String,
    //             //    required : true
    //         },
    //         energyBirthPlace: {
    //             type: String,
    //             //    required : true
    //         },
    //         energyDob: {
    //             type: String,
    //             //    required : true
    //         },
    //         energytob: {
    //             type: String,
    //             //    required : true
    //         },
    //         energygotra: {
    //             type: String,
    //             //    required : true
    //         },
    //     }
    // ],
    created_at: {
        type: Date,
        default: new Date()
    },
    updated_at: {
        type: Date,
        default: new Date()
    },

});

// askQuestion model

mongoose.model('user_cart', UserCartSchema);

module.exports = mongoose.model('user_cart')
