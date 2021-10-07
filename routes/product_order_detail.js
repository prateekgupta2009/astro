const express = require('express');
const router = express.Router();
const productOrderDetailService = require('../services/product_order_detail');
const Product_order_Detail = require('../models/product_order_detail');
var ObjectId = require('mongodb').ObjectId;
var MongoClient = require('mongodb').MongoClient;
const database = require('../config/database');
const shortid = require('shortid');





//    Product Order Detail List
router.get('/product_order_detail', async (req, res, next) => {
    try {
      const productorderdetaillist = await productOrderDetailService.getOrderProductDetail();
      res.json(productorderdetaillist);
    } catch (err) {
      console.log(err);
      return next(err);
    }
  });
  //  create  product order detail
// router.post('/create_product_order_Detail', async (req, res, next) => {
//   try {
//     const user_id = req.body.user_id;
//     const product_id = req.body.product_id;
//     const order_id = req.body.order_id;
//     const product_quantity = req.body.product_quantity;
//     const product_total_amount = req.body.product_total_amount;
//     const total_save = req.body.total_save;
//     const tax_type = req.body.tax_type;
//     const tax_rate = req.body.tax_rate;
//     const is_deleted = req.body.is_deleted;
//     const is_active = req.body.is_active;
//     const edit_total_amount= req.body.edit_total_amount;         
//     const edit_subtotal_amount = req.body.edit_subtotal_amount;
//     const edit_taxable = req.body.edit_taxable;
//     const edit_note = req.body.edit_qty;
//     const edit_product_price = req.body.edit_product_price;
//     const shipping_id = req.body.shipping_id;
//     const delivery_charge = req.body.delivery_charge;
//     const promo_amount = req.body.promo_amount;
//     const promocode = req.body.promocode;
//     const is_complete = req.body.is_complete;
//     const delivery_status = req.body.delivery_status;
//     const payment_mode = req.body.payment_mode;
//     const payment_date = req.body.payment_date;
//     const is_cancel = req.body.is_cancel;
//     const delivery_date = req.body.delivery_date;
//     const is_new = req.body.is_new;
//     const completed_on = req.body.completed_on;
//     const resion = req.body.resion;
//     const delivery_boy_id = req.body.delivery_boy_id;
//     const sale_type = req.body.sale_type;
//     // const edit_total_amount = req.body.edit_total_amount;
//     const edit_subtotal = req.body.edit_subtotal;
//     const subcategory_id = req.body.subcategory_id;
//     const sku = req.body.sku;
//     const warn_quantity = req.body.warn_quantity;
//     const weight_carat = req.body.weight_carat;
//     const weight_ratti = req.body.weight_ratti;
//     const name = req.body.name;
//     const regular_price_inr = req.body.regular_price_inr;
//     const regular_price_usd = req.body.regular_price_usd;
//     const sell_price_inr = req.body.sell_price_inr;
//     const sell_price_usd = req.body.sell_price_usd;
//     const key_feature = req.body.key_feature;
//     const description = req.body.description;
//     const disclaimer = req.body.disclaimer;
//     const stock_quantity = req.body.stock_quantity;
//     const quantity = req.body.quantity;
//     const date = req.body.date;
//     const image = req.body.image;
//     await productOrderDetailService.CreateProductOrderDetail({
//         user_id,product_id,order_id,product_quantity,product_total_amount,total_save,
//         tax_type,tax_rate,is_deleted,is_active,edit_total_amount,edit_subtotal_amount,
//         edit_taxable,edit_note,edit_product_price,shipping_id,delivery_charge,promo_amount,
//         promocode,is_complete,delivery_status,payment_mode,payment_date,is_cancel,delivery_date,
//         is_new,completed_on,resion,delivery_boy_id,sale_type,edit_total_amount,edit_subtotal,
//         subcategory_id,warn_quantity,sku,weight_carat,weight_ratti,name,regular_price_inr,
//         regular_price_usd,sell_price_inr,sell_price_usd,key_feature,description,disclaimer,
//         stock_quantity,quantity,date,image
//     }).then(AddCart=>{
//       res.status(200).json({ msg: 'PRODUCT ORDER DETAIL Create SUCCESS ...!',
//           });
//     })
  
//   } catch (err) {
//     console.log(err);
//     res.status(400).send({ err });
//     // return next(err);
//   }
// });

