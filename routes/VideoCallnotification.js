const express = require('express');
const router = express.Router();
const VideoCallNotificationService = require('../services/VideoCallnotification');
const VideoCallNotification = require('../models/VideoCallnotification');

router.post('/findnotificationbyuser_id', async (req, res, next) => {
    try {
        const user_id =req.body.user_id;
        VideoCallNotification.findOne({ user_id } )
        .exec()
        .then(userdata=>{
            if(userdata<1){
                res.json({
                    msg:'Notification not find'                  
                })
            }
            else{
                res.json({
                    msg:'Notification Find',
                    astrodata:userdata
                })
            }
        })
    } catch (err) {
        console.log(err);
        res.status(400).send({ err });
        // return next(err);
    }
});
router.post('/findnotificationbyastrologer_id', async (req, res, next) => {
    try {
        const astrologer_id =req.body.astrologer_id;
        VideoCallNotification.findOne({ astrologer_id } )
        .exec()
        .then(userdata=>{
            if(userdata<1){
                res.json({
                    msg:'Notification not find'                  
                })
            }
            else{
                res.json({
                    msg:'Notification not find',              
                    astrodata:userdata
                })
            }
        })
    } catch (err) {
        console.log(err);
        res.status(400).send({ err });
        // return next(err);
    }
});
router.post('/create_video_call_Notification',async (req, res, next) =>{
    try {
        const data={
            astrologer_id:req.body.astrologer_id,
            user_id:req.body.user_id,
            user_ref:req.body.user_ref,
            room_id:req.body.room_id,
            astroresponcemsg:req.body.astroresponcemsg,
            userresponcemsg:req.body.userresponcemsg,
        }
        await VideoCallNotificationService.saveNotificationStatus(data);
        res.send({ msg: 'astrologer create ...!' });
    } catch (err) {
        console.log(err);
        res.status(400).send({ err });
        // return next(err);
    }
});
// update User  video call notification

  router.put('/updatenotificationmsgbyuser_id',(req,res,next)=>{
   const user_id=req.body.user_id;
  const  userresponcemsg=req.body.userresponcemsg;


  VideoCallNotification.updateOne({user_id:user_id},{userresponcemsg:userresponcemsg},(err,result)=>{
        if(err){
            res.status(400).send({
                msg:err
            })
        }
        else{
            res.status(200).send({
                msg:'update User Notification msg',
                result:result
            })
        }
    })
  });
// update astro  video call notification
  router.put('/updatenotificationmsgbyastrologer_id',(req,res,next)=>{
    const astrologer_id=req.body.astrologer_id;
   const  astroresponcemsg=req.body.astroresponcemsg;
 
 
   VideoCallNotification.updateOne({astrologer_id:astrologer_id},{astroresponcemsg:astroresponcemsg},(err,result)=>{
         if(err){
             res.status(400).send({
                 msg:err
             })
         }
         else{
             res.status(200).send({
                 msg:'update Astrologer Notification msg',
                 result:result
             })
         }
     })
   });

 
  // by astrologer id
   router.post('/removeastrologerstatusListbyastrologer_id',(req,res,next)=>{
    const astrologer_id=req.body.astrologer_id;
    VideoCallNotification.remove({ astrologer_id: astrologer_id }, function(err) {
        if (err) {
            res.status(400).send({
                msg:err
            })        }
        else {
            res.status(200).send({
                msg:'remove astrologer Notification',
            })    
            }
    });

   });

     // by User id
     router.post('/removeastrologerstatusListbyuser_id',(req,res,next)=>{
        const user_id=req.body.user_id;
        VideoCallNotification.remove({ user_id: user_id }, function(err) {
            if (err) {
                res.status(400).send({
                    msg:err
                })        }
            else {
                res.status(200).send({
                    msg:'remove User Notification',
                })    
                }
        });
    
       });


   
module.exports = router;