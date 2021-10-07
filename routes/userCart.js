const express = require('express');
const router = express.Router();
const userCartService = require('../services/userCart');
const Cart = require('../models/userCart');
const database = require('../config/database')
const OrderDetail = require('../models/estore_order_detail')

var ObjectId = require('mongodb').ObjectId;
var MongoClient = require('mongodb').MongoClient;
const axios = require("axios");



// add Cart Product after login 
router.post('/addcartafterLogin',(req,res)=>{
  try{
    console.log(req.body)
  //   const data=[
  //    {product_id: "5f8ee4d5657e000059000862", quantity: 1, certificationId: "", EnergizationId: ""},
  //    {product_id: "5f8eea95657e000059000866", quantity: 1, certificationId: "", EnergizationId: ""}
  // ]

    Cart.find({"user_id" : { $in : [ObjectId(`${req.body.user_id}`)]}}, function(err, result){

      if(err){
          res.send(err)
      }
      else{
        const productId=[];
        req.body.productdata.forEach(el=>{
          result.forEach(ele=>{
            if(ele.product_id==el.product_id){
              productId.push(ele.product_id)
            }
          })
        })
        Cart.deleteMany(
          {  user_id:req.body.user_id

          ,          
            _id: {
              $in: productId
            }
          },
          function(err, result) {
            if (err) {
              res.send(err);
            } else {
              const data=req.body.productdata;
              data.forEach(el=>{
                el.user_id=req.body.user_id
              })
              Cart.create(
                data
              )
              // .then(() => res.end());
              res.send({
                msg: 'create  new user cart and add  product',

                result:result,
                productId:productId


              })
              // res.send({
              //   result:result,
              //   productId:productId
              // });
            }
          }
        );
         // res.send(productId)
      }

  })
    // req.body.forEach(el=>{
    //   productiId.push(ObjectId(el.product_id))
    // })


  }catch{

  }

})

router.post('/addcartproduct', (req, res) => {
  try {
    console.log(req.body)
    Cart.find({ user_id: req.body.user_id, product_id: req.body.product_id }, (error, result) => {
      if (error) {
        res.send({
          msg: `Error + ${error}`
        })
      }
      else {
        if (result.length === 0) {
          Cart.create(
            req.body
          )
          // .then(() => res.end());
          res.send({
            msg: 'create  new user cart and add  product'
          })
        }
        else {
          Cart.findOne({user_id: req.body.user_id, product_id: req.body.product_id},(err,doc)=>{
            if (err) {
              res.send({
                msg: `Error + ${err}`
              })
            }
            else {
              const quantity= `${parseInt(doc.quantity)+1}`
              console.log(doc.quantity)
              Cart.findOneAndUpdate({ user_id: req.body.user_id, product_id: req.body.product_id }, 
               { quantity: quantity },
                 (err, docs) => {
                if (err) {
                  res.send({
                    msg: `Error + ${err}`
                  })
                }
                else {
    
                  res.send({
                    msg: 'update cart',
                    result: docs
                  })
                }
              })

            }
          })
        }
      }
    })
  }
  catch (err) {
    res.send({
      msg: 'error'
    })
  }
})
// find cart product detail in bulk  by product id and addone id
router.post('/findestoreCartProductDetail', (req, res) => {
  // console.log(req.body)
  const product_id=[];
  const addone_id=[];

  if(req.body.length>0){
  req.body.forEach(el=>{
    if(el.EnergizationId !='' && el.certificationId  !=''){
    product_id.push(ObjectId(el.product_id)) && addone_id.push(ObjectId(el.EnergizationId)) && addone_id.push(ObjectId(el.certificationId))
    }
    else if(el.EnergizationId =='' && el.certificationId  ==''){
      product_id.push(ObjectId(el.product_id))

    }
    else if(el.EnergizationId ==''){
      product_id.push(ObjectId(el.product_id)) &&  addone_id.push(ObjectId(el.certificationId))

    }
    else if(el.certificationId  ==''){
      product_id.push(ObjectId(el.product_id)) && addone_id.push(ObjectId(el.EnergizationId)) 

    }
  })

  console.log(product_id)
  console.log(addone_id)
    MongoClient.connect(database.dbConnection, function (err, db) {
      if (err) throw err;
      var dbo = db.db("astrology");
      dbo.collection("e_stores").find( {
        "_id" : {
          "$in" : 
          product_id
         }
        })
        .toArray(function (err, data) {
          if (err) {
            res.json({
              result: err
            })
            console.log(err)
          }
          else{
            MongoClient.connect(database.dbConnection, function (err, db) {
              if (err) throw err;
              var dbo = db.db("astrology");
              dbo.collection("estore_addons").find( {
                "_id" : {
                  "$in" : 
                  addone_id
                    // [ObjectId("5fe42c73fb9a6022de764fe2"), 
                    //  ObjectId("5fe42c73fb9a6022de764fe3")
                    // ]
                 }
                })
                .toArray(function (err, result) {
                  if (err) {
                    res.json({
                      result: err
                    })
                    console.log(err)
                  }
                  else{
                    // const productdetail=[]
                    data.forEach(ele=>{
                      req.body.forEach(el=>{
                       if(ele._id==el.product_id){
                        ele.quantity=parseInt(el.quantity)
                       }
                      })
                    })
                      res.json({
                      certification:result.filter(el=>{
                        return el.type=='certification'
                      }),
                      Energization:result.filter(el=>{
                        return el.type=='energization'
                      }),

                      productList:data
                    })
                  }
                 
                  db.close();
                });
            });

          }
         
          db.close();
        });
    });
  }
  else{
    res.send({
      result:'empty cart'
    })
  }
})
// find cart product detail by user id 

