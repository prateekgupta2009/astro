const mongoose = require('mongoose');

// askQuestion schema 

const User_Address = mongoose.Schema({
   
    user_id: {
        type: String,
        requried : true,
        unique: true

     
    },
  
    address:[

        {
            created_at: {
                type: Date,
                default: new Date()
            },
            name:{type:String,requried:true},
            country:{type:String,requried:true},
            streetAddress:{type:String,requried:true},
            city:{type:String,requried:true},
            landmark:{type:String,requried:true},
            pincode:{type:String,requried:true},
            phone:{type:String,requried:true},
        }

    ],
   
    created_at: {
        type: Date,
        default: new Date()
    }
});

// astrologers model

mongoose.model('user_address', User_Address);

module.exports = mongoose.model('user_address')
