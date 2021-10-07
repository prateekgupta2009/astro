const express = require('express');
const router = express.Router();
var jwt = require('jsonwebtoken');
const database = require('../config/database')
const mongodb = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;



// online puja list 
router.get('/online_puja_Lists', (req, res, next) => {

  MongoClient.connect(database.dbConnection, function (err, db) {
    if (err) throw err;
    var dbo = db.db("astrology");
    dbo.collection("online_poojas").find({}, { useUnifiedTopology: true }).project({
      name: 1, duration_number: 1, duration_type: 1,
      file_1: 1, regular_price_inr: 1, sell_price_inr: 1, regular_price_usd: 1, sell_price_usd: 1, save_status: 1,category_id:1
    })
      .toArray(function (err, result) {
        if (err) {
          res.json({
            msg: 'List Not Found',
            result: err
          })
        };
        if (result.length === 0) {
          res.status(200).send({
            msg: 'List Empty',
            result: 'List Empty'
          })
        }
        else {
          res.status(200).send({
            msg: 'Success List',
            result: result.filter(el => {
              return el.save_status == "published"
            })
          })
        }

        db.close();
      });
  });
});

// find online puja detail by id
router.post(`/online_puja_Detail/:id`, (req, res, next) => {

  MongoClient.connect(database.dbConnection, function (err, db) {
    if (err) throw err;
    var dbo = db.db("astrology");
    dbo.collection("online_poojas").aggregate([
      { "$addFields": { "userId": { "$toString": "$_id" } } },
      {

        $lookup: {
          from: "online_pooja_addons",
          localField: "userId",
          foreignField: "product_id",
          as: "onlinepuja_addone"
        },

      },
      {

        $lookup: {
          from: "online_pooja_categories",

          localField: "_id.str",
          foreignField: "category_id",
          as: "pujacategory"
        },

      },
      {
        "$project": {
          "name": 1, "sku": 1, "rating": 1, "regular_price_inr": 1, "sell_price_inr": 1, "regular_price_usd": 1, "sell_price_usd": 1, "category_id": 1,
          "save_status": 1, "duration_number": 1, "duration_type": 1,
          "details": 1, "description": 1, "benifit": 1, "file_1": 1, "file_2": 1, "file_3": 1, "file_4": 1, "file_5": 1, "file_6": 1, "file_7": 1, "file_8": 1,
          pujaaddone: "$onlinepuja_addone",
          pujacategory: "$pujacategory"

        }
      },
    ])

      .toArray(function (err, result) {
        if (err) {
          res.json({
            result: err
          })
        }
        else {
          result.forEach(ele => {
            ele.pujaaddone.forEach((el) => {
              delete el.updated_at && delete el.created_at
            })
          })
          result.forEach(ele => {
            ele.pujacategorynameList = [];
            ele.pujacategory.forEach(lngid => {
              if (lngid._id == ele.category_id) {
                ele.pujacategorynameList.push(lngid.name)
              }

            });
          })
          result.forEach(ele => {
            delete ele.pujacategory

          })
          const resultdata = result.filter(el => {
            return el.save_status == "published" && el._id == req.params.id
          })
          if (resultdata.length === 0) {
            res.status(200).json({
              msg: 'List Empty',

              result: 'Astrologer Not found'

            })
          }
          else {
            res.status(200).json({
              msg: 'Success List',

              result: resultdata

            })
          }
        }

        db.close();
      });
  });
});
// all online puja category list 
router.get('/online_puja_categories', (req, res, next) => {

  MongoClient.connect(database.dbConnection, function (err, db) {
    if (err) throw err;
    var dbo = db.db("astrology");
    dbo.collection("online_pooja_categories").find({}, { useUnifiedTopology: true }).project({ "name": 1, "status": 1 })

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
// online puja category by onlie piuja id
router.post(`/online_puja_categories/:id`, (req, res, next) => {

  MongoClient.connect(database.dbConnection, function (err, db) {
    if (err) throw err;
    var dbo = db.db("astrology");
    dbo.collection("online_pooja_categories").find({ "_id": ObjectId(req.params.id) }, { useUnifiedTopology: true })
      .project({ "name": 1, "status": 1 })
      .toArray(function (err, result) {
        if (err) {
          res.json({
            result: err
          })
          console.log(err)
        };
        console.log(result);
        res.status(200).send({
          result
        })
        db.close();
      });
  });

});
// find  multi onlinepuja addone data
router.post('/online_puja_addoneList', (req, res, next) => {
  const _id1=req.body.id1
  const _id2=req.body.id2
  console.log(req.body)

  MongoClient.connect(database.dbConnection, function (err, db) {
    if (err) throw err;
    var dbo = db.db("astrology");
    dbo.collection("online_pooja_addons").find({ "_id":{"$in":[ObjectId(_id1),ObjectId(_id2)]} }, { useUnifiedTopology: true })
      // .project({ "name": 1, "status": 1 })
      .toArray(function (err, result) {
        if (err) {
          res.json({
            msg:'something eroor',
            result: err
          })
        };
        res.status(200).send({
          msg:'success',
          result:result
        })
        db.close();
      });
  });

});
//find single addone data
router.post('/online_puja_addone_Detail/:id', (req, res, next) => {
  const _id1=req.body.id1
  console.log(req.body)
  const country=req.body.country

  MongoClient.connect(database.dbConnection, function (err, db) {
    if (err) throw err;
    var dbo = db.db("astrology");
    dbo.collection("online_pooja_addons").find({ "_id":ObjectId(req.params.id) }, { useUnifiedTopology: true })
      // .project({ "name": 1, "status": 1 })
      .toArray(function (err, result) {
        if (err) {
          res.json({
            msg:'something eroor',
            result: err
          })
        };
        if(country==='India'){
          res.status(200).send({
            msg:'success',
            result:{
              _id:result[0]._id,
              type:result[0].type,
              price:result[0].price_inr, 
            }
  
          })
        }
        else{
          res.status(200).send({
            msg:'success',
            result:{
              _id:result[0]._id,
              type:result[0].type,
              price:result[0].price_usd, 
            }
  
          })
        }

        db.close();
      });
  });

});


router.get('/onlie_puja_detail', (req, res, next) => {

  MongoClient.connect(database.dbConnection, { useUnifiedTopology: true }, function (err, db) {
    if (err) throw err;
    var dbo = db.db("astrology");
    dbo.collection("online_poojas").find({}, { useUnifiedTopology: true }).toArray(function (err, result) {
      if (err) throw err;
      res.json({
        result: result
      })
      // result.forEach(ele=>console.log(ele.astrologercategories[0].category_id));


      db.close();
    });
  });

});


router.post('/find_pujaDetailByid', (req, res, next) => {
  const _id = req.body._id;
  console.log(req.body)
  MongoClient.connect(database.dbConnection, function (err, db) {
    if (err) throw err;
    var dbo = db.db("astrology");
    dbo.collection("online_poojas").find({ "_id": ObjectId(_id) }, { useUnifiedTopology: true })
      .toArray(function (err, result) {
        if (err) {
          res.json({
            result: err
          })
          console.log(err)
        };
       // console.log(result);
        res.json({
          result: result
        })
        db.close();
      });
  });

});

// online puja addon 


router.post('/find_pujaaddonByproductid', (req, res, next) => {
  const product_id = req.body._id;
  console.log(req.body)
  MongoClient.connect(database.dbConnection, function (err, db) {
    if (err) throw err;
    var dbo = db.db("astrology");
    dbo.collection("online_pooja_addons").find({ product_id: product_id }, { useUnifiedTopology: true })
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