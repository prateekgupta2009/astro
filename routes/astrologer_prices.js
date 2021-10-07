const express = require('express');
const router = express.Router();
var jwt = require('jsonwebtoken');
const database= require('../config/database')
const mongodb = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
let url =  "mongodb+srv://astrosarathi:p@ssword.123@astrosarathi.wln5c.mongodb.net/astrology?retryWrites=true&w=majority"
// const client = new MongoClient(url, { useNewUrlParser: true });
// const collection = client.db("astrology").collection("astrologers");






router.get('/astrologer_price',  (req, res, next) => {
  
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("astrology");
       dbo.collection("astrologer_prices").find({}).toArray(function(err, result) {
         if (err) {
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

router.put('/astrologer_service_prices', (req, res, next) => {
    const data={
      astrologer_id:req.body.astrologer_id,
      call_minut : req.body.call_minut,
    call_price : req.body.call_price,
    chat_minut :req.body.chat_minut,
    chat_price :req.body.chat_price,
    video_minut : req.body.video_minut,
    video_price : req.body.video_price,
    dolar_call_price : req.body.dolar_call_price,
    dolar_chat_price : req.body.dolar_chat_price,
    dolar_video_price : req.body.dolar_video_price,
    }
    console.log(req.body.astrologer_id)
    MongoClient.connect(database.dbConnection, function (err, db) {
      if (err) throw err;
      var dbo = db.db("astrology");
    dbo.collection('astrologer_prices').findOneAndUpdate(
      {astrologer_id:data.astrologer_id}, // query
      {$set: {call_minut:data.call_minut,
        call_price:data.call_price,
        chat_minut:data.chat_minut,
        chat_price:data.chat_price,
        video_minut:data.video_minut,
        video_price:data.video_price,
        dolar_call_price:data.dolar_call_price,
        dolar_chat_price:data.dolar_chat_price,
        dolar_video_price:data.dolar_video_price}}, // replacement, replaces only the field "hi"
      {useUnifiedTopology: true}, // options
      function(err, object) {
          if (err){
              console.log(err.message);  // returns error if no matching object found
          }else{
            res.status(200).json({
              msg:'success update price'
            })
            console.log('succesee')
              console.log(object);
          }
      });
     });
  
  });



module.exports = router;