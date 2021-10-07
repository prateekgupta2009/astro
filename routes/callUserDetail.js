const express = require('express');
const router = express.Router();
const Call_UserDetail = require('../models/callUserDetail');
const database = require('../config/database')
var randomize = require('randomatic');
var ObjectId = require('mongodb').ObjectId;



router.post('/addCallUserDetail', async (req, res, next) => {
    try {
        console.log(req.body)
      const data={
        user_id:req.body.user_id,
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        dob:req.body.dob,
        tob:req.body.tob,
        address:req.body.address
      }
      Call_UserDetail.create(
            data
          ).then(result=>{
            //   console.log(result)
              res.send({
                msg: 'create Call User',
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

module.exports = router;