router.post('/findCartProductDetailByuserID', (req, res) => {
  // console.log(req.body)
  const user_id=req.body.user_id;
  const product_id=[];
  const addone_id=[];
  
  Cart.find({user_id:user_id }, function (err, docs) {
    if (err){
        console.log(err)
    }
    else{
      docs.forEach(ele=>{
        if(ele.EnergizationId !='' && ele.certificationId  !=''){
          product_id.push(ObjectId(ele.product_id)) && addone_id.push(ObjectId(ele.EnergizationId)) && addone_id.push(ObjectId(ele.certificationId))
          }
          else if(ele.EnergizationId =='' && ele.certificationId  ==''){
            product_id.push(ObjectId(ele.product_id))
      
          }
          else if(ele.EnergizationId ==''){
            product_id.push(ObjectId(ele.product_id)) &&  addone_id.push(ObjectId(ele.certificationId))
      
          }
          else if(ele.certificationId  ==''){
            product_id.push(ObjectId(ele.product_id)) && addone_id.push(ObjectId(ele.EnergizationId))
      
          }
       })
        // console.log("Result : ", docs);
        // res.send({
        //   msg:'success',
        //   result:docs,
        //   product_id:product_id,
        //   addone_id:addone_id
        // })

    MongoClient.connect(database.dbConnection, function (err, db) {
      if (err) throw err;
      var dbo = db.db("astrology");
      dbo.collection("e_stores").find( {
        "_id" : {
          "$in" : 
          product_id
         }
        })
        .toArray(function (err, data) {
          if (err) {
            res.json({
              result: err
            })
            console.log(err)
          }
          else{
            console.log(data)

            MongoClient.connect(database.dbConnection, function (err, db) {
              if (err) throw err;
              var dbo = db.db("astrology");
              dbo.collection("estore_addons").find( {
                "_id" : {
                  "$in" : 
                  addone_id
                    // [ObjectId("5fe42c73fb9a6022de764fe2"), 
                    //  ObjectId("5fe42c73fb9a6022de764fe3")
                    // ]
                 }
                })
                .toArray(function (err, result) {
                  if (err) {
                    res.json({
                      result: err
                    })
                    console.log(err)
                  }
                  else{

                    // const productdetail=[]
                    data.forEach(ele=>{
                      docs.forEach(el=>{
                       if(ele._id==el.product_id){
                        ele.quantity= parseInt(el.quantity)
                       }
                      })
                    })
                      res.json({
                      msg:'Success List',
                      certification:result.filter(el=>{
                        return el.type=='certification'
                      }),
                      Energization:result.filter(el=>{
                        return el.type=='energization'
                      }),

                      productList:data
                    })
                  }
                 
                  db.close();
                });
            });

          }
         
          db.close();
        });
    });
  }
});

})


