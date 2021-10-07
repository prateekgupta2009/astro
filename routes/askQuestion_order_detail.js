const express = require('express');
const router = express.Router();
const estore_addonsService = require('../services/estore_addons');
const Ask_Questionn_order_detail = require('../models/askQuestion_order_detail');
const database = require('../config/database');
const Cart = require('../models/userCart')
const OnlinePuja_order_detail=require('../models/onlinePuja_order_detail');


var ObjectId = require('mongodb').ObjectId;
var MongoClient = require('mongodb').MongoClient;


router.post('/ask_question_create_order_detail', async (req, res, next) => {
    try{
        const data={
            user_id: req.body.user_id,
            order_id:req.body.order_id,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            mobile: req.body.phone,
            gender: req.body.gender,
            birthplace: req.body.birthPlace,
            birthstate: req.body.birthState,
            birthCountry: req.body.birthCountry,
            dob: req.body.dob,
            tob: req.body.time,
            language: req.body.language,
            noofquestion: req.body.noOfQuestion,
            question1: req.body.question1,
            question2: req.body.question2,
            question3: req.body.question3,
            replayquestion1: null,
            replayquestion2: null,
            replayquestion3: null,
            status: 'question',
            totalPrice: req.body.totalPrice,
            perquestionprice: req.body.perquestionprice,
            paymentID:''
        }
       // console.log(data)

        Ask_Questionn_order_detail.create(
            data
          ).then(result=>{
            //   console.log(result)
              res.send({
                msg: 'create ask question order Detail',
                result:result
              })
          })
          .catch(err=>{
             console.log(err)
          })
          // .then(() => res.end());
         
    } 
    
    catch(err){
        res.send({
            msg:`Error+${err}`
        })
    }
})

module.exports = router;
