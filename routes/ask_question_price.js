
const express = require('express');
const router = express.Router();
var jwt = require('jsonwebtoken');
const database = require('../config/database')
const mongodb = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;

// all online puja category list 
router.get('/ask_question_price', (req, res, next) => {

    MongoClient.connect(database.dbConnection, function (err, db) {
      if (err) throw err;
      var dbo = db.db("astrology");
      dbo.collection("question_prices").find({}, { useUnifiedTopology: true })
  
        .toArray(function (err, result) {
          if (err) {
            res.json({
              msg:'List Not Found',
              result: err
            })
            console.log(err)
          };
          console.log(result);
          res.status(200).send({
            msg:'success',
            result:result
          })
          db.close();
        });
    });
  
  });



module.exports = router;