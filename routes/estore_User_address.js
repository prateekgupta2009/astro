const express = require('express');
const router = express.Router();
const EstoreUserUserService = require('../services/estore_User_address');
const estore_User = require('../models/estoreUseraddress');



router.post('/findestoreuser/:id',async(req,res,next)=>{
    try{
        estore_User.find({ user_id:req.params.id } )
        .exec()
        .then(user=>{
            if(user.length<1){
               // console.log(user)
                res.json({
                    msg:'Estore_User Not Found'
                })
            }
            else{
                res.json({
                    msg:'Estore_User Found',
                    user:user
                })
            }
        })

    }catch(err){
        console.log(err);
        res.status(400).send({ err });
    }
});


router.post('/createestore_user',async (req, res, next) =>{
    try {

        console.log(req.body)
        const user_id=req.body.user_id;
        const name=req.body.name;
        const streetAddress=req.body.streetAddress;
        const city=req.body.city;
        const country= req.body.country;
        const  landmark=req.body.landmark;
        const  pincode=req.body.pincode;
        const  phone=req.body.phone;
        const  totalproductPrice=req.body.totalproductPrice;

        await EstoreUserUserService.postEstore_user({ 
            user_id,name,streetAddress,city,landmark,pincode,phone,totalproductPrice,country
                });
        res.send({ msg: 'askQuestion Detail create ...!' });
    } catch (err) {
        console.log(err);
        res.status(400).send({ err });
        // return next(err);
    }
});

router.post('/addestoreUserAddress',async (req,res,next)=>{
    try{

        const user_id=req.body.user_id;
        const name=req.body.name;
        const streetAddress=req.body.streetAddress;
        const city=req.body.city;
        const  landmark=req.body.landmark;
        const  pincode=req.body.pincode;
        const  phone=req.body.phone;
        const  totalproductPrice=req.body.totalproductPrice;

        await EstoreUserUserService.add_estore_user({
            user_id,name,streetAddress,city,landmark,pincode,phone,totalproductPrice
        });
        res.json({ msg: ' Estore_user added ...!' });
    }
    catch (err) {
        res.status(400).send( err +'value is not defined' );
    }
});

router.patch('/update_estore_address',async (req,res,next)=>{
    console.log(req.body);
    const user_id=req.body.user_id;
    const name=req.body.name;
    const streetAddress=req.body.streetAddress;
    const city=req.body.city;
    const  landmark=req.body.landmark;
    const  pincode=req.body.pincode;
    const  phone=req.body.phone;
    const  totalproductPrice=req.body.totalproductPrice;
    
    estore_User.findOneAndUpdate({user_id:user_id}, {name,streetAddress,city,landmark,pincode,phone,totalproductPrice
     }, function(err, result) {
      if (err) {
        res.send(err);
      } else {
          res.status(200).json({
              msg:'update estore address'
          })
      }
    }); 
  });




module.exports = router;