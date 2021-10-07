const express = require('express');
const router = express.Router();
const askQuestionService = require('../services/askQuestion');
const SignUpUser = require('../models/signUpUser');
const AskQuestion = require('../models/askQuestion');




router.post('/checkuseraccount', async (req, res, next) => {
    try {
        const mobileNo = req.body.mobileno;
        SignUpUser.findOne({ mobileNo } )
        .exec()
        .then(userdata=>{
            if(userdata<1){
                res.json({
                    msg:'user account not find'                  
                })
            }
            else{
                res.json({
                    msg:'user account matched',
                    userdata:userdata
                })
            }
        })


    } catch (err) {
        console.log(err);
        res.status(400).send({ err });
        // return next(err);
    }
});


router.post('/checkaskQuestionuser', async (req, res, next) => {
    try {
        const id = req.body.id;
        AskQuestion.find({ id } )
        .exec()
        .then(userdata=>{
            if(userdata<1){
                res.json({
                    msg:'user account id not find'                  
                })
            }
            else{
                res.json({
                    msg:'user account matched',
                    userdata:userdata
                })
            }
        })


    } catch (err) {
        console.log(err);
        res.status(400).send({ err });
        // return next(err);
    }
});

router.post('/addaskquestionuser',async (req, res, next) =>{
    try {
        console.log(req.body.userdetail)
        const id= req.body.id
               const first_name = req.body.first_name;
               const last_name = req.body.last_name;
               const gender = req.body.gender;
               const birthPlace = req.body.birthPlace;
               const birthState = req.body.birthState;
               const birthCountry = req.body.birthCountry;
               const dob = req.body.dob;
               const time = req.body.time;
               const language = req.body.language;
               const noOfQuestion = req.body.noOfQuestion;        

        await askQuestionService.postAsk_questionuser({ 
            id, first_name,last_name,gender,birthPlace,birthCountry,birthState,dob,time,language,noOfQuestion
         });
        res.send({ msg: 'askQuestion Detail create ...!' });
    } catch (err) {
        console.log(err);
        res.status(400).send({ err });
        // return next(err);
    }
});
router.post('/addaskuserdetail',async (req,res,next)=>{
    try{
        // id=req.params.id;
        const id=req.body.id;
        const first_name = req.body.first_name;
        const last_name= req.body.last_name;
        const gender = req.body.gender;
        const birthPlace = req.body.birthPlace;
        const birthState = req.body.birthState;
        const birthCountry = req.body.birthCountry;
        const dob = req.body.dob;
        const time = req.body.time;
        const language = req.body.language;
        const noOfQuestion = req.body.noOfQuestion;
        const question1=req.body.question1;
        const question2= req.body.question2;
        const question3 = req.body.question3;

        await askQuestionService.add_askquestionuser_detail({
            id, first_name,last_name,gender,birthPlace,birthCountry,birthState,dob,time,language,noOfQuestion,question1,question2,
            question3

        });
        res.json({ msg: 'askQuestion Detail added ...!' });



    }
    catch (err) {
        res.status(400).send( err +'value is not defined' );
    }
})




module.exports = router;