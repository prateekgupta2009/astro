const express = require('express');
const router = express.Router();
const estore_addonsService = require('../services/estore_addons');
const Estore_payment_detail = require('../models/estore_payment_detail');
const database = require('../config/database')

router.post('/estore_create_paymment_detail', async (req, res, next) => {
    try {
        Estore_payment_detail.create(
            req.body
          ).then(result=>{
            //   console.log(result)
              res.send({
                msg: 'create Estore payment detail',
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