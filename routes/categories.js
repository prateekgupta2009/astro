const express = require('express');
const router = express.Router();
var jwt = require('jsonwebtoken');
const database = require('../config/database')
const mongodb = require('mongodb');
var MongoClient = require('mongodb').MongoClient;

// const client = new MongoClient(url, { useNewUrlParser: true });
// const collection = client.db("astrology").collection("astrologers");




router.get('/categoriestype',  (req, res, next) => {
    const  astrologer_id=req.body;
    console.log(req.body.astrologer_id)
 MongoClient.connect(database.dbConnection, function(err, db) {
     if (err) throw err;
     var dbo = db.db("astrology");
    dbo.collection("categories").find({},{useUnifiedTopology: true})
    .toArray(function(err, result) {
      if (err) {
        res.json({
          result:err
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


router.get('/categories', (req, res, next) => {

    MongoClient.connect(database.dbConnection, { useUnifiedTopology: true }, function (err, db) {
        if (err) throw err;
        var dbo = db.db("astrology");
        dbo.collection("categories").aggregate([

            { "$addFields": { "userId": { "$toString": "$_id" } } },

            {
                $lookup: {
                    from: "subcategories",
                    localField: "userId",
                    foreignField: "category_id",
                    as: "categories"


                },
            },
           
            
        ]).toArray(function (err, result) {
            if (err) throw err;
            res.json({
                result: result
            })   
            // result.forEach(ele=>console.log(ele.astrologercategories[0].category_id));
                
            db.close();
        });
    });

});




module.exports = router;