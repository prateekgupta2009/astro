const express = require('express');
const router = express.Router();
const AskQuestionUserService = require('../services/askQuestionUser');
const askQuestionUser = require('../models/askQuestionUser');
const shortid = require('shortid');



router.post('/findaskquestionUser/:id', async (req, res, next) => {
    try {
        askQuestionUser.find({ user_id: req.params.id })
            .exec()
            .then(user => {
                if (user.length < 1) {
                    // console.log(user)
                    res.status(202).json({
                        msg: 'Askquestion_User Not Found'
                    })
                }
                else {
                    res.json({
                        msg: 'Askquestion_User Found',
                        user: user
                    })
                }
            })

    } catch (err) {
        console.log(err);
        res.status(404).send({ err });
    }
});


router.post('/findOrderDetailByCurrentOrderId', async (req, res, next) => {
  const   currentOrderID=req.body.currentOrderID
  console.log(currentOrderID)
    try {
        askQuestionUser.find({ currentOrderID: currentOrderID })
            .exec()
            .then(orderDetail => {
                if (orderDetail.length < 1) {
                    // console.log(user)
                    res.json({
                        msg: 'order Not Found by currentOrderId !'
                    })
                }
                else {
                    res.json({
                        msg: 'order Found by currentOrderId !',
                        success_msg:'Your order has been placed successfully!',
                        orderDetail: orderDetail
                    })
                }
            })

    } catch (err) {
        console.log(err);
        res.status(400).send({ err });
    }
});


router.post('/createAskQuestionUser', async (req, res, next) => {
    console.log(req.body)
    try {
const user_id=req.body.user_id;
const first_name=req.body.first_name;
const last_name=req.body.last_name;
const email=req.body.email;
const mobile=req.body.mobile;
const birthplace=req.body.birthplace;
const birthstate=req.body.birthstate;
const birthCountry=req.body.birthCountry;
const dob=req.body.dob;
const tob=req.body.tob;
const language=req.body.language;
const noofquestion=req.body.noofquestion;
const question1=req.body.question1;
const question2=req.body.question2;
const question3=req.body.question3;
const replayquestion1=req.body.replayquestion1;
const replayquestion2=req.body.replayquestion2;
const replayquestion3= req.body.replayquestion3;
const status= req.body.status;
const totalPrice= req.body.totalPrice;
const perquestionprice= req.body.perquestionprice;
var  currentOrderID=shortid.generate();  
const paymentID=req.body.paymentID;
const gender= req.body.gender
console.log(req.body)  
        await AskQuestionUserService.createAskquestionUser({
            user_id, first_name, last_name, email, mobile,birthplace,birthstate,birthCountry,
            dob,tob,noofquestion,question1,question2,question3,replayquestion1,language,gender,
            replayquestion2,replayquestion3,status,totalPrice,perquestionprice,currentOrderID,paymentID
        
        });
        res.status(200).send({
            success:true,
            msg: 'Question submitted',
            currentOrderID:currentOrderID
        });
    } catch (err) {
        console.log(err);
             res.status(400).send(err);

    }
});



module.exports = router;