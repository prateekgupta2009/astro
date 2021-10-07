const mongoose = require('mongoose');

// askQuestion schema 

const OnlinePujaBookUserSchema = mongoose.Schema({

   
    user_id: {
        type: String,
        // requried : true,
    },
    paymentid:{
        type: String,
    },
    currentOrderID:{
        type: String,
        // requried : true,        
    },
    pujaprice:{
    type:String,
    },
    category_id:{
        type: String,
    },
    online_puja_id: {
        type: String,
        // requried : true,
    },
    details: {
        type: String,
        // requried : true,
    },
    duration_number: {
        type: String,
        // requried : true,
    },
    duration_type:{
        type: String,
    },

    Puja_name:{
        type: String,

    },

    regular_price_inr:{
        type: String,

    },

    regular_price_usd:{
        type: String,

    },


    sell_price_inr:{
        type: String,

    },

    sell_price_usd:{
        type: String,
   
    },


    sku:{
        type: String, 
    },

    status: {
        type: String,
        // requried : true,
    },
    benifit:{
        type: String,
  
    },
    order_status:{
        type: String,  
    },
    BhojanAddonePrice:{
        type: String,  
    },
    DakshinaAddonePrice:{
        type: String,  
    },
    BhojanAddoneId:{
        type: String,  
    },
    DakshinaAddoneId:{
        type: String,  
    },
    addonlinePujaaddress: [
        {
            name:{type:String,requried:true},
            dob:{type:String,requried:true},
             gotr:{type:String,requried:true},
             phoneno:{type:String,requried:true} 
        }
    ],
    PujaAddon:[{
        type:String,
        // requried:true
    }],
     created_at: {
         type: Date,
         default: new Date()
     }

});

// askQuestion model

mongoose.model('onlinepujabook_user', OnlinePujaBookUserSchema);

module.exports = mongoose.model('onlinepujabook_user')
