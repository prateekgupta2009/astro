const express = require('express');
const router = express.Router();
const addCartService = require('../services/addCartService');
const AddCart = require('../models/addCart');
var ObjectId = require('mongodb').ObjectId;




// router.post('/createaddcardproduct', async (req, res, next) => {
//   try {
//     const product_id = req.body.product_id;
//     const name = req.body.name;
//     const regular_price_inr = req.body.regular_price_inr;
//     const sell_price_inr = req.body.sell_price_inr;
//     const regular_price_usd = req.body.sell_price_usd;
//     const sell_price_usd = req.body.sell_price_usd;
//     const quantity = req.body.quantity;
//     const sellername = req.body.sellername;
//     const date = req.body.date;
//     const image = req.body.image;
//     await addCartService.saveAddCartProduct({
//         product_id,name, regular_price_inr, sell_price_inr,regular_price_usd,sell_price_usd, quantity,
//         sellername,date,image    }).then(AddCart=>{
//       res.json({ msg: 'ADDCART PRODUCT SUCCESS !',addcart:{product_id,name, regular_price_inr, sell_price_inr,regular_price_usd,sell_price_usd, quantity,
//         sellername,date,image }
//           });
//     })
  
//     // res.json({ msg: 'SignUpUser added ...!',user:{first_name,last_name, signupEmail, mobileNo, signupPassword} });
//   } catch (err) {
//     console.log(err);
//     res.status(400).send({ err });
//     // return next(err);
//   }
// });

// router.post('/findcartproduct', async (req, res, next) => {
//   var product_id=req.body.product_id;
//   console.log(req.body)
//   AddCart.find({product_id:product_id})
//   .exec()
//   .then(cartList=>{
//       if(cartList.length <1){
//           res.json({
//               msg: 'CartProduct  is not valid',
//           })
//       }
//       else{

//           res.status(200).json({
              
//               msg: 'CartProduct  is  valid',
//               cartList:cartList,
//           })
//       }
      
//   })
//   .catch(err=>{
//       res.json({
//           error:err
//       })
//   })
  
// });


// /// delete cart product

// router.post('/deletecartproduct', async (req, res, next) => {

//   var product_id=req.body.id;
//   console.log(req.body)
//   AddCart.findOneAndRemove({product_id:product_id},function(err,product){
//     if(err){
//       return console.log(err)
//     }
//     else{
//       res.send('product deleted...')
//     }
//   })  
// });

// router.post('/updatecartproductquantity',async(req,res,next)=>{
//   console.log(req.body.quantity)
//   try{
//       const name=req.body.name;
//       const _id=req.body._id;
//       const user_id=req.body.user_id;
//       const product_id= req.body.product_id;
//       const  quantity=req.body.quantity;
//       AddCart.findByIdAndUpdate(_id,{quantity:quantity},{new:true},function(err,doc){
//         if(err){
//             res.status(400).send({msg:err})
//         }

//         else{ res.status(200).send({
//           msg:'successfully updated quantity..!',
//           data:doc
//         })
//       }
//       })

//   }catch(err){
//     res.status(400).send({
//       msg:'err'
//     })

//   }
// });

// router.put('/updatecartquantity',async(req,res,next)=>{
//   const user_id=req.body.user_id;
//   const product_id= req.body.product_id;
//   const  quantity=req.body.quantity;
//   AddCart.updateOne({product_id:product_id},{quantity:quantity},function(err,result){
//     if(err){
//       res.status(400).send({
//         msg:'error'
//       })
//     }
//     else{
//       res.status(200).send({
//         msg:'UPDATED CARTPRODUCT QUANTITY..!',
//         result:result

//       })
//     }
//   })
// });


// update cart data if product_id matched
// router.patch('/updateaddcart/:product_id',async (req,res,next)=>{
//   try{
//     const product_id = req.body.product_id;
//     AddCart.find({product_id:req.params.product_id},(err,cartdata)=>{
//       if (err) {
//         res.send(err);
//       }

//     if (!cartdata) {
//         res.send({
//             message: 'Product Cart not found'
//         });
//     }
//    // cartdata.product_id = req.body.product_id;
//     cartdata.name = req.body.name;
//     cartdata.regular_price_inr = req.body.regular_price_inr;
//     cartdata.sell_price_inr = req.body.sell_price_inr;
//     cartdata.regular_price_usd = req.body.sell_price_usd;
//     cartdata.sell_price_usd = req.body.sell_price_usd;
//     cartdata.quantity = req.body.quantity;
//    // cartdata.sellername = req.body.sellername;
//     cartdata.image = req.body.image;
//     cartdata.save(err => {
//       if (err) {
//           res.send(err);
//       }
//       res.json({
//           message: 'Cart Update Successfull'
//       });

//   });

//     })

//   }catch(err){
//     console.log(err);
//     res.status(400).send({ err });
//   }
// });

// router.put('/updateaddcart').put((req, res) => {
//   const product_id = req.body.product_id;

