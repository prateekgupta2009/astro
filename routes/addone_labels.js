const express = require('express');
const router = express.Router();
const astrologer_languageService = require('../services/astrologer_languages');
const database = require('../config/database')
const mongodb = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
const shortid = require('shortid');







router.get('/getaddonelabels', (req, res, next) => {

  MongoClient.connect(database.dbConnection, function (err, db) {
    if (err) throw err;
    var dbo = db.db("astrology");
    dbo.collection("addon_labels").find({},{ useUnifiedTopology: true }).toArray(function (err, result) {
      if (err) {
        console.log(err)
        res.json({
          msg:'Addone List Empty'
        })
      };
      console.log(result);
      res.json({
        result
      })
      db.close();
    });
  });
  });

  router.get('/getaddonelabelstypedetails', (req, res, next) => {
    const product_id=req.body.product_id;
    const type_id =req.body.type_id;
    MongoClient.connect(database.dbConnection, function (err, db) {
      if (err) throw err;
      var dbo = db.db("astrology");
      dbo.collection("estore_addons").find({},{ useUnifiedTopology: true }).toArray(function (err, result) {
        if (err) {
          console.log(err)
          res.json({
            msg:'Addone type List Empty'
          })
        };
        console.log(result);
        res.json({
          result
        })
        db.close();
      });
    });
    });

module.exports = router;