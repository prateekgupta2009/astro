const express = require('express');
const router = express.Router();
const astrologer_languageService = require('../services/astrologer_languages');
const database= require('../config/database')
const mongodb = require('mongodb');
var MongoClient = require('mongodb').MongoClient;



router.get('/astrologer_language',  (req, res, next) => {
  
MongoClient.connect(database.dbConnection, function(err, db) {
   if (err) throw err;
   var dbo = db.db("astrology");
  dbo.collection("astrologer_languages").find({},{useUnifiedTopology: true})
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

// astrologer language list 
router.get('/astrologer_language_list',  (req, res, next) => {
  
  MongoClient.connect(database.dbConnection, { useUnifiedTopology: true }, function (err, db) {
    if (err) throw err;
    var dbo = db.db("astrology");
    dbo.collection("astrologer_languages").aggregate([
      { "$addFields": { "userId": { "$toString": "$_id" } } },

      {
          
        $lookup: {
            from: "subcategories",
            localField: "_id.str",
            foreignField: "language_id",
            as: "astrologerlanguages"
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
                ele.astrologerlanguages.forEach(el=>{
                    if( ele.language_id==el._id){
                      //  ele.languageList.push(el.name)
                        ele.name=el.name
                    }
                
            });
        })
        result.forEach(ele=>{
            delete ele.astrologerlanguages 
          && 
         delete    ele.userId
         && delete ele.astrologer_id
          && delete ele.created_by
                  && delete ele.updated_at
          && delete ele.created_at
        })
       
        res.status(200).json({
            msg:'Success List',
            result: [...new Map(result.map(item => [item.language_id, item])).values()]    
        })
    }
            
             
        db.close();
    });
});
  
  });

router.post('/findastrologer_language',  (req, res, next) => {
     const  astrologer_id=req.body;
     console.log(req.body.astrologer_id)
  MongoClient.connect(database.dbConnection, function(err, db) {
      if (err) throw err;
      var dbo = db.db("astrology");
     dbo.collection("astrologer_languages").find({"astrologer_id":astrologer_id.astrologer_id },{useUnifiedTopology: true})
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



module.exports = router;