// add product order detail 

router.post('/add_product_order_Detail',async (req,res,next)=>{
    try{

        const user_id = req.body.user_id;
        const product_id = req.body.product_id;
        const order_id = req.body.order_id;
        const product_quantity = req.body.product_quantity;
        const product_total_amount = req.body.product_total_amount;
        const total_save = req.body.total_save;
        const tax_type = req.body.tax_type;
        const tax_rate = req.body.tax_rate;
        const is_deleted = req.body.is_deleted;
        const is_active = req.body.is_active;
        const edit_subtotal_amount = req.body.edit_subtotal_amount;
        const edit_taxable = req.body.edit_taxable;
        const edit_note = req.body.edit_qty;
        const edit_product_price = req.body.edit_product_price;
        const shipping_id = req.body.shipping_id;
        const delivery_charge = req.body.delivery_charge;
        const promo_amount = req.body.promo_amount;
        const promocode = req.body.promocode;
        const is_complete = req.body.is_complete;
        const delivery_status = req.body.delivery_status;
        const payment_mode = req.body.payment_mode;
        const payment_date = req.body.payment_date;
        const is_cancel = req.body.is_cancel;
        const delivery_date = req.body.delivery_date;
        const is_new = req.body.is_new;
        const completed_on = req.body.completed_on;
        const resion = req.body.resion;
        const delivery_boy_id = req.body.delivery_boy_id;
        const sale_type = req.body.sale_type;
        const edit_total_amount = req.body.edit_total_amount;
        const edit_subtotal = req.body.edit_subtotal;
        const subcategory_id = req.body.subcategory_id;
        const sku = req.body.sku;
        const warn_quantity = req.body.warn_quantity;
        const weight_carat = req.body.weight_carat;
        const weight_ratti = req.body.weight_ratti;
        const name = req.body.name;
        const regular_price_inr = req.body.regular_price_inr;
        const regular_price_usd = req.body.regular_price_usd;
        const sell_price_inr = req.body.sell_price_inr;
        const sell_price_usd = req.body.sell_price_usd;
        const key_feature = req.body.key_feature;
        const description = req.body.description;
        const disclaimer = req.body.disclaimer;
        const stock_quantity = req.body.stock_quantity;
        const quantity = req.body.quantity;
        const date = req.body.date;
        const image = req.body.image;

        await productOrderDetailService.addProductOrderDetail({
            user_id,product_id,order_id,product_quantity,product_total_amount,total_save,
            tax_type,tax_rate,is_deleted,is_active,edit_total_amount,edit_subtotal_amount,
            edit_taxable,edit_note,edit_product_price,shipping_id,delivery_charge,promo_amount,
            promocode,is_complete,delivery_status,payment_mode,payment_date,is_cancel,delivery_date,
            is_new,completed_on,resion,delivery_boy_id,sale_type,edit_total_amount,edit_subtotal,
            subcategory_id,warn_quantity,sku,weight_carat,weight_ratti,name,regular_price_inr,
            regular_price_usd,sell_price_inr,sell_price_usd,key_feature,description,disclaimer,
            stock_quantity,quantity,date,image
        });
        res.json({ msg: 'PRODUCT ORDER DETAIL ADD SUCCESS...!' });
    }
    catch (err) {
        res.status(400).send( err +'value is not defined' );
    }
});

// find product order detail by ID


router.post('/findproductorderdetailbyid', async (req, res, next) => {
  try {
    const user_id=req.body.user_id;
    Product_order_Detail.find({ user_id:user_id })
          .exec()
          .then(user => {
              if (user.length < 1) {
                  // console.log(user)
                  res.json({
                    msg: 'Product Order Detail User  is not valid',
                  })
              }
              else {
                  res.json({
                    msg: 'Product Order Detail User  is  valid',
                    cartList:user,
                  })
              }
          })

  } catch (err) {
      console.log(err);
      res.status(400).send({ err });
  }
});
// router.post('/findproductorderdetailbyid', async (req, res, next) => {
//   const user_id=req.body.user_id;
//   console.log(req.body)
//   Product_order_Detail.find({user_id:user_id})
//   .exec()
//   .then(productorderlist=>{
//       if(productorderlist.length <1){
//           res.json({
//               msg: 'Product Order Detail User  is not valid',
//           })
//       }
//       else{
//           res.status(200).json({              
//               msg: 'Product Order Detail User  is  valid',
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



