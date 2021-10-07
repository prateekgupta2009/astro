const express = require('express');
const router = express.Router();
const astrologinHistoryService = require('../services/astrologinHistory');
const Astrologer_Login_History= require('../models/astrologinHistory');

// router.get('/getastrologerstatuslist', async (req, res, next) => {
//     try {
//       const list = await astrologerStatusService.getastrologerstatuslist();
//       res.status(200).json(list);
//     } catch (err) {
//       console.log(err);
//       return next(err);
//     }
//   });
router.post('/findastrologinHistory', async (req, res, next) => {
    try {
        const astrologer_id =req.body.astrologer_id;
        Astrologer_Login_History.find({ astrologer_id } )
        .exec()
        .then(userdata=>{
            if(userdata<1){
                res.json({
                    msg:'Astrologer Login History not find'                  
                })
            }
            else{
                res.json({
                    msg:'Astrologer Login History matched',
                    list:userdata
                })
            }
        })
    } catch (err) {
        console.log(err);
        res.status(400).send({ err });
        // return next(err);
    }
});
router.post('/createastrologinHistory',async (req, res, next) =>{
    console.log(req.body)
    try {
        const data={
            astrologer_id:req.body.astrologer_id,
            time:req.body.time,
            date:req.body.date,
        }
        await astrologinHistoryService.saveAstrOLoginHistory(data);
        res.send({ msg: 'astrologer Login Time create ...!' });
    } catch (err) {
        console.log(err);
        res.status(400).send({ err });
        // return next(err);
    }
});
//   router.put('/updatechatstatus',(req,res,next)=>{
//    const astrologer_id=req.body.astrologer_id;
//   const  ChatStatus=req.body.ChatStatus;


//     Astrologer_Status.updateOne({astrologer_id:astrologer_id},{ChatStatus:ChatStatus},(err,result)=>{
//         if(err){
//             res.status(400).send({
//                 msg:err
//             })
//         }
//         else{
//             res.status(200).send({
//                 msg:'update your chat status',
//                 result:result
//             })
//         }
//     })
//   });

//   router.put('/updatecalltatus',(req,res,next)=>{
//     const astrologer_id=req.body.astrologer_id;
//    const  CallStatus=req.body.callStatus;
 
 
//      Astrologer_Status.updateOne({astrologer_id:astrologer_id},{callStatus:CallStatus},(err,result)=>{
//          if(err){
//              res.status(400).send({
//                  msg:err
//              })
//          }
//          else{
//              res.status(200).send({
//                  msg:'update your Call status',
//                  result:result
//              })
//          }
//      })
//    });
//    router.put('/updatevideocalltatus',(req,res,next)=>{
//     const astrologer_id=req.body.astrologer_id;
//    const  VideocallStatus=req.body.videocallstatus;
 
//      Astrologer_Status.updateOne({astrologer_id:astrologer_id},{videocallstatus:VideocallStatus},(err,result)=>{
//          if(err){
//              res.status(400).send({
//                  msg:err
//              })
//          }
//          else{
//              res.status(200).send({
//                  msg:'update your VideCall status',
//                  result:result
//              })
//          }
//      })
//    });
//    router.post('/removeastrologerstatusListbyid',(req,res,next)=>{
//     const astrologer_id=req.body.astrologer_id;
//     Astrologer_Status.remove({ astrologer_id: astrologer_id }, function(err) {
//         if (err) {
//             res.status(400).send({
//                 msg:err
//             })        }
//         else {
//             res.status(200).send({
//                 msg:'remove astrologer id status',
//             })    
//             }
//     });

//    });

   
module.exports = router;