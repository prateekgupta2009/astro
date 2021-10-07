const express = require('express');
const router = express.Router();
var jwt = require('jsonwebtoken');
const database = require('../config/database')
const mongodb = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
var bcrypt = require('bcryptjs');

router.post('/find_astrologer_phone', (req, res, next) => {
    console.log(req.body)
    const mobile=req.body.mobile
    const password=req.body.signupPassword
    MongoClient.connect(database.dbConnection, function (err, db) {
        if (err) throw err;
        var dbo = db.db("astrology");
        dbo.collection("astrologers").findOne({mobile:mobile},{useUnifiedTopology: true},function(err,result){
            if(err){
                res.status(201).json({
                    msg:'Astrologer id not found'
                })
            }
         
           else{
               if(result===null){
                   res.status(201).json({
                       msg:'astrologer Paassword incorrect'
                   })
               }
               else{
                var pass_hash =result.password;
                var pass_string =password
                bcrypt.compare(pass_string, pass_hash,(err,valid)=>{
                    if(valid){
                        res.status(200).json({
                            msg:'found astrologer',
                            result:result
                        })
                        console.log(pass_string)
                        console.log(pass_hash)
                       console.log("valid password match")
                   }
                    else{
                       res.json({
                           msg:'Password incorrect'  
                         }) 
                       console.log("wrong credentials")
                       console.log(pass_string)
                       console.log(pass_hash)
                       console.log(valid)
                   
                   }
                   });
               }

           }
        })
        
    });
});
router.post('/compareHashpassowrd',(req,res,next)=>{
    var pass_hash =req.body.pass_hash
var pass_string = req.body.password
bcrypt.compare(pass_string, pass_hash,(err,valid)=>{
 if(valid){
    res.status(200).json({
      msg:'valid password match'  
    }) 
    console.log("valid password match")
}
 else{
    res.json({
        msg:'wrong credentials'  
      }) 
    console.log("wrong credentials")

}
});

})


// router.post('/find_astrologer_phone', (req, res, next) => {
//     console.log(req.body)
//     const mobile=req.body.mobile
//     const password=req.body.signupPassword
//     MongoClient.connect(database.dbConnection, function (err, db) {
//         if (err) throw err;
//         var dbo = db.db("astrology");
//         dbo.collection("astrologers").findOne({mobile:mobile,password:password},{useUnifiedTopology: true},function(err,result){
//             if(err){
//                 res.status(201).json({
//                     msg:'Astrologer id not found'
//                 })
//             }
         
//            else{
//                if(result===null){
//                    res.status(201).json({
//                        msg:'astrologer Paassword incorrect'
//                    })
//                }
//                else{
//                 var pass_hash =result.password;
//                 var pass_string =password
//                 bcrypt.compare(pass_string, pass_hash,(err,valid)=>{
//                     if(valid){
//                         res.status(200).json({
//                             msg:'found astrologer',
//                             result:result
//                         })
//                        console.log("valid password match")
//                    }
//                     else{
//                        res.json({
//                            msg:'Password incorrect'  
//                          }) 
//                        console.log("wrong credentials")
                   
//                    }
//                    });
//                }

//            }
//         })
        
//     });
// });


module.exports = router;