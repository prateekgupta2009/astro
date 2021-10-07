const express = require('express');
const router = express.Router();
const astrologer_languageService = require('../services/astrologer_languages');
const database = require('../config/database')
const mongodb = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;


router.post('/astrologer_time', (req, res, next) => {
  const astrologer_id = req.body;
  console.log(req.body.astrologer_id)
  MongoClient.connect(database.dbConnection, function (err, db) {
    if (err) throw err;
    var dbo = db.db("astrology");
    dbo.collection("astrologer_time_availabilities").find({ "astrologer_id": `${astrologer_id.astrologer_id}` }, { useUnifiedTopology: true })
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

router.put('/astrologer_time_update', (req, res, next) => {
  const data={
    astrologer_id:req.body.astrologer_id,
    days:req.body.dayname,
    slot_one_opening:req.body.slot_one_opening,
    slot_one_closing:req.body.slot_one_closing,
    slot_two_opening:req.body.slot_two_opening,
    slot_two_closing:req.body.slot_two_closing,
    slot_three_opening :req.body.slot_three_opening,
    slot_three_closing :req.body.slot_three_closing,
  }
  console.log(req.body.astrologer_id)
  MongoClient.connect(database.dbConnection, function (err, db) {
    if (err) throw err;
    var dbo = db.db("astrology");
  dbo.collection('astrologer_time_availabilities').findOneAndUpdate(
    {astrologer_id:data.astrologer_id,days:data.days}, // query
    {$set: {slot_one_opening:data.slot_one_opening,slot_one_closing:data.slot_one_closing,
      slot_two_opening:data.slot_two_opening,slot_two_closing:data.slot_two_closing,
      slot_three_opening:data.slot_three_opening,slot_three_closing:data.slot_three_closing}}, // replacement, replaces only the field "hi"
    {useUnifiedTopology: true}, // options
    function(err, object) {
        if (err){
            console.log(err.message);  // returns error if no matching object found
        }else{
          res.status(200).json({
            msg:'success update Time'
          })
          console.log('succesee')
            console.log(object);
        }
    });
   });

});

module.exports = router;