const express = require('express');
const router = express.Router();
const database = require('../config/database')
const mongodb = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;



// estroe product list 
router.get('/estore_product_List', (req, res, next) => {

  MongoClient.connect(database.dbConnection, { useUnifiedTopology: true }, function (err, db) {
      if (err) throw err;
      var dbo = db.db("astrology");
      dbo.collection("e_stores").aggregate([

        { "$addFields": { "userId": { "$toString": "$_id" } } },

 
        {

          $lookup: {
              from: "estore_categories",
              
              localField: "_id.str",
              foreignField: "category_id",
              as: "productcat"
          },
          
      },
      {

        $lookup: {
            from: "estore_sub_categories",
            
            localField: "_id.str",
            foreignField: "subcategory_id",
            as: "productsubcategory"
        },
        
    },
    { "$project": { 
      "name": 1,"regular_price_inr":1,"sell_price_inr":1,"regular_price_usd":1,"sell_price_usd":1,"save_status":1,"file_1":1,
      "category_id":1,"subcategory_id":1,"weight_carat":1,"weight_ratti":1,
      productcat: "$productcat"  ,
      productsubcategory:"$productsubcategory",
     
  }} ,

          
      ]).toArray(function (err, result) {
          if(err){
              res.status(400).json({
                  msg:'Something Error'
              })
          }
          else{

            result.forEach(ele => {
              ele.categorynameList = [];
              ele.productcat.forEach(lngid => {
                      if( lngid._id==ele.category_id){
                          ele.categorynameList.push(lngid.name)
                      }
                
              });
          })
          
          result.forEach(ele => {
            ele.subcategorynameList = [];
            ele.productsubcategory.forEach(lngid => {
                    if( lngid._id==ele.subcategory_id){
                        ele.subcategorynameList.push(lngid.name)
                    }
              
            });
        })
        result.forEach(ele=>{
          delete ele.productsubcategory 
       && 
      delete    ele.productcat
      // && delete ele.userId
      //  && delete ele.astrologercat
      })
         
          res.status(200).json({
              msg:'Success List',
              result: result.filter(el=>{
                  return el.save_status=="published"
              })
              
          })
      }
    
              
               
          db.close();
      });
  });

});

//estore product detail  by id

router.post('/estore_product_DetailbyId/:id', (req, res, next) => {

  MongoClient.connect(database.dbConnection, { useUnifiedTopology: true }, function (err, db) {
      if (err) throw err;
      var dbo = db.db("astrology");
      dbo.collection("e_stores").aggregate([

        { "$addFields": { "userId": { "$toString": "$_id" } } },
        {

          $lookup: {
            from: "estore_addons",
            localField: "userId",
            foreignField: "product_id",
            as: "estore_addone"
          },
  
        },

        {

          $lookup: {
              from: "estore_categories",
              
              localField: "_id.str",
              foreignField: "category_id",
              as: "productcat"
          },
          
      },
      {

        $lookup: {
            from: "estore_sub_categories",
            
            localField: "_id.str",
            foreignField: "subcategory_id",
            as: "productsubcategory"
        },
        
    },
    { "$project": { 
      "name": 1,"regular_price_inr":1,"sell_price_inr":1,"regular_price_usd":1,"sell_price_usd":1,"save_status":1,"file_1":1,
      "category_id":1,"subcategory_id":1,"sku":1,"details":1,"key_feature":1,"description":1,"disclaimer":1,"weight_carat":1,"weight_ratti":1,
       "file_2": 1, "file_3": 1, "file_4": 1, "file_5": 1, "file_6": 1, "file_7": 1, "file_8": 1,
      productcat: "$productcat"  ,
      productsubcategory:"$productsubcategory",
      estore_addone:"$estore_addone"
     
  }} ,

          
      ]).toArray(function (err, result) {
          if(err){
              res.status(400).json({
                  msg:'Something Error'
              })
          }
          else{

            result.forEach(ele => {
              ele.categorynameList = [];
              ele.productcat.forEach(lngid => {
                      if( lngid._id==ele.category_id){
                          ele.categorynameList.push(lngid.name)
                      }
                
              });
          })
          
          result.forEach(ele => {
            ele.subcategorynameList = [];
            ele.productsubcategory.forEach(lngid => {
                    if( lngid._id==ele.subcategory_id){
                        ele.subcategorynameList.push(lngid.name)
                    }
              
            });
        })
        result.forEach(ele=>{
          delete ele.productsubcategory 
       && 
      delete    ele.productcat
      // && delete ele.userId
      //  && delete ele.astrologercat
      })
         
          res.status(200).json({
              msg:'Success List',
              result: result.filter(el=>{
                  return el.save_status=="published" &&   el._id==req.params.id
              })
              
          })
      }
    
              
               
          db.close();
      });
  });

});

router.get('/estoreProductDetail', (req, res, next) => {

  MongoClient.connect(database.dbConnection, function (err, db) {
    if (err) throw err;
    var dbo = db.db("astrology");
    dbo.collection("e_stores").find({},{ useUnifiedTopology: true }).toArray(function (err, result) {
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

  router.post('/estoreproduct/:id', (req, res, next) => {
    MongoClient.connect(database.dbConnection, function (err, db) {
      if (err) throw err;
      var dbo = db.db("astrology");
      dbo.collection("e_stores").find({ "_id": ObjectId(`${req.params.id}`) }, { useUnifiedTopology: true })
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
  //  Estore Category with subCategory

  router.get('/find_Estore_category', (req, res, next) => {

    MongoClient.connect(database.dbConnection, { useUnifiedTopology: true }, function (err, db) {
        if (err) throw err;
        var dbo = db.db("astrology");
        dbo.collection("estore_categories").aggregate([

            { "$addFields": { "userId": { "$toString": "$_id" } } },
            

            {
              $lookup: {
                  from: "estore_sub_categories",
                  localField: "userId",
                  foreignField: "category_id",
                  as: "EstoreSubCategory"


              },
          }

            
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

// filter document by price
router.post('/filterByprice', (req, res, next) => {
  const minPrice=req.body.minprice;
  const maxPrice=req.body.maxprice;
  MongoClient.connect(database.dbConnection, function (err, db) {
    if (err) throw err;
    var dbo = db.db("astrology");
    dbo.collection("e_stores").find( {regular_price_inr:{$gte:`${minPrice}`,$lte:`${maxPrice}`}}, { useUnifiedTopology: true })
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