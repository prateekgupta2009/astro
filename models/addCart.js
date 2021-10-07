const mongoose = require('mongoose');

// AddCartSchema schema 

const AddCartSchema = mongoose.Schema({
     created_at: {
         type: Date,
         default: new Date()
     },

     product_id: {
        type: String,
        required : true,
        unique: true
    },
    name: {
        type: String,
        required : true
    },
    regular_price_inr: {
        type: String,
        required : true       
    },
    sell_price_inr: {
        type: String,
        required : true,
        
    },
    regular_price_usd: {
        type: String,
        required : true        
    },
    sell_price_usd: {
        type: String,
        required : true
    },
    sellername: {
        type: String,
        required : true
        
    },
    quantity: {
        type: String,
        required : true        
    },
    date:{
        type: String,
        required : true
    },
    image:{
        type: String,
        required : true
   },
    createdOn: {
        type: Date,
        default: new Date()
    }

});

// askQuestion model

mongoose.model('addcartschema', AddCartSchema);

module.exports = mongoose.model('addcartschema')
