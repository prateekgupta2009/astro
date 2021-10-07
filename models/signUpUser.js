const mongoose = require('mongoose');

// signupUser schema
const signUpUserSchema = mongoose.Schema({

    first_name: {
        type: String,
        requried : true
    },
    last_name: {
        type: String,
        requried : true,
    },
    signupEmail: {
        type: String,
        requried : true, 
        unique:true               
    },
    mobileNo: {
        type: String,
        requried : true,        
        unique: true
    },
    signupPassword: {
        type: String,
        requried : true,
    },
    createdOn: {
        type: Date,
        default: new Date()
    }
});

// signupUser model

mongoose.model('signupuser', signUpUserSchema);

module.exports = mongoose.model('signupuser')