router.post('/createUsercardproduct', (req, res) => {
  console.log(req.body)

  const user_id = req.body.user_id;
  const item = {
    product_id: req.body.product_id,
    quantity: parseInt(req.body.quantity),
    user_id: req.body.user_id,
    subcategory_id: req.body.subcategory_id,
    warn_quantity: req.body.warn_quantity,
    sku: req.body.sku,
    weight_carat: req.body.weight_carat,
    weight_ratti: req.body.weight_ratti,
    product_id: req.body.product_id,
    name: req.body.name,
    regular_price_inr: req.body.regular_price_inr,
    sell_price_inr: req.body.sell_price_inr,
    sell_price_usd: req.body.sell_price_usd,
    regular_price_usd: req.body.regular_price_usd,
    key_feature: req.body.key_feature,
    description: req.body.description,
    disclaimer: req.body.disclaimer,
    stock_quantity: req.body.stock_quantity,
    image: req.body.image,
    date: req.body.date,
    certificationPrice: req.body.certificationPrice,
    EnergizationPrice: req.body.EnergizationPrice,
    certificationId: req.body.certificationId,
    EnergizationId: req.body.EnergizationId,
    energyWearer: req.body.energyWearer,
    energyBirthPlace: req.body.energyBirthPlace,
    energyDob: req.body.energyDob,
    energytob: req.body.energytob,
    energygotra: req.body.energygotra,
    addone: req.body.addone
  };
  console.log(item)

  Cart.findOne({ user_id: user_id })
    .then((foundCart) => {
      if (foundCart) {
        let products = foundCart.usercart.map((item) => item.product_id + '');
        if (products.includes(item.product_id)) {
          Cart.findOneAndUpdate({
            user_id: user_id,
            usercart: {
              $elemMatch: { product_id: item.product_id }
            }
          },
            {
              $set: { 'usercart.$.quantity': parseInt(item.quantity) }
            })
            .exec()
          // .then(() => res.end());
          res.send({
            msg: 'add and update product'
          })

        } else {

          foundCart.usercart.push(item);
          foundCart.save()
          // .then((res) =>
          // res.end());
          // res.send({
          //   msg:'add cart'
          // })
          res.send({
            msg: 'add item cart'
          })

        }

      } else {
        Cart.create({
          user_id: user_id,
          usercart: [item]
        })
          .then(() => res.end());
        res.send({
          msg: 'create  new user cart and add  product'
        })
      }

    });
});
// product quantity increment
router.post('/quantityincrement', (req, res) => {

  const user_id = req.body.user_id;
  const item = {
    product_id: req.body.product_id,
    quantity: req.body.quantity
  };
  Cart.findOneAndUpdate({ user_id: user_id, product_id: item.product_id }, { quantity: item.quantity }, (err, doc) => {
    if (err) {
      console.log('error')
      res.send({
        msg: `Error +${err}`
      })
    }
    else {
      console.log('increment')
      res.send({
        msg: 'increment success'
      })
    }
  })

  // Cart.findOne({ user_id: user_id })
  //   .then((foundCart) => {
  //     if (foundCart) {
  //       let products = foundCart.usercart.map((item) => item.product_id + '');
  //       if (products.includes(item.product_id)) {
  //         Cart.findOneAndUpdate({
  //           user_id: user_id,
  //           usercart: {
  //             $elemMatch: { product_id: item.product_id }
  //           }
  //         },
  //           {
  //             $inc: { 'usercart.$.quantity': parseInt(item.quantity) }
  //           })
  //           .exec()
  //           .then(() => res.end());
  //         res.send({
  //           msg: 'increment success'
  //         })
  //       }

  //     } else {
  //       res.status(400).json({
  //         msg: 'product not found'
  //       });

  //     }
  //   });
});


// product quantity decrement
router.post('/quantitydecrement', (req, res) => {

  const user_id = req.body.user_id;
  const item = {
    product_id: req.body.product_id,
    quantity: parseInt(req.body.quantity)
  };
  console.log(item)

  Cart.findOneAndUpdate({ user_id: user_id, product_id: item.product_id }, { quantity: item.quantity }, (err, doc) => {
    if (err) {
      console.log('error')
      res.send({
        msg: `Error +${err}`
      })
    }
    else {
      console.log('increment')
      res.send({
        msg: 'decrement success'
      })
    }
  })
  // Cart.findOne({ user_id: user_id })
  //   .then((foundCart) => {
  //     if (foundCart) {
  //       let products = foundCart.usercart.map((item) => item.product_id + '');
  //       if (products.includes(item.product_id)) {
  //         Cart.findOneAndUpdate({
  //           user_id: user_id,
  //           usercart: {
  //             $elemMatch: { product_id: item.product_id }
  //           }
  //         },
  //           {
  //             $inc: { 'usercart.$.quantity': parseInt(item.quantity) }
  //           })
  //           .exec()
  //         // .then(() => res.end());
  //         res.send({
  //           msg: 'decrement success'
  //         })
  //       }

  //     } else {
  //       res.status(400).json({
  //         msg: 'product not found'
  //       });

  //     }
  //   });
});

