const mongoose = require('mongoose');

// askQuestion schema 

const AskQuestionSchema = mongoose.Schema({

    id: {
        type: String,
        requried : true,
        unique: true

    },
    ask_question_user: [
        {
            first_name:{type:String,requried:true},
            last_name:{type:String,requried:true},
            gender:{type:String,requried:true},
            birthPlace:{type:String,requried:true},
            birthState:{type:String,requried:true},
            birthCountry:{type:String,requried:true},
            dob:{type:String,requried:true},
            time:{type:String,requried:true},
            language:{type:String,requried:true},
            noOfQuestion:{type:String,requried:true},
            question1:{type:String},
            question2:{type:String},
            question3:{type:String},
            answer1:{type:String},
            answer2:{type:String},
            answer3:{type:String}
        }
    ],
     created_at: {
         type: Date,
         default: new Date()
     }

});

// askQuestion model

mongoose.model('askquestion', AskQuestionSchema);

module.exports = mongoose.model('askquestion')
