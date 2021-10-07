const express = require('express');
const router = express.Router();
const astrologer_languageService = require('../services/astrologer_languages');
const database = require('../config/database')
const mongodb = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;

// const client = new MongoClient(url, { useNewUrlParser: true });
// const collection = client.db("astrology").collection("astrologers");


router.get('/subcategories', (req, res, next) => {

  MongoClient.connect(database.dbConnection, function (err, db) {
    if (err) throw err;
    var dbo = db.db("astrology");
    dbo.collection("subcategories").find({}, { useUnifiedTopology: true })
      .toArray(function (err, result) {
        if (err) {
          res.json({
            result: err
          })
          console.log(err)
        };
        console.log(result);
        res.json({
          result
        })
        db.close();
      });
  });

});

router.post('/find_subcategories', (req, res, next) => {
  const category_id = req.body;
  console.log(req.body.category_id)
  MongoClient.connect(database.dbConnection, function (err, db) {
    if (err) throw err;
    var dbo = db.db("astrology");
    dbo.collection("subcategories").find({ "_id": ObjectId(`${category_id.category_id}`) }, { useUnifiedTopology: true })
      .toArray(function (err, result) {
        if (err) {
          res.json({
            result: err
          })
          console.log(err)
        };
        console.log(result);
        res.json({
          result: result
        })
        db.close();
      });
  });

});


router.post('/find_langsubcategories', (req, res, next) => {
  const language_id = req.body;
  console.log(req.body.language_id)
  MongoClient.connect(database.dbConnection, function (err, db) {
    if (err) throw err;
    var dbo = db.db("astrology");
    dbo.collection("subcategories").find({ "_id": ObjectId(`${language_id.language_id}`) }, { useUnifiedTopology: true })
      .toArray(function (err, result) {
        if (err) {
          res.json({
            result: err
          })
          console.log(err)
        };
        console.log(result);
        res.json({
          result: result
        })
        db.close();
      });
  });

});



module.exports = router;