const express = require('express');
const router = express.Router();
const estore_addonsService = require('../services/estore_addons');
const OnlinePuja_payment_detail = require('../models/onlinePuja_payment_detail');
const database = require('../config/database');
const OnlinePuja_order_detail=require('../models/onlinePuja_order_detail');


router.post('/onlinePuja_create_paymment_detail', async (req, res, next) => {
    try {
        const data={
            user_id:req.body.user_id,
            payment_id:req.body.payment_id,
            order_id:req.body.order_id,
            pay_amount:req.body.pay_amount,
            time:req.body.time,
            date:req.body.date,
            amount_refunded:req.body.amount_refunded,
            contact:req.body.contact,
            currency:req.body.currency,
            description:req.body.description,
            email:req.body.email,
            international:req.body.international,
            method:req.body.method,
            payment_order_id:req.body.payment_order_id,
            payment_status:req.body.payment_status,
        }
        OnlinePuja_payment_detail.create(
            data
          ).then(result=>{
              res.send({
                msg: 'create OnlinePuja payment detail',
                result:result
              })
          })
          .catch(err=>{
              res.send({
                  msg:'Something Error'
              })
          })
         
    } catch (err) {
     // console.log(err);
      res.send({
          msg:`Error+${err}`
      })
    }
  });


module.exports = router;