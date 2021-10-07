const express = require('express');
const router = express.Router();
const estore_addonsService = require('../services/estore_addons');
const Askquestion_order = require('../models/askQuestion_order');
const database = require('../config/database');
var randomize = require('randomatic');
var ObjectId = require('mongodb').ObjectId;
const Ask_Questionn_order_detail = require('../models/askQuestion_order_detail');




router.post('/askquestion_create_order', async (req, res, next) => {
  try {

    const data = {
      user_id: req.body.user_id,
      amount: req.body.amount,
      time: req.body.time,
      date: req.body.date,
      discount: req.body.discount,
      status: 'questionn',
      paymentmode: req.body.paymentmode,
      payment_status: '0',
      delivery_status: '0',
      currentorederId: '',
    }
    Askquestion_order.create(
      data
    ).then(result => {
      console.log(result)
      const orderdetail = {
        order_id:result._id,
        user_id: req.body.user_id,
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
        replayquestion1: req.body.replayquestion1,
        replayquestion2: req.body.replayquestion2,
        replayquestion3: req.body.replayquestion3,
      }
      Ask_Questionn_order_detail.create(
        orderdetail
      ).then(response=>{
           console.log(response)
          res.send({
            msg: 'create askQuestion order Detail',
            result:response
          })
      })
      .catch(err=>{
         console.log(err)
      })

    })

      .catch(err => {
        //   console.log(err)
      })
    // .then(() => res.end());

  } catch (err) {
    // console.log(err);
    res.send({
      msg: `Error+${err}`
    })
  }
});

// find and update data by id
router.post('/askQuestion_create_order_update', async (req, res, next) => {
  try {
    const currentorederId = randomize('000000');

    var order_id = req.body.order_id
    Askquestion_order.findByIdAndUpdate({ "_id": ObjectId(`${order_id}`) }, { currentorederId: currentorederId, status: '1', payment_status: '1' },
      function (err, docs) {
        if (err) {
          console.log(err)
        }
        else {
          console.log('success updateds')
          res.send({
            msg: 'updated success',
            result: docs

          })
          console.log("Updated User : ", docs);
        }
      });

  } catch (err) {
    // console.log(err);
    res.send({
      msg: `Error+${err}`
    })
  }
});

module.exports = router;