/// remove product by id
router.post('/removeproductbyid', (req, res) => {

  const user_id = req.body.user_id;
  const item = {
    product_id: req.body.product_id,
    quantity: parseInt(req.body.quantity)
  };
  console.log(item)
  Cart.findOneAndDelete({ user_id: user_id, product_id: item.product_id, quantity: item.quantity }, (err, result) => {
    if (err) {
      console.log(err)
      res.status(400).json({
        msg: `Error +${err}`
      });
    }
    else {
      console.log('delete product')
      res.send({
        msg: 'remove success'
      })
    }
  })

  // Cart.findOne({ user_id: user_id })
  //   .then((foundCart) => {
  //     if (foundCart) {
  //       let products = foundCart.usercart.map((item) => item.product_id + '');
  //       if (products.includes(item.product_id)) {
  //         Cart.findOneAndUpdate({
  //           user_id: user_id,
  //           usercart: {
  //             $elemMatch: { product_id: item.product_id ,quantity:item.quantity}
  //           }
  //         },
  //           {
  //             $pull: { 'usercart': {product_id:item.product_id} }
  //           })
  //           .exec()
  //           // .then(() => res.end());
  //           res.send({
  //             msg:'remove success'
  //           })
  //       } 

  //     } else {
  //       res.status(400).json({
  //         msg:'product not found'
  //       });
  //     }
  //   });
});



// // find cartuserby userid
router.post('/findusercartproduct', (req, res, next) => {
  var user_id = req.body.user_id;
  console.log(req.body)
  Cart.find({ user_id: user_id })
    .exec()
    .then(cartList => {
      if (cartList.length < 1) {
        res.json({
          msg: 'User CartProduct  is not valid',
        })
      }
      else {
      const  totalquantity=cartList.reduce((n, {quantity}) => n + parseInt(quantity), 0)
      // data.forEach(ele=>{
      //     totalquantity = parseInt(ele.quantity)+totalquantity
      //     console.log(totalquantity)

      //   })
        res.status(200).json({
          msg: 'User CartProduct  is  valid',
          cartList: cartList,
          totalquantity:totalquantity
        })
      }

    })
    .catch(err => {
      res.json({
        error: err
      })
    })

});

router.post('/findcartproductdetail', (req, res, next) => {

  MongoClient.connect(database.dbConnection, { useUnifiedTopology: true }, function (err, db) {
    if (err) throw err;
    var dbo = db.db("astrology");
    dbo.collection("user_carts").aggregate([

      // { "$addFields": { "userId": { "$toString": "$_id" } } },

      {

        $lookup: {
          from: "e_stores",
          localField: "_id.str",
          foreignField: "product_id",
          as: "productdetail"
        },

      },
    ]).toArray(function (err, result) {

      if (err) {
        res.status(400).json({
          msg: 'Something Error'
        })
      }
      else {
        result.forEach(el => {
          el.productdata = []
          el.productdetail.forEach(ele => {
            if (el.product_id == ele._id) {
              el.productdata.push(ele)
            }
          })
        })

        result.forEach(ele => {
          delete ele.productdetail
            && delete ele.created_at && delete ele.updated_at

        })


        res.status(200).json({
          msg: 'Success List',
          result:
            result.filter(el => {
              return el.user_id == req.body.user_id
            })
        })
      }



      db.close();
    });
  });

});

// after Login ceate user_Cart  and delete old match product by id

router.post('/insertmanyusercartproduct', (req, res, next) => {
  var i;
for (i = 0; i < req.body.length; i++) {
  MyModel.findOneAndRemove({user_id:req.body.user_id,
    product_id:req.body[i].product_id
  }, function(err,result){
if(err){
  console.log(err)
}
else{
  res.send({
    msg:' delete success',
    
  })
}

  });
}
  console.log(req.body)
  Cart.find({ user_id: user_id })
    .exec()
    .then(cartList => {
      if (cartList.length < 1) {
        res.json({
          msg: 'User CartProduct  is not valid',
        })
      }
      else {
        res.status(200).json({
          msg: 'User CartProduct  is  valid',
          cartList: cartList,
        })
      }

    })
    .catch(err => {
      res.json({
        error: err
      })
    })

});





module.exports = router;

