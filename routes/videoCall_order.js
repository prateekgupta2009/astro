const express = require('express');
const router = express.Router();
const estore_addonsService = require('../services/estore_addons');
const VideoCall_order = require('../models/videoCall_order');
const database = require('../config/database')
var randomize = require('randomatic');
var ObjectId = require('mongodb').ObjectId;
var MongoClient = require('mongodb').MongoClient;
router.post('/create_videocall_order', async (req, res, next) => {

    try {
        const data = {
            user_id: req.body.user_id,
            astrologer_id: req.body.astrologer_id,
            video_orderid: randomize('0000'),
            date:req.body.date
        }
        if (data.user_id === '' || data.astrologer_id === '' || data.video_orderid === '' || data.date ==='') {
            res.send({
                msg: 'Responnse Data Empty'
            })
        }
        else {
            MongoClient.connect(database.dbConnection, function (err, db) {
                if (err) throw err;
                var dbo = db.db("astrology");
                dbo.collection("astrologers").find({ "_id":ObjectId(data.astrologer_id) }, { useUnifiedTopology: true })
                    .toArray(function (err, result) {
                        if (err) {
                            res.json({
                                msg:'Something Error',
                                result: err
                            })
                            console.log(err)
                        }
                        else {

                            console.log(result);
                            const astrologer_name=result[0].name;
                            const videoorderdata={
                                user_id: req.body.user_id,
                                astrologer_id: req.body.astrologer_id,
                                video_orderid: randomize('0000'),
                                date:req.body.date,
                                astrologer_name:astrologer_name,
                                videocallrate:req.body.videocallrate,
                                room_id:req.body.room_id

                            }
                            VideoCall_order.create(
                                videoorderdata
                            ).then(result => {
                                //   console.log(result)
                                res.send({
                                    msg: 'Create Video Call order',
                                    result: result
                                })
                            })
                                .catch(err => {
                                    console.log(err)
                                    res.send({
                                        msg: 'Invalid Response',
                                        err: err,
                                        reult: data
                                    })
                                })

                        }
                        db.close();

                        
                    });
            });
            
        }         
    }
    catch (err) {
        console.log(err);
        res.send({
            msg: 'Invalid Response'
        })
    }

})


router.post('/videoCall_orderUpdate',async (req,res,next)=>{

    try{
        VideoCall_order.findOneAndUpdate({ user_id: req.body.user_id,video_orderid:req.body.video_orderid }, { $inc: { videocallprice:parseInt(req.body.videocallprice),videocalltiming:parseInt(req.body.videocalltiming)},
    // $inc: { chattiming:parseInt(req.body.chattiming)}
 }, { new: true }, function(err, doc) {
         if(err){
             res.send({
                 msg:'Not Update Bal',
                 err:err
             })
         }
         else{
             res.status(200).send({
                 msg:'chat order  Updated',
                 result:doc
             })
         }
     });
    }
    catch(err){
        res.send({
            msg:'Invvalid Response',
            err:err
        })
 
    }
     
     
 })
 // find video history order by userid

router.post('/findvideocallorderbyuserid',async(req,res,next)=>{
    try{
        const user_id=req.body.user_id
        VideoCall_order.find({user_id:user_id}) 
        .exec()
        .then(userdata=>{
            if(userdata<1){
                res.json({
                    msg:'Order is Empty'                  
                })
            }
            else{
                res.status(200).json({
                    msg:'Video Call Order Find',
                    videocallorder:userdata
                })
            }
        })    }
    catch(err){
        res.send({
            msg:'Invalid Response',
            err:err
        })
    }
})

 // find chat order by astrologerid
 
 
 router.post('/findideoCallorderbyastrologerid',async(req,res,next)=>{
     try{
         const astrologer_id=req.body.astrologer_id
         VideoCall_order.find({astrologer_id:astrologer_id}) 
         .exec()
         .then(userdata=>{
             if(userdata<1){
                 res.json({
                     msg:'Order is Empty'                  
                 })
             }
             else{
                 res.status(200).json({
                     msg:'Video call Order Find',
                     videocallorder:userdata
                 })
             }
         })    }
     catch(err){
         res.send({
             msg:'Invalid Response',
             err:err
         })
     }
 })
 
 
 module.exports = router;