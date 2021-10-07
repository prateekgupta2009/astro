const express = require('express');
const router = express.Router();
const astrologerReportService = require('../services/astrologerReport');
const Astrologer_Report = require('../models/astrologerReport');

router.get('/getastrologerReportList', async (req, res, next) => {
    try {
      const list = await astrologerReportService.getastrologersreportlist();
      res.status(200).json(list);
    } catch (err) {
      console.log(err);
      return next(err);
    }
  });
router.post('/findastrologerReport', async (req, res, next) => {
    try {
        const astrologer_id =req.body.astrologer_id;
        Astrologer_Report.findOne({ astrologer_id } )
        .exec()
        .then(userdata=>{
            if(userdata<1){
                res.json({
                    msg:'Astrologer user not find'                  
                })
            }
            else{
                res.json({
                    msg:'Astrologer user matched',
                    walletuser:userdata
                })
            }
        })
    } catch (err) {
        console.log(err);
        res.status(400).send({ err });
        // return next(err);
    }
});
router.post('/createAstrologerreport',async (req, res, next) =>{
    var pic=req.files.image;
    console.log(pic)
    pic.mv('./public/astrologerReport'+pic.name,async function (err){
        if(err){
            res.json('File Not Uploaded')
        }
        else{
            try{
                const data={
                    astrologer_id:req.body.astrologer_id,
                    subject:req.body.subject,
                    priority:req.body.priority,
                    reporttext:req.body.reporttext,
                    file:pic.name
                }
                await astrologerReportService.saveAstrologerReport(data);
                res.send({ msg: 'astrologer create ...!' });

            }
            catch(err){
                console.log(err);
                res.status(400).send({ err });
            }
        }
    })
});
  router.put('/updateAstrologerReport',(req,res,next)=>{
   const astrologer_id=req.body.astrologer_id;
  const  ChatStatus=req.body.ChatStatus;


  Astrologer_Report.updateOne({astrologer_id:astrologer_id},{ChatStatus:ChatStatus},(err,result)=>{
        if(err){
            res.status(400).send({
                msg:err
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

   router.post('/removeastrologerstatusListbyid',(req,res,next)=>{
    const astrologer_id=req.body.astrologer_id;
    Astrologer_Report.remove({ astrologer_id: astrologer_id }, function(err) {
        if (err) {
            res.status(400).send({
                msg:err
            })        }
        else {
            res.status(200).send({
                msg:'remove astrologer id status',
            })    
            }
    });

   });

   
module.exports = router;