const express = require('express');
const router = express.Router();
const estore_addonsService = require('../services/estore_addons');
const Estore_order = require('../models/estore_order');
const database = require('../config/database');
const Cart = require('../models/userCart')
const OnlinePuja_order_detail=require('../models/onlinePuja_order_detail');


var ObjectId = require('mongodb').ObjectId;
var MongoClient = require('mongodb').MongoClient;


router.post('/onlinePuja_create_order_detail', async (req, res, next) => {
    try{
        const data={
            order_id:req.body.order_id,
            onlinePuja_id:req.body.onlinePuja_id,
            name:req.body.name,
            sku:req.body.sku,
            status:req.body.status,
            category_id:req.body.category_id,
            regular_price_inr:req.body.regular_price_inr,
            sell_price_inr:req.body.sell_price_inr,
            regular_price_usd:req.body.regular_price_usd,
            sell_price_usd:req.body.sell_price_usd,
            duration_number:req.body.duration_number,
            duration_type:req.body.duration_type,
            BhojanAddoneId:req.body.BhojanAddoneId,
            DakshinaAddoneId:req.body.DakshinaAddoneId,
            DakshinaAddonePrice:req.body.DakshinaAddonePrice,
            BhojanAddonePrice:req.body.BhojanAddonePrice,
            username:req.body.username,
            userdob:req.body.userdob,
            userphoneno:req.body.userphoneno,
            usergotr:req.body.usergotr,
            date:req.body.date,
            time:req.body.time
        }
        console.log(data)

        OnlinePuja_order_detail.create(
            data
          ).then(result=>{
            //   console.log(result)
              res.send({
                msg: 'create OnlinePuja order Detail',
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


router.post('/getpujadetail', async (req, res, next) => {
    try{
      const order_id=req.body.order_id;
      OnlinePuja_order_detail.find({order_id:order_id},function(err,doc){
        if(err){
          res.send({
            msg:'Invalid Response',
            err:err
          })
        }
        else{
          res.send({
            msg:'Success List',
            result:doc
          })
        }
      })
    }
    catch{
        res.send({
          msg:'Invalid Response',
          err:err
        })
    }
  })
 
 
 
 
 



module.exports = router;
