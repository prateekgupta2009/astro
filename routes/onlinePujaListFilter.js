const express = require('express');
const router = express.Router();
var jwt = require('jsonwebtoken');
const database = require('../config/database')
const mongodb = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;




router.post('/filter_onlinePuja_list', (req, res, next) => {
    let order = req.body.order ? req.body.order : "desc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "$_id";
    const skip = parseInt(req.body.skip);
    const limit = parseInt(req.body.limit);
    const lowerPrice = req.body.lowerPrice;
    const hightPrice = req.body.hightPrice;
    // const astrologer_name = req.body.astrologer_name;
    // const searchtext = req.body.searchtext;
    const categoryarray = req.body.categoryarray;
  
    // const experiencearray = req.body.experiencearray

    MongoClient.connect(database.dbConnection, function (err, db) {
        if (err) throw err;
        var dbo = db.db("astrology");
        dbo.collection("online_poojas").find({ 
        }, { useUnifiedTopology: true }).project({
          name: 1, duration_number: 1, duration_type: 1,
          file_1: 1, regular_price_inr: 1, sell_price_inr: 1, regular_price_usd: 1, sell_price_usd: 1, save_status: 1,category_id:1
        }).skip(parseInt(skip)).limit(parseInt(limit))
        .toArray(function (err, result) {
            if (err) {
                res.status(400).json({
                    msg: 'Something Error',
                    err: err
                })
            }
            else {
                if ((hightPrice != undefined && lowerPrice != undefined)) {
                    const data = result.filter((o) => {
                        return parseInt(o.sell_price_inr) <= parseInt(hightPrice) && parseInt(o.sell_price_inr) >= parseInt(lowerPrice)
                    })
                    if (categoryarray.length > 0) {

                        const categoryfilter = categoryarray.length > 0 ?
                            (data.filter((el) => {
                                return  categoryarray.indexOf(el.category_id) > -1;
                            })) : data

                            res.status(200).json({
                                msg: 'Success List',
                                result: categoryfilter.filter(el => {
                                    return el.save_status == "published"
                                }),
                                postSize: categoryfilter.filter(el => {
                                    return el.save_status == "published"
                                }).length,
                                filter: 'category filter'
    
    
                            })
                    }
                    else {
                        res.status(200).json({
                            msg: 'Success List',
                            result: data.filter(el => {
                                return el.save_status == "published"
                            }),
                            postSize: data.filter(el => {
                                return el.save_status == "published"
                            }).length,
                            filter: 'price filter'


                        })

                    }

                }

                else {
                    res.status(200).json({
                        msg: 'Success List',
                        result: result.filter(el => {
                            return el.save_status == "published"
                        }),
                        postSize: result.filter(el => {
                            return el.save_status == "published"
                        }).length,
                        filter: 'default filter'


                    })
                }



            }


            db.close();
        });
    });

});
module.exports = router;