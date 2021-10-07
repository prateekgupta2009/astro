const express = require('express');
const router = express.Router();
const astrologer_categoriesService = require('../services/astrologer_categories');
var MongoClient = require('mongodb').MongoClient;
const database= require('../config/database')


router.get('/astrologer_categories', async (req, res, next) => {
    try {
      const astrologer_categories = await astrologer_categoriesService.getAstrologer_categoriesList();
      res.json(astrologer_categories);
    } catch (err) {
      console.log(err);
      return next(err);
    }
  });

// astrologer category list
  router.get('/astrologer_category_lists',  (req, res, next) => {
  
    MongoClient.connect(database.dbConnection, { useUnifiedTopology: true }, function (err, db) {
      if (err) throw err;
      var dbo = db.db("astrology");
      dbo.collection("astrologer_categories").aggregate([
        { "$addFields": { "userId": { "$toString": "$_id" } } },
  
        {
            
          $lookup: {
              from: "subcategories",
              localField: "_id.str",
              foreignField: "userId",
              as: "category"
          },
          
      },     
      ]).toArray(function (err, result) {
          if(err){
              res.status(400).json({
                  msg:'Something Error'
              })
          }
          else{
          result.forEach(ele => {
              ele.name ;
                  ele.category.forEach(el=>{
                      if( ele.category_id==el._id){
                        //  ele.languageList.push(el.name)
                          ele.name=el.name
                      }
                  
              });
          })
          result.forEach(ele=>{
              delete ele.category 
            && 
           delete    ele.userId
           && delete ele.astrologer_id
            && delete ele.created_by
                    && delete ele.updated_at
            && delete ele.created_at
          })
         
          res.status(200).json({
              msg:'Success List',
              // result:result
              result: [...new Map(result.map(item => [item.category_id, item])).values()]    
          })
      }
              
               
          db.close();
      });
  });
    
    });


module.exports = router;