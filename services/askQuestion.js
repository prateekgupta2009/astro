const AskQuestion = require('../models/askQuestion');
const SignUpUser= require('../models/signUpUser');


let askQuestionService = {

    postAsk_questionuser:async(askquestion_user)=>  {
        const newAskQuestion = new AskQuestion({
            id:askquestion_user.id,
            ask_question_user: [
                {
                    name:askquestion_user.name,
                    gender:askquestion_user.gender,
                    birthPlace:askquestion_user.birthPlace,
                    birthState:askquestion_user.birthState,
                    birthCountry:askquestion_user.birthCountry,
                    dob:askquestion_user.dob,
                    time:askquestion_user.time,
                    language:askquestion_user.language,
                    noOfQuestion:askquestion_user.noOfQuestion,
                    question1:askquestion_user.question1,
                    question2:askquestion_user.question2,
                    question3:askquestion_user.question3,
                    answer1:askquestion_user.answer1,
                    answer2:askquestion_user.answer2,
                    answer3:askquestion_user.answer3
                }
             ]


        })
        await newAskQuestion.save();
        return newAskQuestion;
    },

    add_askquestionuser_detail:(askquestion_user)=>  {
            id=askquestion_user.id;
             ask_question_users=
                {
                    first_name:askquestion_user.first_name,
                    last_name:askquestion_user.last_name,
                    gender:askquestion_user.gender,
                    birthPlace:askquestion_user.birthPlace,
                    birthState:askquestion_user.birthState,
                    birthCountry:askquestion_user.birthCountry,
                    dob:askquestion_user.dob,
                    time:askquestion_user.time,
                    language:askquestion_user.language,
                    noOfQuestion:askquestion_user.noOfQuestion,
                    question1:askquestion_user.question1,
                    question2:askquestion_user.question2,
                    question3:askquestion_user.question3,
                    answer1:askquestion_user.answer1,
                    answer2:askquestion_user.answer2,
                    answer3:askquestion_user.answer3
                };

        AskQuestion.findOneAndUpdate(
            { id: id },
            { $push: { ask_question_user: ask_question_users } },).exec();    
    },



    // saveAskQuestionUser: async (askQuestion) => {
    //     const newAskQuestion = new AskQuestion({
    //     username: askQuestion.username,
    //      signupEmail: askQuestion.signupEmail,
    //      mobileNo: askQuestion.mobileNo,
    //     //  signupPassword= askQuestion.signupPassword,
    //      gender: askQuestion.gender,
    //      birthPlace: askQuestion.birthPlace,
    //      birthState: askQuestion.birthState,
    //      birthCountry: askQuestion.birthCountry,
    //      dob: askQuestion.dob,
    //      time: askQuestion.time,
    //      language: askQuestion.language,
    //      noOfQuestion: askQuestion.noOfQuestion,
    //     })
    //     await newAskQuestion.save();
    //     return newAskQuestion;
    // },
    // saveask_question_SignUpUser: async (signupUser) => {
    //      newSignUpUser = new SignUpUser({ 
    //          username : signupUser.username,
    //          signupEmail : signupUser.signupEmail,
    //          mobileNo : signupUser.mobileNo,
    //          signupPassword: signupUser.signupPassword,
         
    //          time : signupUser.time,
    //          language : signupUser.language,
    //          userdetails:signupUser.userdetails
    //      })
    //     await newSignUpUser.save();
    //     return newSignUpUser;
    // },
//     addask_question_user: async (signupUser) => {
//         newSignUpUser = new SignUpUser({ 
//             userdetails:signupUser.userdetails
//         })
//        await newSignUpUser.save();
//        return newSignUpUser;
//    },


}
module.exports = askQuestionService;