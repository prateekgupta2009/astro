const express = require('express');
const router = express.Router();
const astrologer_languageService = require('../services/astrologer_languages');
const database = require('../config/database')
const mongodb = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
const shortid = require('shortid');




router.post('/patientPremnichealerReport', (req, res, next) => {
    const myobj ={  
        user_id:req.body.user_id, 
        pranic_healer_id:req.body.pranic_healer_id,
        name:req.body.name,
        email:req.body.email,
        mobile:req.body.mobile,
        gender:req.body.gender,
        age_group:req.body.age_group,
        dob: req.body.dob,
        marital_status:req.body.marital_status,
        address:req.body.address,
        country_id:req.body.country_id,
        state_id:req.body.state_id,
        city:req.body.city,
        pincode:req.body.pincode,
        occupation:req.body.occupation,
        medical_condition:req.body.medical_condition,
        symptoms:req.body.symptoms,
        status:req.body.status,
        currentOrderID:shortid.generate(),
        paymentID:req.body.paymentID

    }
  console.log(myobj)
  MongoClient.connect(database.dbConnection, function (err, db) {
    if (err) throw err;
    var dbo = db.db("astrology");
    dbo.collection("pranic_patients").insertOne(myobj, { useUnifiedTopology: true },
      function (err, result) {
        if (err) {
          res.json({
            result: err,
            msg:'SomeThing Error Try again Later'
          })
          console.log(err)
        };
        console.log(result);
        res.json({
          result:result,
          msg:'your Report add SuccessFully'
        })
        db.close();
      })
  });

});


router.post('/updatepatientPremnichealerReport', (req, res, next) => {
    const myobj ={
        pranic_healer_id:req.body.pranic_healer_id,
        name:req.body.name,
        email:req.body.email,
        mobile:req.body.mobile,
        gender:req.body.gender,
        age_group:req.body.age_group,
        marital_status:req.body.marital_status,
        address:req.body.address,
        country_id:req.body.country_id,
        state_id:req.body.state_id,
        city:req.body.city,
        pincode:req.body.pincode,
        occupation:req.body.occupation,
        medical_condition:req.body.medical_condition,
        symptoms:req.body.symptoms,
        status:req.body.status
    }
    var _id=req.body._id;
    var query = { _id:ObjectId(_id)};
    var newvalues = { $set: myobj };
  console.log(myobj)
  MongoClient.connect(database.dbConnection, function (err, db) {
    if (err) throw err;
    var dbo = db.db("astrology");
    dbo.collection("pranic_patients").updateOne(query,newvalues, { useUnifiedTopology: true },
      function (err, result) {
        if (err) {
          res.json({
            result: err
          })
          console.log(err)
        };
        console.log(result);
        res.json({
          result:result,
          msg:'updated record'
        })
        db.close();
      })
  });

});


router.post('/deletepatientPremnichealerReport', (req, res, next) => {

    var _id=req.body._id;
    var query = { _id:ObjectId(_id)};
  MongoClient.connect(database.dbConnection, function (err, db) {
    if (err) throw err;
    var dbo = db.db("astrology");
    dbo.collection("pranic_patients").deleteOne(query, { useUnifiedTopology: true },
      function (err, result) {
        if (err) {
          res.json({
            result: err
          })
          console.log(err)
        };
        console.log(result);
        res.json({
          result:result,
          msg:'delete record'
        })
        db.close();
      })
  });
});


router.post('/getepatientPremnichealerReport', (req, res, next) => {
    var pranic_healer_id=req.body.user_id;
    // var query = { pranic_healer_id:pranic_healer_id};
    var query = { user_id:pranic_healer_id};

    MongoClient.connect(database.dbConnection, function (err, db) {
      if (err) throw err;
      var dbo = db.db("astrology");
      dbo.collection("pranic_patients").find(query, { useUnifiedTopology: true })
        .toArray(function (err, result) {
          if (err) {
            res.json({
              result: err,
              msg:'document not find'
            })
            console.log(err)
          };
          console.log(result);
          res.status(200).send({
            msg:'find order list',
            result
          })
          db.close();
        });
    });
  
  });

module.exports = router;