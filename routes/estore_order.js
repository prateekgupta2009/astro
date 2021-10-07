const express = require('express');
const router = express.Router();
const estore_addonsService = require('../services/estore_addons');
const Estore_order = require('../models/estore_order');
const database = require('../config/database')
var randomize = require('randomatic');
var ObjectId = require('mongodb').ObjectId;



router.post('/estore_create_order', async (req, res, next) => {
    try {
      const productdata={
        currentorederId:randomize('000000'), 
      }
        Estore_order.create(
            req.body
          ).then(result=>{
            //   console.log(result)
              res.send({
                msg: 'create Estore order',
                result:result
              })
          })
          .catch(err=>{
           //   console.log(err)
          })
          // .then(() => res.end());
         
    } catch (err) {
     // console.log(err);
      res.send({
          msg:`Error+${err}`
      })
    }
  });

  // find and update data by id
  router.post('/estore_create_order_update', async (req, res, next) => {
    try {
      const  currentorederId=randomize('000000');
      
      var order_id = req.body.order_id
      Estore_order.findByIdAndUpdate({"_id":ObjectId(`${order_id}`)}, {currentorederId:currentorederId,address_id:req.body.address_id,status:'1',payment_status:'1'  },
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

  router.post('/getestore_orderbyuserid', async (req, res, next) => {
    try{
      const user_id=req.body.user_id;
      Estore_order.find({user_id:user_id},function(err,doc){
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