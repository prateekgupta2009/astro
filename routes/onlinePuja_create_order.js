const express = require('express');
const router = express.Router();
const estore_addonsService = require('../services/estore_addons');
const OnlinePuja_order = require('../models/onlinePuja_create_order');
const database = require('../config/database')
var randomize = require('randomatic');
var ObjectId = require('mongodb').ObjectId;
const axios = require('axios');
const OnlinePuja_order_detail=require('../models/onlinePuja_order_detail');




router.post('/onlinePuja_create_order', async (req, res, next) => {
    try {
      //  console.log(req.body)
      const productdata={
        currentorederId:randomize('000000'), 
      }
    //   const orderdetail={
    //     onlinePuja_id:req.body.onlinePuja_id,
    //     BhojanAddoneId:req.body.BhojanAddoneId,
    //     DakshinaAddoneId:req.body.DakshinaAddoneId
    //   }

      const data={
        user_id:req.body.user_id,
        amount:req.body.amount,
        time:req.body.time,
        date:req.body.date,
        discount:req.body.discount,
        status:"0",
        paymentmode:"online",
        payment_status:"0",
        delivery_status:"0",
        currentorederId:"",

      }
      const pujadata={
          _id:req.body.onlinePuja_id
      }
      axios.post('http://localhost:8000/api/find_pujaDetailByid',pujadata)
      .then(responsedata=>{
         // console.log(responsedata.data.result)
          if(responsedata.data.result.length>0){
              const detail=responsedata.data.result[0]
            OnlinePuja_order.create(
                data
              ).then(result=>{
                //  console.log(result)
                const orderdetaildata={
                    order_id:result._id,
                    onlinePuja_id:detail._id,
                    name:detail.name,
                    sku:detail.sku,
                    category_id:detail.category_id,
                    regular_price_inr:detail.regular_price_inr,
                    sell_price_inr:detail.sell_price_inr,
                    regular_price_usd:detail.regular_price_usd,
                    sell_price_usd:detail.sell_price_usd,
                    duration_number:detail.duration_number,
                    duration_type:detail.duration_type,
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
                OnlinePuja_order_detail.create(
                    orderdetaildata
                  ).then(result=>{
                    //   console.log(result)
                      res.send({
                        msg: 'create OnlinePuja order Detail',
                        result:result
                      })
                  })
                  .catch(err=>{
                    res.send({
                        msg:'Error'
                    })                
                  })
                  
              })
              .catch(err=>{
                res.send({
                    msg:'Error'
                }) 
              })

          }
      })
     
         
    } catch (err) {
     // console.log(err);
      res.send({
          msg:`Error+${err}`
      })
    }
  });

  // find and update data by id
  router.post('/onlinePuja_create_order_update', async (req, res, next) => {
    try {
      const  currentorederId=randomize('000000');
      
      var order_id = req.body.order_id
      OnlinePuja_order.findByIdAndUpdate({"_id":ObjectId(`${order_id}`)}, {currentorederId:currentorederId,status:'1',payment_status:'1'  },
                            function (err, docs) {
    if (err){
        console.log(err)
    }
    else{
      console.log('success updateds')
      res.send({
        msg:'updated success',
        result:docs
      })
        console.log("Updated User : ", docs);
    }
});
         
    } catch (err) {
     // console.log(err);
      res.send({
          msg:`Error+${err}`
      })
    }
  });
  router.post('/getonlinePuja_orderbyid', async (req, res, next) => {
    try{
      const order_id=req.body.order_id;
      OnlinePuja_order.find({"_id":ObjectId(`${order_id}`)},function(err,doc){
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
  router.post('/getonlinePuja_orderbyuserid', async (req, res, next) => {
    try{
      const user_id=req.body.user_id;
      OnlinePuja_order.find({user_id:user_id},function(err,doc){
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