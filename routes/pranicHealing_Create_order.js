const express = require('express');
const router = express.Router();
const estore_addonsService = require('../services/estore_addons');
const PranicHealing_order = require('../models/prannicHealinng_create_order');
const database = require('../config/database')
var randomize = require('randomatic');
var ObjectId = require('mongodb').ObjectId;
const axios = require('axios');
const PranicHealing_order_detail=require('../models/prenicHealing_Create_Detail');




router.post('/pranichealing_create_order', async (req, res, next) => {
    try {
      //  console.log(req.body)

    //   const orderdetail={
    //     onlinePuja_id:req.body.onlinePuja_id,
    //     BhojanAddoneId:req.body.BhojanAddoneId,
    //     DakshinaAddoneId:req.body.DakshinaAddoneId
    //   }

      const create_order_data=
      {
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
      const order_detail_data={
        user_id:req.body.user_id,
          }
     
         // console.log(responsedata.data.result)
              PranicHealing_order.create(
                create_order_data
              )
              .then(result=>{
                const order_detail_data={
                    user_id:req.body.user_id,
                    order_id:result.id,
                    pranic_healer_id:req.body.pranic_healer_id,
                    name: req.body.name,
                    email: req.body.email,
                    mobile: req.body.mobile,
                    gender: req.body.gender,
                    age_group: req.body.age_group,
                    marital_status: req.body.marital_status,
                    dob: req.body.dob,
                    address: req.body.address,
                    country_id: req.body.country_id,
                    state_id: req.body.state_id,
                    city: req.body.city,
                    pincode: req.body.pincode,
                    occupation: req.body.occupation,
                    medical_condition: req.body.medical_condition,
                    symptoms: req.body.symptoms,
                    charge_price:req.body.charge_price,
                      }
                      PranicHealing_order_detail.create(
                        order_detail_data
                      )
                      .then(response=>{
                          res.send({
                            msg:'create order & Detail',
                            result:result
                          })
                      })
                  
                
                  
              })
              

          
    
     
         
    } catch (err) {
     // console.log(err);
      res.send({
          msg:`Error+${err}`
      })
    }
  });

  // find and update data by id
  router.post('/pranicHealing_create_order_update', async (req, res, next) => {
    try {
      const  currentorederId=randomize('000000');
      
      var order_id = req.body.order_id
      PranicHealing_order.findByIdAndUpdate({"_id":ObjectId(`${order_id}`)}, {currentorederId:currentorederId,status:'1',payment_status:'1'  },
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

module.exports = router;