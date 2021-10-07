const express = require('express');
const router = express.Router();
const UserWalletService = require('../services/user_walletBalence');
const UserWalletBal = require('../models/user_walletBalence');



router.post('/checkUserWalletbalence/:id',async(req,res,next)=>{
    try{
        UserWalletBal.findOne({ user_id:req.params.id } )
        .exec()
        .then(user=>{
            if(user<1){
                res.json({
                    msg:'User Not Found'
                })
            }
            else{
                res.json({
                    msg:'User Found',
                    user:user
                })
            }
        })

    }catch{}
})
router.post('/walletUserfind', async (req, res, next) => {
    try {
        const user_id = req.body.user_id;
        UserWalletBal.findOne({ user_id } )
        .exec()
        .then(userdata=>{
            if(userdata<1){
                res.json({
                    msg:'wallet user not find '+err                  
                })
            }
            else{
                res.json({
                    msg:'wallet user matched',
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



router.post('/createwalletuserbal',async (req, res, next) =>{
    try {
        // const user_id=req.body.user_id;
        // const amount = req.body.amount;
        // const callPack= req.body.callPack;
        // const Discount = req.body.Discount;
        // const Bonus = req.body.Bonus;
        // const AmountPaid = req.body.AmountPaid;
        // const AmountCredited = req.body.AmountCredited;

        const user_id=req.body.user_id;
        const walletBalence=req.body.walletBalence;
       

        await UserWalletService.saveUserWallet({ 
            user_id, walletBalence  });
        res.status(200).send({ msg: 'User Wallet  Detail create ...!' });
    } catch (err) {
        console.log(err);
        res.status(400).send({ err });
        // return next(err);
    }
});

router.post('/addbalencewalletuser',async (req,res,next)=>{

    UserWalletBal.findOneAndUpdate({ user_id: req.body.user_id }, { $set: { walletBalence: req.body.walletBalence } }, { new: true }, function(err, doc) {
        if(err){
            res.status(400).send({
                msg:'Not Update Bal'
            })
        }
        else{
            res.status(200).send({
                msg:'Wallet Bal Updated',
                result:doc
            })
        }
    });
    
    
})
router.post('/finduserandupdateBalence',async (req,res,next)=>{

    UserWalletBal.findOneAndUpdate({ user_id: req.body.user_id }, { $inc: { walletBalence:-parseInt(req.body.walletBalence) } }, { new: true }, function(err, doc) {
        if(err){
            res.status(400).send({
                msg:'Not Update Bal'
            })
        }
        else{
            res.status(200).send({
                msg:'Wallet Bal Updated',
                result:doc
            })
        }
    });
    
    
})







module.exports = router;