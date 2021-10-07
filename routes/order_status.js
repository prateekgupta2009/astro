const express = require('express');
const router = express.Router();
const userCartService = require('../services/userCart');
const order_status = require('../models/order_status');
var ObjectId = require('mongodb').ObjectId;




// addusercart product


// find cartuserby userid
router.post('/findusercartproduct', async (req, res, next) => {
  var user_id=req.body.user_id;
  console.log(req.body)
  AddCart.find({user_id:user_id})
  .exec()
  .then(cartList=>{
      if(cartList.length <1){
          res.json({
              msg: 'User CartProduct  is not valid',
          })
      }
      else{
          res.status(200).json({              
              msg: 'User CartProduct  is  valid',
              cartList:cartList,
          })
      }
      
  })
  .catch(err=>{
      res.json({
          error:err
      })
  })
  
});


/// delete cart product
router.post('/deleteusercartproduct',async (req,res,next)=>{
  try{

  const user_id = req.body.user_id;
  const subcategory_id = req.body.subcategory_id;
  const warn_quantity = req.body.warn_quantity;
  const sku = req.body.sku;
  const weight_carat = req.body.weight_carat;
  const weight_ratti = req.body.weight_ratti;
  const product_id = req.body.product_id;
  const name = req.body.name;
  const regular_price_inr = req.body.regular_price_inr;
  const sell_price_inr = req.body.sell_price_inr;
  const sell_price_usd= req.body.sell_price_usd;         
  const regular_price_usd = req.body.regular_price_usd;
  const key_feature = req.body.key_feature;
  const description = req.body.description;
  const disclaimer = req.body.disclaimer;
  const stock_quantity = req.body.stock_quantity;
  const image = req.body.image;
  const date = req.body.date;
  const quantity = req.body.quantity;

      await userCartService.deleteusercartProduct({
          user_id,subcategory_id, warn_quantity, sku,weight_carat,weight_ratti, product_id,name,regular_price_inr,regular_price_usd,
          key_feature,description,disclaimer,stock_quantity,image,date,sell_price_inr,sell_price_usd,quantity
      });
      res.json({ msg: 'delete USER_CART PRODUCT...!' });
  }
  catch (err) {
      res.status(400).send( err +'value is not defined' );
  }
});

// router.post('/deleteusercartproduct', async (req, res, next) => {
//   var _id=req.body._id;
//   AddCart.findByIdAndUpdate(
//     _id, { $pull: { "usercart": { _id:_id } } }, { safe: true, upsert: true },
//     function(err, node) {
//         if (err) { return handleError(res, err); }
//         return res.status(200).json(node.usercart);
//     });


  // AddCart.update(
  //   { "referrals": referredId },
  //   { "$pull": { "referrals": referredId } },
  //   { "multi": true },
  //   function(err,status) {
  
  //   }
  // )
 //});

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


router.get('/addcartlist', async (req, res, next) => {
  try {
    const addCartList = await addCartService.getAddCartProductList();
    res.json(addCartList);
  } catch (err) {
    console.log(err);
    return next(err);
  }
});

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