router.post('/create_product_order_Detail', async (req, res, next) => {
  console.log(req.body)
  try {
    const user_id = req.body.user_id;
    const paymentid= req.body.paymentid
  const product_id= req.body.product_id;
  const item =req.body.item;
  const userAddress_id=req.body.userAddress_id;
  const totalproductPrice=req.body.totalproductPrice;
  const orderID=shortid.generate();
    await productOrderDetailService.CreateProductOrderDetail({user_id,product_id,item,userAddress_id,totalproductPrice,paymentid,
      orderID
    }).then(AddCart=>{
      res.status(200).json({ msg: 'PRODUCT ORDER DETAIL Create SUCCESS ...!',
             orderDetail:{
              orderID:orderID,
              user_id:user_id,
              TotalPayment:totalproductPrice
             }
          });
    })
  
  } catch (err) {
    console.log(err);
    res.status(400).send({ err });
    // return next(err);
  }
});

// add product order detail 

router.post('/add_product_order_Detail',async (req,res,next)=>{
    try{

        const user_id = req.body.user_id;
        const product_id = req.body.product_id;
        const order_id = req.body.order_id;
        const product_quantity = req.body.product_quantity;
        const product_total_amount = req.body.product_total_amount;
        const total_save = req.body.total_save;
        const tax_type = req.body.tax_type;
        const tax_rate = req.body.tax_rate;
        const is_deleted = req.body.is_deleted;
        const is_active = req.body.is_active;
        const edit_subtotal_amount = req.body.edit_subtotal_amount;
        const edit_taxable = req.body.edit_taxable;
        const edit_note = req.body.edit_qty;
        const edit_product_price = req.body.edit_product_price;
        const shipping_id = req.body.shipping_id;
        const delivery_charge = req.body.delivery_charge;
        const promo_amount = req.body.promo_amount;
        const promocode = req.body.promocode;
        const is_complete = req.body.is_complete;
        const delivery_status = req.body.delivery_status;
        const payment_mode = req.body.payment_mode;
        const payment_date = req.body.payment_date;
        const is_cancel = req.body.is_cancel;
        const delivery_date = req.body.delivery_date;
        const is_new = req.body.is_new;
        const completed_on = req.body.completed_on;
        const resion = req.body.resion;
        const delivery_boy_id = req.body.delivery_boy_id;
        const sale_type = req.body.sale_type;
        const edit_total_amount = req.body.edit_total_amount;
        const edit_subtotal = req.body.edit_subtotal;
        const subcategory_id = req.body.subcategory_id;
        const sku = req.body.sku;
        const warn_quantity = req.body.warn_quantity;
        const weight_carat = req.body.weight_carat;
        const weight_ratti = req.body.weight_ratti;
        const name = req.body.name;
        const regular_price_inr = req.body.regular_price_inr;
        const regular_price_usd = req.body.regular_price_usd;
        const sell_price_inr = req.body.sell_price_inr;
        const sell_price_usd = req.body.sell_price_usd;
        const key_feature = req.body.key_feature;
        const description = req.body.description;
        const disclaimer = req.body.disclaimer;
        const stock_quantity = req.body.stock_quantity;
        const quantity = req.body.quantity;
        const date = req.body.date;
        const image = req.body.image;

        await productOrderDetailService.addProductOrderDetail({
            user_id,product_id,order_id,product_quantity,product_total_amount,total_save,
            tax_type,tax_rate,is_deleted,is_active,edit_total_amount,edit_subtotal_amount,
            edit_taxable,edit_note,edit_product_price,shipping_id,delivery_charge,promo_amount,
            promocode,is_complete,delivery_status,payment_mode,payment_date,is_cancel,delivery_date,
            is_new,completed_on,resion,delivery_boy_id,sale_type,edit_total_amount,edit_subtotal,
            subcategory_id,warn_quantity,sku,weight_carat,weight_ratti,name,regular_price_inr,
            regular_price_usd,sell_price_inr,sell_price_usd,key_feature,description,disclaimer,
            stock_quantity,quantity,date,image
        });
        res.json({ msg: 'PRODUCT ORDER DETAIL ADD SUCCESS...!' });
    }
    catch (err) {
        res.status(400).send( err +'value is not defined' );
    }
});

module.exports = router;

