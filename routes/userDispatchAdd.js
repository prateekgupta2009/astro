const express = require('express');
const router = express.Router();
const userDispatchAddService = require('../services/userDispatchAdd');
const UserDispatchAdd = require('../models/userdispathAdd');
var ObjectId = require('mongodb').ObjectId;

router.get('/getuserDispatchAdd', async (req, res, next) => {
    try {
      const list = await userDispatchAddService.getuserDispatchAdd();
      res.status(200).json(list);
    } catch (err) {
      console.log(err);
      return next(err);
    }
  });
router.post('/findUserDispatchAddbyid', async (req, res, next) => {
    try {
        const user_id =req.body.user_id;
        UserDispatchAdd.find({ user_id:user_id } )
        .exec()
        .then(userdata=>{
            if(userdata<1){
                res.json({
                    msg:'UserDispatch Add not find'                  
                })
            }
            else{
                res.status(200).json({
                    msg:'userDispatch Add matched',
                    useradd:userdata
                })
            }
        })
    } catch (err) {
        console.log(err);
        res.status(400).send({ err });
        // return next(err);
    }
});
// find user address by user_id and address_id
router.post('/findUserDispatchAddbyidanduser_id', async (req, res, next) => {
    try {
        const user_id =req.body.user_id;
        const _id=req.body.add_id
        UserDispatchAdd.find({ user_id:user_id,_id:ObjectId(_id) } )
        .exec()
        .then(userdata=>{
            if(userdata<1){
                res.json({
                    msg:'User Add not find'                  
                })
            }
            else{
                res.status(200).json({
                    msg:'userDispatch Add matched',
                    useradd:userdata
                })
            }
        })
    } catch (err) {
        console.log(err);
        res.status(400).send({ err });
        // return next(err);
    }
});
router.post('/createUserDispatchAddbyid',async (req, res, next) =>{
    try {
        const data={
            user_id:req.body.user_id,
            name:req.body.name,
            country:req.body.country,
            streetAddress:req.body.streetAddress,
            city:req.body.city,
            landmark:req.body.landmark,
            pincode:req.body.pincode,
            phone:req.body.phone
        }
        await userDispatchAddService.saveuserDispatchAdd(data);
        res.send({ msg: 'userDispatch Create ...!' });
    } catch (err) {
        console.log(err);
        res.status(400).send({ err });
        // return next(err);
    }
});

  router.put('/updateDispatchAdd',(req,res,next)=>{
      console.log(req.body.add_id)
  const add_id=req.body.add_id;
  const user_id=req.body.user_id;
  const  name=req.body.name;
  const country=req.body.country;
  const  city=req.body.city;
  const landmark=req.body.landmark;
  const  phone=req.body.phone;
  const streetAddress=req.body.streetAddress;
  const  pincode=req.body.pincode;
  UserDispatchAdd.updateOne({_id:ObjectId(add_id)},{name:name,country:country,
        city:city,landmark:landmark,phone:phone,streetAddress:streetAddress,pincode:pincode},(err,result)=>{
        if(err){
            res.status(400).send({
                msg:err
            })
        }
        else{
            res.status(200).send({
                msg:'update your  address',
                result:result
            })
        }
    })
  });

// find address by address id
  router.post('/findUserDispatchAddbyADDID', async (req, res, next) => {
    try {
        const add_id =req.body.add_id;
        UserDispatchAdd.find({ _id:ObjectId(add_id) } )
        .exec()
        .then(userdata=>{
            if(userdata<1){
                res.json({
                    msg:'one UserDispatch Add not find'                  
                })
            }
            else{
                res.status(200).json({
                    msg:'one userDispatch Add matched',
                    user_one_add:userdata
                })
            }
        })
    } catch (err) {
        console.log(err);
        res.status(400).send({ err });
        // return next(err);
    }
});


   
module.exports = router;