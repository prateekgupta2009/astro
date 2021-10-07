const mongoose = require('mongoose');

// askQuestion schema 

const AstrologersSchema = mongoose.Schema({
    sponserd:{
        type:String,
    },
    offer:{
        type:String,
    },
    language:{
        type:String,
        requried : true

    },
    call_minute:{
        type:String,
        requried : true
    },
    callrate:{
        type:String,
        requried : true
    },
    chat_minute:{
        type:String,
        requried : true
    },
    chatrate:{
        type:String,
        requried : true
    },
    videocall_minute:{
        type:String,
        requried : true
    },
    videocall_rate:{
        type:String,
        requried : true
    },
    name: {
        type: String,
        requried : true
    },
    gender: {
        type: String,
        requried : true
    },
    dob: {
        type: String,
        requried : true
    },
    religion: {
        type: String,
        requried : true
    },
    email:{
        type: String,
        requried : true
    },
    mobile:{
        type:String,
        requried : true
    },
    address:{
        type:String,
        requried : true
    },
    country_id:{
        type:String,
        requried : true
    },
    state_id:{
        type:String,
        requried : true
    },
    city_id:{
        type:String,
        requried : true
    },
    status:{
        type:String,
        requried : true
    },
    about_us:{
        type:String,
        requried : true
    },
    featuredStatus:{
        type:String,
        requried : true
    },
    experience:{
        type:Number,
        requried : true
    },
    rating:{
        type:String,
        requried : true
    },
    salutation:{
        type:String,
        requried : true
    },
    image:{
        type:String,
        requried : true
    },
    image_path:{
        type:String,
        requried : true
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

// astrologers_detail model

mongoose.model('astrologers_detail', AstrologersSchema);

module.exports = mongoose.model('astrologers_detail')
