const mongoose = require('mongoose');

// askQuestion schema 

const Estore_Dispatch_User = mongoose.Schema({
    id: {
        type: String,
        requried : true,

    },
    user_id: {
        type: String,
        required: true,
    },
  
            name:{type:String,requried:true},
            streetAddress:{type:String,requried:true},
            city:{type:String,requried:true},
            landmark:{type:String,requried:true},
            pincode:{type:String,requried:true},
            phone:{type:String,requried:true},
            status:{type:String,requried:true},
            currentOrderID:{
                type: String,
                requried : true,        
            },
    totalproductPrice:{
        type:String,
        required: true
    },
    cartProduct:[{
        type:String,
        requried:true
    }],
    created_at: {
        type: Date,
        default: new Date()
    }
});

// astrologers model

mongoose.model('estore_dispatch_user', Estore_Dispatch_User);

module.exports = mongoose.model('estore_dispatch_user')
