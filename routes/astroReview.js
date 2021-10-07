const express = require('express');
const router = express.Router();
const astrologReviewService = require('../services/astroReview');
const astrologer_review= require('../models/astroReview');
var ObjectId = require('mongodb').ObjectId;


router.get('/getastrologerReview', async (req, res, next) => {
    try {
      const list = await astrologReviewService.getastroReview();
      res.status(200).json(list);
    } catch (err) {
      console.log(err);
      return next(err);
    }
  });


  router.post('/findAstrologerReview/:id', async (req, res, next) => {
    try {
      astrologer_review.find({ astrologer_id: req.params.id })
            .exec()
            .then(user => {
                if (user.length < 1) {
                    // console.log(user)
                    res.json({
                        msg: 'Astrologer Review  Empty'
                    })
                }
                else {
                    res.json({
                        msg: 'Astrologer Review Found..',
                        ReviewList: user
                    })
                }
            })

    } catch (err) {
        console.log(err);
        res.status(400).send({ err });
    }
});

router.post('/createastroreviewbyuser',async (req, res, next) =>{
  console.log(req.body)
    try {
        const data={
            user_id:req.body.user_id,
            astrologer_id:req.body.astrologer_id,
            starNumber:req.body.starNumber,
            date:req.body.date,
            time:req.body.time,
            status:req.body.status,
            user_first_name:req.body.user_first_name,
            user_last_name:req.body.user_last_name,
            review:req.body.review,
            astroReplay:null,
            astrologer_name:req.body.astrologer_name
        }
        await astrologReviewService.saveAstrReview(data);
        res.send({ msg: 'astrologer Review  create ...!' });
    } catch (err) {
        console.log(err);
        res.status(400).send({ err });
        // return next(err);
    }
});
  router.put('/ReplayReviewByAstrologer',(req,res,next)=>{
    console.log(req.body)
   const review_id=req.body.review_id;
   const astroReplay=req.body.astroReplay

  astrologer_review.updateOne({_id:ObjectId(review_id)},{astroReplay:astroReplay},(err,result)=>{
        if(err){
            res.status(400).send({
                msg:'POST NOT UPDATE'
            })
        }
        else{
            res.status(200).send({
                msg:'update your chat status',
                result:result
            })
        }
    })
  });

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