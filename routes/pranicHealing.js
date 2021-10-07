const express = require('express');
const router = express.Router();
var jwt = require('jsonwebtoken');
const database = require('../config/database')
const mongodb = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;



// router.get('/pranichealingList', (req, res, next) => {

//     MongoClient.connect(database.dbConnection, function (err, db) {
//       if (err) throw err;
//       var dbo = db.db("astrology");
//       dbo.collection("pranic_healers").find({}, { useUnifiedTopology: true }).project({
//         name: 1, city: 1, status: 1,
//         rating: 1, experience: 1, clients: 1, regular_price_inr: 1, sell_price_inr: 1, regular_price_usd: 1,sell_price_usd:1,
//         image:1,image_path:1,about_us:1,
//       })
//         .toArray(function (err, result) {
//           if (err) {
//             res.json({
//               result: err
//             })
//             console.log(err)
//           };
//           console.log(result);
//           res.status(200).send({
//             result
//           })
//           db.close();
//         });
//     });
  
//   });


router.get('/pranichealingList', (req, res, next) => {

  MongoClient.connect(database.dbConnection, { useUnifiedTopology: true }, function (err, db) {
      if (err) throw err;
      var dbo = db.db("astrology");
      dbo.collection("pranic_healers").aggregate([

          { "$addFields": { "userId": { "$toString": "$_id" } } },

          {
              $lookup: {
                  from: "subcategories",
                  localField: "category_id",
                  foreignField: "userId",
                  as: "prenicHealerlanguages"


              },
          }

      ]).toArray(function (err, result) {
          if (err) {
              res.status(400).json({
                  msg: 'Something Error'
              })
          }
    //       result.forEach(ele => {
    //         language =  JSON.parse(ele.language)
    //           ele.languageList = [];
    //           language.forEach(lngid => {
    //               ele.prenicHealerlanguages.forEach(el => {
    //                   if (lngid == el._id) {
    //                       ele.languageList.push(el.name)
    //                   }
    //               })
    //           });
        

    //    })
       result.forEach(ele => {
        delete ele.prenicHealerlanguages
            && delete ele.userId
            && delete ele.created_at
            && delete ele.updated_at
            && delete ele.language
            && delete ele.commission
            && delete ele.state_id
            && delete ele.country_id
            && delete ele.address
            && delete ele.password
            && delete ele.mobile
            && delete ele.email
            && delete ele.dob
            && delete ele.gender
            && delete ele.salutation       
    })
          res.status(200).json({
              msg: 'Success List',
              result: result
          })


          db.close();
      });
  });

});


router.post('/findpranichealing_List/:id', (req, res, next) => {

  MongoClient.connect(database.dbConnection, { useUnifiedTopology: true }, function (err, db) {
      if (err) throw err;
      var dbo = db.db("astrology");
      dbo.collection("pranic_healers").aggregate([

          { "$addFields": { "userId": { "$toString": "$_id" } } },

          {
              $lookup: {
                  from: "subcategories",
                  localField: "category_id",
                  foreignField: "userId",
                  as: "prenicHealerlanguages"


              },
          }

      ]).toArray(function (err, result) {
          if (err) {
              res.status(400).json({
                  msg: 'Something Error'
              })
          }
          result.forEach(ele => {
            language =  JSON.parse(ele.language)
            console.log(language)
              ele.languageList = [];
              language.forEach(lngid => {
                  ele.prenicHealerlanguages.forEach(el => {
                      if (lngid == el._id) {
                          ele.languageList.push(el.name)
                      }
                  })
              });
        

       })
       result.forEach(ele => {
        delete ele.prenicHealerlanguages
            && delete ele.userId
            && delete ele.created_at
            && delete ele.updated_at
            && delete ele.language
            && delete ele.commission
            && delete ele.state_id
            && delete ele.country_id
            && delete ele.address
            && delete ele.password
            && delete ele.mobile
            && delete ele.email
            && delete ele.dob
            && delete ele.gender
            && delete ele.salutation       
    })
          
          res.status(200).json({
              msg: 'Success List',
              result: result.filter(el=>{
               return  el._id==req.params.id
              })
          })
        


          db.close();
      });
  });

});

module.exports = router;