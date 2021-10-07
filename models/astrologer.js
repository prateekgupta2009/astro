const mongoose = require('mongoose');

// askQuestion schema 

const AstrologersSchema = mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true,        
    },
    dob: {
        type: String,
        required: true,
    },
    religion: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    mobile:{
        type:String,
        required: true
    },
    password:{
        type:String,
        required: true
    },
    address:{
        type:String,
        required:true
    },
    country_id:{
        type:String,
        required:true
    },
    state_id:{
        type:String,
        required:true
    },
    city_id:{
        type:String,
        required:true
    },
    status:{
        type:String,
        require:true
    },
    about_us:{
        type:String,
        require:true
    },
    featuredStatus:{
        type:String,
        require:true
    },
    experience:{
        type:Number,
        required:true
    },
    rating:{
        type:String,
        required:true
    },
    salutation:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    created_by:{
        type:String,
        required:true
    }
    ,
    image_path:{
        type:String,
        required:true
    },
    created_at: {
        type: Date,
        default: new Date()
    },
    updatedAt: {
        type:Date,
        default:Date.now(),
    }

});

// astrologers model

mongoose.model('astrologers', AstrologersSchema);

module.exports = mongoose.model('astrologers')
