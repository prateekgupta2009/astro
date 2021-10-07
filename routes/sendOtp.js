let express = require('express');
let router = express.Router();
const sendOTP = require('../utils/sendOtp');
const userSmsOtpService = require('../services/userSmsOtp');
let UserSmsOtp = require('../models/userSmsOtp');




router.post('/createsmsotp', async (req, res, next) => {
    try {
        const mobileNo = req.body.mobileno;
        // const otp = req.body.otp;
        const sendOtp = await sendOTP.sendOTP(mobileNo);
        console.log(sendOtp)
        await userSmsOtpService.saveUserMessage({ mobileNo: mobileNo, otp:sendOtp.otp });
        res.send({ msg: 'userOtp added ...!' });
    } catch (err) {
        console.log(err);
        res.status(400).send({ err });
        // return next(err);
    }
});



router.post('/verifyotp', async (req, res, next) => {
    try {
        const mobileno = req.body.mobileno;
        UserSmsOtp.findOne( {mobileno}  )
        // .exec()
        .then(userdata=>{
            if(userdata<1){
                res.json({
                    msg:'Invalid OTP',
                    userdata:userdata                  
                })
            }
            else{
                res.json({
                    msg:'Valid OTP',
                    userdata:userdata
                })
            }
        })


    } catch (err) {
        console.log(err);
        res.status(400).send({ err });
        // return next(err);
    }




    // try {
    //     const mobileNo = req.body.mobileno; // name, email, mobile, pass, otp
    //     const usersOtp = await userSmsOtpService.checkUserOtp(mobileNo);
    //     if (usersOtp) {
    //         //   valid Otp
    //         res.json({ msg: 'Valid OTP' });
    //     } else {
    //         //   invalid Otp
    //         res.json({ msg: 'Invalid OTP' });
    //     }
    // } catch (err) {
    //     console.log(err);
    //     res.status(400).send({ err });
    //     // return next(err);
    // }
});

router.get('/userotp', async (req, res, next) => {
    try {
      const userotplist = await userSmsOtpService.getUserOtpList();
      res.json(userotplist);
    } catch (err) {
      console.log(err);
      return next(err);
    }
  });

module.exports = router;