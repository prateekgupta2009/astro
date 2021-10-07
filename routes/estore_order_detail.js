const express = require('express');
const router = express.Router();
const estore_addonsService = require('../services/estore_addons');
const Estore_order = require('../models/estore_order');
const database = require('../config/database');
const Cart = require('../models/userCart')
const OrderDetail=require('../models/estore_order_detail')


var ObjectId = require('mongodb').ObjectId;
var MongoClient = require('mongodb').MongoClient;

router.post('/estore_order_detail', async (req, res, next) => {
    try {
       // console.log(req.body)
        MongoClient.connect(database.dbConnection, { useUnifiedTopology: true }, function (err, db) {
            if (err) throw err;
            var dbo = db.db("astrology");
            dbo.collection("user_carts").aggregate([
                { $match : { user_id:req.body.user_id } },
              // { "$addFields": { "userId": { "$toString": "$_id" } } },
        
              {
        
                $lookup: {
                  from: "e_stores",
                  localField: "_id.str",
                  foreignField: "product_id",
                  as: "productdetail"
                },
        
              },
              {
        
                $lookup: {
                  from: "estore_addons",
                  localField: "_id.str",
                  foreignField: "certificationId",
                  as: "Energization"
                },
        
              },
              {
        
                $lookup: {
                  from: "estore_addons",
                  localField: "_id.str",
                  foreignField: "certificationId",
                  as: "Certification"
                },
        
              },
            ]).toArray(function (err, result) {
        
              if (err) {
                res.status(400).json({
                  msg: 'Something Error'
                })
              }
              else {
                 // console.log(result)
                result.forEach(el => {
                  el.productdata = []
                  el.productdetail.forEach(ele => {
                    if (el.product_id == ele._id) {
                      el.productdata.push(ele)
                    }
                  })
                })
            
            result.forEach(el => {
                    if(el.EnergizationId !=''){
                        el.Energizationdata = []

                    el.Energization.forEach(ele => {
                      if (el.EnergizationId == ele._id) {
                        el.Energizationdata.push(ele)
                      }
                    })
                }
                  })
                  result.forEach(el => {
                    if(el.certificationId !=''){

                    el.Certificationdata = []
                    el.Certification.forEach(ele => {
                      if (el.certificationId == ele._id) {
                        el.Certificationdata.push(ele)
                      }
                    })
                }
                  })
        
                  result.forEach(ele => {
                  delete ele.productdetail
                  && delete ele.Certification
                  && delete ele.Energization

                    && delete ele.created_at && delete ele.updated_at 
                    && delete ele.productdata[0].created_at
                    && delete ele.productdata[0].created_by 
                    && delete ele.productdata[0].file_2
                    && delete ele.productdata[0].file_3
                    && delete ele.productdata[0].file_4
                    && delete ele.productdata[0].file_5
                    && delete ele.productdata[0].file_6
                    && delete ele.productdata[0].file_7
                    && delete ele.productdata[0].file_8
                })
               result.forEach(el=>{
                  el.productdetail=[]
                  if(el.certificationId !=='' && el.EnergizationId !==''){
                    el.productdetail.push({
                    order_id:req.body._id,
                    product_id:el.product_id,
                    sku:el.productdata[0].sku,
                    weight_carat:el.productdata[0].weight_carat,
                    weight_ratti:el.productdata[0].weight_ratti,
                    name:el.productdata[0].name,
                    regular_price_inr:el.productdata[0].regular_price_inr,

                    regular_price_usd:el.productdata[0].regular_price_usd,
                    sell_price_inr:el.productdata[0].sell_price_inr,
                    sell_price_usd:el.productdata[0].sell_price_usd,
                    key_feature:el.productdata[0].key_feature,
                    description:el.productdata[0].description,
                    disclaimer:el.productdata[0].disclaimer,

                    stock_quantity:el.productdata[0].warn_quantity,

                    quantity:el.quantity,
                    image:el.productdata[0].file_1,
                    EnergizationId:el.EnergizationId,
                    Energizationtype:el.Energizationdata[0].type,
                    Energizationoption:el.Energizationdata[0].option,
                    Energizationprice_inr:el.Energizationdata[0].price_inr,
                    Energizationprice_usd:el.Energizationdata[0].price_usd,
                    certificationId:el.certificationId,
                    certificationtype:el.Certificationdata[0].type,
                    certificationoption:el.Certificationdata[0].option,
                    certificationprice_inr:el.Certificationdata[0].price_inr,
                    certificationprice_usd:el.Certificationdata[0].price_usd,
                    wearename:el.wearename,

                    wearerdob:el.wearerdob,
                    wearerbirthplace:el.wearerbirthplace,
                    wearertob:el.wearertob,
                    wearergotra:el.wearergotra,
                 })
                }
              else  if(el.certificationId !==''){
                    el.productdetail.push({
                        order_id:req.body._id,
                        product_id:el.product_id,
                        sku:el.productdata[0].sku,
                        weight_carat:el.productdata[0].weight_carat,
                        weight_ratti:el.productdata[0].weight_ratti,
                        name:el.productdata[0].name,
                        regular_price_inr:el.productdata[0].regular_price_inr,
    
                        regular_price_usd:el.productdata[0].regular_price_usd,
                        sell_price_inr:el.productdata[0].sell_price_inr,
                        sell_price_usd:el.productdata[0].sell_price_usd,
                        key_feature:el.productdata[0].key_feature,
                        description:el.productdata[0].description,
                        disclaimer:el.productdata[0].disclaimer,
    
                        stock_quantity:el.productdata[0].warn_quantity,
    
                        quantity:el.quantity,
                        image:el.productdata[0].file_1,

                        certificationId:el.certificationId,
                        certificationtype:el.Certificationdata[0].type,
                        certificationoption:el.Certificationdata[0].option,
                        certificationprice_inr:el.Certificationdata[0].price_inr,
                        certificationprice_usd:el.Certificationdata[0].price_usd,
                     })
                }
               else if(el.EnergizationId !==''){
                el.productdetail.push({
                    order_id:req.body._id,
                    product_id:el.product_id,
                    sku:el.productdata[0].sku,
                    weight_carat:el.productdata[0].weight_carat,
                    weight_ratti:el.productdata[0].weight_ratti,
                    name:el.productdata[0].name,
                    regular_price_inr:el.productdata[0].regular_price_inr,

                    regular_price_usd:el.productdata[0].regular_price_usd,
                    sell_price_inr:el.productdata[0].sell_price_inr,
                    sell_price_usd:el.productdata[0].sell_price_usd,
                    key_feature:el.productdata[0].key_feature,
                    description:el.productdata[0].description,
                    disclaimer:el.productdata[0].disclaimer,

                    stock_quantity:el.productdata[0].warn_quantity,

                    quantity:el.quantity,
                    image:el.productdata[0].file_1,
                    EnergizationId:el.EnergizationId,
                    Energizationtype:el.Energizationdata[0].type,
                    Energizationoption:el.Energizationdata[0].option,
                    Energizationprice_inr:el.Energizationdata[0].price_inr,
                    Energizationprice_usd:el.Energizationdata[0].price_usd,
                   
                    wearename:el.wearename,

                    wearerdob:el.wearerdob,
                    wearerbirthplace:el.wearerbirthplace,
                    wearertob:el.wearertob,
                    wearergotra:el.wearergotra,
                 })
                }


                else if(el.certificationId =='' || el.EnergizationId ==''){
                    el.productdetail.push({
                        order_id:req.body._id,
                        product_id:el.product_id,
                        sku:el.productdata[0].sku,
                        weight_carat:el.productdata[0].weight_carat,
                        weight_ratti:el.productdata[0].weight_ratti,
                        name:el.productdata[0].name,
                        regular_price_inr:el.productdata[0].regular_price_inr,
    
                        regular_price_usd:el.productdata[0].regular_price_usd,
                        sell_price_inr:el.productdata[0].sell_price_inr,
                        sell_price_usd:el.productdata[0].sell_price_usd,
                        key_feature:el.productdata[0].key_feature,
                        description:el.productdata[0].description,
                        disclaimer:el.productdata[0].disclaimer,
    
                        stock_quantity:el.productdata[0].warn_quantity,
    
                        quantity:el.quantity,
                        image:el.productdata[0].file_1,
                    })
                }
                })
                result.forEach(ele => {
                    delete ele.productdata

                  })
                  if(result.length>0){
                    OrderDetail.create(result.map((ele)=>{return ele.productdetail[0]}), function (err, docs) {
                      if (err){ 
                          return console.error(err);
                      } else {
                        Cart.deleteMany({user_id:req.body.user_id}, function(err, result) {
                            if (err) {
                              res.send(err);
                            } else {
                                 console.log(result)
                              res.send({
                                msg:'create order detail success',
                                result:result
                              });
                            }
                          });
                        //   res.send({
                        //       msg:'create order Detail',
                        //       result:docs
                        //   })
                        console.log("Multiple documents inserted to Collection");
                      }
                    });
                
                 }
                // res.status(200).json({
                //   msg: 'Success List',
                //   result:result.map((ele)=>{return ele.productdetail[0]})

                // })
              }
        
        
        
              db.close();
            });
          });
            
        
        // Estore_order.create(
        //     req.body
        //   ).then(result=>{
        //       console.log(result)
        //       res.send({
        //         msg: 'create Estore order',
        //         result:result
        //       })
        //   })
        //   .catch(err=>{
        //       console.log(err)
        //   })
          // .then(() => res.end());
         
    } catch (err) {
      console.log(err);
      res.send({
          msg:`Error+${err}`
      })
    }
  });


module.exports = router;