//   AddCart.find({
//     product_id:product_id
//   }, (err, cartdata) => {
//       if (err) {
//           res.send(err);
//       }

//       if (!cartdata) {
//           res.send({
//               message: 'Product Cart not found'
//           });
//       }
//       cartdata.product_id = req.body.product_id;
//       cartdata.name = req.body.name;
//       cartdata.regular_price_inr = req.body.regular_price_inr;
//       cartdata.sell_price_inr = req.body.sell_price_inr;
//       cartdata.regular_price_usd = req.body.sell_price_usd;
//       cartdata.sell_price_usd = req.body.sell_price_usd;
//       cartdata.quantity = req.body.quantity;
//      // cartdata.sellername = req.body.sellername;
//       cartdata.image = req.body.image;
//       cartdata.save(err => {
//           if (err) {
//               res.send(err);
//           }
//           res.json({
//               message: 'Cart Update Successfull'
//           });

//       });

//   });
// });
// router.route('/updateaddcart').put((req, res) => {
//   const product_id = req.body.product_id;
//   const name = req.body.name;
//   const regular_price_inr = req.body.regular_price_inr;
//   const sell_price_inr = req.body.sell_price_inr;
//   const regular_price_usd = req.body.sell_price_usd;
//   const sell_price_usd = req.body.sell_price_usd;
//   const quantity = req.body.quantity;
//   const sellername = req.body.sellername;
//   const date = req.body.date;
//   const image = req.body.image;  
//   AddCart.find({product_id:product_id})
//     .then(cartdata => {
//       cartdata.product_id = req.body.product_id;
//       cartdata.name = req.body.name;
//       cartdata.regular_price_inr = req.body.regular_price_inr;
//       cartdata.sell_price_usd = req.body.sell_price_usd;
//       cartdata.quantity = req.body.quantity;
//       cartdata.sellername = req.body.sellername;
//       cartdata.date = req.body.date;
//       cartdata.image = req.body.image;
//       cartdata.save()
//         .then(() => res.json('CartData updated !'))
//         .catch(err => res.status(400).json('Error :' + err))

//     })
//     .catch(err => res.status(400).json('Error :' + err))
// })


// router.get('/addcartlist', async (req, res, next) => {
//   try {
//     const addCartList = await addCartService.getAddCartProductList();
//     res.json(addCartList);
//   } catch (err) {
//     console.log(err);
//     return next(err);
//   }
// });

// router.route('/updateuserdata/:id').patch((req, res) => {
//   SignUpUser.findById(req.params.id)
//     .then(userdata => {
//       userdata.username = req.body.username;
//       userdata.signupEmail = req.body.signupEmail;
//       userdata.mobileNo = req.body.mobileNo;


//       userdata.save()
//         .then(() => res.json('Userdata updated !'))
//         .catch(err => res.status(400).json('Error :' + err))

//     })
//     .catch(err => res.status(400).json('Error :' + err))
// })

// find user by email and phoneno
// router.post('/findusernumber', async (req, res, next) => {

//   var userDetail=req.body;
//   console.log(req.body)
//   SignUpUser.find({mobileNo:userDetail.mobileNo})
//   .exec()
//   .then(user=>{
//       if(user.length <1){
//           res.json({
//               msg: 'loginUser is not valid',
//           })
//       }
//       else{

//           res.status(200).json({
              
//               msg: 'loginUser is valid',
//               user:user,
//           })
//       }
      
//   })
//   .catch(err=>{
//       res.json({
//           error:err
//       })
//   })
  
// });


// find emailid 
// router.get('/signupuser', async (req, res, next) => {
//   try {
//     const signUpUserList = await signUpUserService.getSignUpUserList();
//     res.json(signUpUserList);
//   } catch (err) {
//     console.log(err);
//     return next(err);
//   }
// });

// router.route('/updateuserdata/:id').patch((req, res) => {
//   SignUpUser.findById(req.params.id)
//     .then(userdata => {
//       userdata.username = req.body.username;
//       userdata.signupEmail = req.body.signupEmail;
//       userdata.mobileNo = req.body.mobileNo;


//       userdata.save()
//         .then(() => res.json('Userdata updated !'))
//         .catch(err => res.status(400).json('Error :' + err))

//     })
//     .catch(err => res.status(400).json('Error :' + err))
// })

// find user by email and phoneno
// router.post('/finduseremail', async (req, res, next) => {

//   var userDetail=req.body;
//   console.log(req.body)
//   SignUpUser.find({signupEmail:userDetail.signupEmail})
//   .exec()
//   .then(user=>{
//       if(user.length <1){
//           res.json({
//               msg: 'loginUser is not valid',
//           })
//       }
//       else{

//           res.status(200).json({
              
//               msg: 'loginUser is valid',
//               user:user,
//           })
//       }
      
//   })
//   .catch(err=>{
//       res.json({
//           error:err
//       })
//   })
  
// });


module.exports = router;

