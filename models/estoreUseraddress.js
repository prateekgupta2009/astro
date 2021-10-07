const mongoose = require('mongoose');

// askQuestion schema 

const Estore_User_Address = mongoose.Schema({
    id: {
        type: String,
        requried : true,
        unique: true

    },
    user_id: {
        type: String,
        required: true,
        unique: true
    },
  
    address:[

        {
            name:{type:String,requried:true},
            country:{type:String,requried:true},
            streetAddress:{type:String,requried:true},
            city:{type:String,requried:true},
            landmark:{type:String,requried:true},
            pincode:{type:String,requried:true},
            phone:{type:String,requried:true},
        }

    ],
    // totalproductPrice:{
    //     type:String,
    //     required: true
    // },
    created_at: {
        type: Date,
        default: new Date()
    }
});

// astrologers model

mongoose.model('estore_User_address', Estore_User_Address);

module.exports = mongoose.model('estore_User_address')
