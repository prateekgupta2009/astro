const mongoose = require('mongoose');

// askQuestionUser schema 

const  AskquestionUserSchema = mongoose.Schema({

    user_id: {
        type: String,
        // required: true
    },
    currentOrderID:{
        type: String,

    },
    paymentID:{
        type: String,

    },
    first_name: {
        type: String,
        // required: true,        
    },
    last_name: {
        type: String,
        // required: true
    },
    email: {
        type: String,
        // required: true
    },
    gender:{
        type: String,

    },

    mobile: {
        type: String,
        // required: true,        
    },
    birthplace: {
        type: String,
        // required: true
    },
    birthstate:{
        type: String,
        // required: true,        
    },
    birthCountry: {
        type: String,
        // required: true
    },
    dob: {
        type: String,
        // required: true,        
    },
    tob: {
        type: String,
        // required: true,        
    },
    noofquestion:{
        type: String,
        // required: true, 
    },
    language:{
        type: String,
    },
    question1: {
        type: String,
        // required: true,        
    },
    question2: {
        type: String,
        // required: true,        
    },
    question3: {
        type: String,
        // required: true,        
    },
    replayquestion1:{
        type: String,
        // required: true,    
    },
    replayquestion2:{
        type: String,
        // required: true,    
    },
    replayquestion3:{
        type: String,
        // required: true,    
    },
    status:{
        type: String,
    },
    totalPrice:{
        type: String,

    },
    perquestionprice:{
        type: String,
    },
    created_at: {
        type: Date,
        default: new Date()
    }  
});

// askQuestionUser model

mongoose.model('askquestion_user', AskquestionUserSchema);

module.exports = mongoose.model('askquestion_user')
