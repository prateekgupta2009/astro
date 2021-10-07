const express = require('express');
const router = express.Router();
const walletHistoryUserService = require('../services/walletHistory');
const WalletUser = require('../models/walletHistory');
const AskQuestion = require('../models/askQuestion');
const UserWalletService = require('../services/user_walletBalence');
const UserWalletBal = require('../models/user_walletBalence');


// wallet user add or create 
router.post('/craeteoraddUserWallet',async(req,res,next)=>{
    try{
        const user_id = req.body.user_id;
        WalletUser.findOne({ user_id } )
        .exec()
        .then(userdata=>{
            if(userdata<1){
                try {
                    const callPack=req.body.callPack;
                    const discount=req.body.discount;
                    const Bonus=req.body.Bonus;
                    const amount_credited=req.body.amount_credited;
                    const  user_id=req.body.user_id;
                    const  amount=req.body.amount;
                    const  amount_refunded=req.body.amount_refunded;
                    const  bank=req.body.bank;
                    const  captured=req.body.captured;
                    const  card_id=req.body.card_id;
                    const  contact=req.body.contact;
                    const  created_at=req.body.created_at;
                    const  currency=req.body.currency;
                    const  description=req.body.description;
                    const  email=req.body.email;
                    const  entity=req.body.entity;
                    const  error_code=req.body.error_code;
                    const  error_description=req.body.error_description;
                    const  error_reason=req.body.error_reason;
                    const  error_source=req.body.error_source;
                    const  error_step=req.body.error_step;
                    const  fee=req.body.fee;
                    const  payment_id=req.body.payment_id;
                    const  international=req.body.international;
                    const  invoice_id=req.body.invoice_id;
                    const  method=req.body.method;
                   // const  notes=req.body.notes;
                    const  order_id=req.body.order_id;
                    const  refund_status=req.body.refund_status;
                    const  status=req.body.status;
                    const  tax=req.body.tax;
                    const  vpa=req.body.vpa;
                    const  wallet=req.body.wallet;
            
                     walletHistoryUserService.postWalletHistory_user({ 
                        user_id,amount,amount_refunded,bank,captured,card_id,contact,created_at,currency,description,
                        email,entity,error_code,error_description,error_reason,error_source,error_step,fee,payment_id,
                        international,invoice_id,method,order_id,refund_status,status,tax,vpa,wallet,
                        amount_credited, callPack,discount,Bonus     });
                   // res.send({ msg: 'Wallet History Detail create ...!' });
                    try {
                    
                
                        const user_id=req.body.user_id;
                        const walletBalence=parseInt(req.body.amount_credited);
                       
                
                         UserWalletService.saveUserWallet({ 
                            user_id, walletBalence  });
                        res.status(200).send({ msg: 'User Wallet  Detail create ...!' });
                    } catch (err) {
                        console.log(err);
                        res.status.send({ err });
                        // return next(err);
                    }
                } catch (err) {
                    console.log(err);
                    res.status(400).send({ err });
                    // return next(err);
                }
                res.json({
                    msg:'wallet user not find'                  
                })
            }
            else{
                try{
                    const callPack=req.body.callPack;
                    const discount=req.body.discount;
                    const Bonus=req.body.Bonus;
                    const amount_credited=req.body.amount_credited;
                
                      const  user_id=req.body.user_id;
                      const  amount=req.body.amount;
                      const  amount_refunded=req.body.amount_refunded;
                      const  bank=req.body.bank;
                      const  captured=req.body.captured;
                      const  card_id=req.body.card_id;
                      const  contact=req.body.contact;
                      const  created_at=req.body.created_at;
                      const  currency=req.body.currency;
                      const  description=req.body.description;
                      const  email=req.body.email;
                      const  entity=req.body.entity;
                      const  error_code=req.body.error_code;
                      const  error_description=req.body.error_description;
                      const  error_reason=req.body.error_reason;
                      const  error_source=req.body.error_source;
                      const  error_step=req.body.error_step;
                      const  fee=req.body.fee;
                      const  payment_id=req.body.payment_id;
                      const  international=req.body.international;
                      const  invoice_id=req.body.invoice_id;
                      const  method=req.body.method;
                     // const  notes=req.body.notes;
                      const  order_id=req.body.order_id;
                      const  refund_status=req.body.refund_status;
                      const  status=req.body.status;
                      const  tax=req.body.tax;
                      const  vpa=req.body.vpa;
                      const  wallet=req.body.wallet;
                
                         walletHistoryUserService.add_wallethistory_detail({
                            user_id,amount,amount_refunded,bank,captured,card_id,contact,created_at,currency,description,
                            email,entity,error_code,error_description,error_reason,error_source,error_step,fee,payment_id,
                            international,invoice_id,method,order_id,refund_status,status,tax,vpa,wallet,
                            amount_credited, callPack,discount,Bonus     
                
                        });
                       try{
                        UserWalletBal.findOneAndUpdate({ user_id: req.body.user_id },{ $inc: {walletBalence:parseInt(req.body.amount_credited) } },{ new: true }, function(err, doc) {
                            if(err){
                                console.log(err)
                                res.send({
                                
                                    msg:'Not Update Bal'
                                })
                            }
                            else{
                                res.send({
                                    msg:'Wallet Bal Updated',
                                    // result:doc
                                })
                            }
                        });
                       }
                       catch(err){
                           res.send({
                               msg:`Error ${err}`
                           })
                       }
                    //    res.json({ msg: ' walletHistory added ...!' });
                
                
                
                    }
                    catch (err) {
                        res.status(400).send( err +'value is not defined' );
                    }
                // res.json({
                //     msg:'wallet user matched',
                //     walletuser:userdata
                // })
            }
        })
    }


    
    catch(err){
        res.send({
            msg:`Error ${err}`
        })
    }
})
router.post('/findamount/:id',async(req,res,next)=>{
    try{
        WalletUser.findOne({ user_id:req.params.id } )
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
router.post('/checkWalletHistoryUser', async (req, res, next) => {
    try {
        const user_id = req.body.user_id;
        WalletUser.findOne({ user_id } )
        .exec()
        .then(userdata=>{
            if(userdata<1){
                res.json({
                    msg:'wallet user not find'                  
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


router.post('/checkaskQuestionuser', async (req, res, next) => {
    try {
        const id = req.body.id;
        AskQuestion.find({ id } )
        .exec()
        .then(userdata=>{
            if(userdata<1){
                res.json({
                    msg:'user account id not find'                  
                })
            }
            else{
                res.json({
                    msg:'user account matched',
                    userdata:userdata
                })
            }
        })


    } catch (err) {
        console.log(err);
        res.status(400).send({ err });
        // return next(err);
    }
});

router.post('/createwalletuser',async (req, res, next) =>{
    try {
        // const user_id=req.body.user_id;
        // const amount = req.body.amount;
        // const callPack= req.body.callPack;
        // const Discount = req.body.Discount;
        // const Bonus = req.body.Bonus;
        // const AmountPaid = req.body.AmountPaid;
        // const AmountCredited = req.body.AmountCredited;

        const callPack=req.body.callPack;
        const discount=req.body.discount;
        const Bonus=req.body.Bonus;
        const amount_credited=req.body.amount_credited;


        const  user_id=req.body.user_id;
        const  amount=req.body.amount;
        const  amount_refunded=req.body.amount_refunded;
        const  bank=req.body.bank;
        const  captured=req.body.captured;
        const  card_id=req.body.card_id;
        const  contact=req.body.contact;
        const  created_at=req.body.created_at;
        const  currency=req.body.currency;
        const  description=req.body.description;
        const  email=req.body.email;
        const  entity=req.body.entity;
        const  error_code=req.body.error_code;
        const  error_description=req.body.error_description;
        const  error_reason=req.body.error_reason;
        const  error_source=req.body.error_source;
        const  error_step=req.body.error_step;
        const  fee=req.body.fee;
        const  payment_id=req.body.payment_id;
        const  international=req.body.international;
        const  invoice_id=req.body.invoice_id;
        const  method=req.body.method;
       // const  notes=req.body.notes;
        const  order_id=req.body.order_id;
        const  refund_status=req.body.refund_status;
        const  status=req.body.status;
        const  tax=req.body.tax;
        const  vpa=req.body.vpa;
        const  wallet=req.body.wallet;

        await walletHistoryUserService.postWalletHistory_user({ 
            user_id,amount,amount_refunded,bank,captured,card_id,contact,created_at,currency,description,
            email,entity,error_code,error_description,error_reason,error_source,error_step,fee,payment_id,
            international,invoice_id,method,order_id,refund_status,status,tax,vpa,wallet,
            amount_credited, callPack,discount,Bonus     });
        res.send({ msg: 'Wallet History Detail create ...!' });
    } catch (err) {
        console.log(err);
        res.status(400).send({ err });
        // return next(err);
    }
});

router.post('/addwalletuserdetail',async (req,res,next)=>{
    try{
    const callPack=req.body.callPack;
    const discount=req.body.discount;
    const Bonus=req.body.Bonus;
    const amount_credited=req.body.amount_credited;

      const  user_id=req.body.user_id;
      const  amount=req.body.amount;
      const  amount_refunded=req.body.amount_refunded;
      const  bank=req.body.bank;
      const  captured=req.body.captured;
      const  card_id=req.body.card_id;
      const  contact=req.body.contact;
      const  created_at=req.body.created_at;
      const  currency=req.body.currency;
      const  description=req.body.description;
      const  email=req.body.email;
      const  entity=req.body.entity;
      const  error_code=req.body.error_code;
      const  error_description=req.body.error_description;
      const  error_reason=req.body.error_reason;
      const  error_source=req.body.error_source;
      const  error_step=req.body.error_step;
      const  fee=req.body.fee;
      const  payment_id=req.body.payment_id;
      const  international=req.body.international;
      const  invoice_id=req.body.invoice_id;
      const  method=req.body.method;
     // const  notes=req.body.notes;
      const  order_id=req.body.order_id;
      const  refund_status=req.body.refund_status;
      const  status=req.body.status;
      const  tax=req.body.tax;
      const  vpa=req.body.vpa;
      const  wallet=req.body.wallet;

        await walletHistoryUserService.add_wallethistory_detail({
            user_id,amount,amount_refunded,bank,captured,card_id,contact,created_at,currency,description,
            email,entity,error_code,error_description,error_reason,error_source,error_step,fee,payment_id,
            international,invoice_id,method,order_id,refund_status,status,tax,vpa,wallet,
            amount_credited, callPack,discount,Bonus     

        });
        res.json({ msg: ' walletHistory added ...!' });



    }
    catch (err) {
        res.status(400).send( err +'value is not defined' );
    }
})







module.exports = router;