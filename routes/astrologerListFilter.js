const express = require('express');
const router = express.Router();
var jwt = require('jsonwebtoken');
const database = require('../config/database')
const mongodb = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;




router.post('/filter_astrologer_list', (req, res, next) => {
    let order = req.body.order ? req.body.order : "desc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "$_id";
    const skip = parseInt(req.body.skip);
    const limit = parseInt(req.body.limit);
    const lowerPrice = req.body.lowerPrice;
    const hightPrice = req.body.hightPrice;
    const astrologer_name = req.body.astrologer_name;
    const searchtext = req.body.searchtext;
    const categoryarray = req.body.categoryarray;
    const languagearray = req.body.languagearray;
    const experiencearray = req.body.experiencearray;
    const ratingarray = req.body.ratingarray;
    // const experiencearray = req.body.experiencearray

    MongoClient.connect(database.dbConnection, { useUnifiedTopology: true }, function (err, db) {
        if (err) throw err;
        var dbo = db.db("astrology");
        dbo.collection("astrologers").aggregate([
            { "$addFields": { "userId": { "$toString": "$_id" } } }, { $skip: skip }, { $limit: limit },


            // { 
            //     $match: { 
            //              name: { $eq: searchtext } 
            //     } 
            // },




            {

                $lookup: {
                    from: "astrologer_languages",
                    localField: "userId",
                    foreignField: "astrologer_id",
                    as: "astrologerlanguages"
                },

            },

            {
                $lookup: {
                    from: "astrologer_prices",
                    localField: "userId",
                    foreignField: "astrologer_id",
                    as: "astrologerprices"
                },
            },
            { "$addFields": { "userId": { "$toString": "$_id" } } },

            {

                $lookup: {
                    from: "astrologer_languages",
                    localField: "userId",
                    foreignField: "astrologer_id",
                    as: "astrologerlanguages"
                },

            },
            // {   $unwind: "$astrologerprices" },
            // { $text: { $search: searchtext } },

            // { 
            //     $match: { 
            //          astrologerprices: { $elemMatch: {call_sell_price:{ $gte: lowerPrice, $lt: hightPrice} } } 

            //         // $or: [
            //         //     { $text: { $search: searchtext } }
            //         //                  { name: { $eq: astrologer_name} }, 
            //         //                  { 'astrologerprices.call_sell_price': { $gt: '0' } }
            //         //              ]
            //         //  "astrologerprices.call_sell_price": "15"
            //     } 
            // },



            {
                "$project": {
                    "name": 1, "experience": 1, "rating": 1, "image": 1, "image_path": 1, "save_status": 1,
                    "call_sell_price": { "$arrayElemAt": ["$astrologerprices.call_sell_price", 0] },
                    "chat_sell_price": { "$arrayElemAt": ["$astrologerprices.chat_sell_price", 0] },
                    "dolar_call_sell_price": { "$arrayElemAt": ["$astrologerprices.dolar_call_sell_price", 0] },
                    "dolar_chat_sell_price": { "$arrayElemAt": ["$astrologerprices.dolar_chat_sell_price", 0] },
                    "dolar_video_sell_price": { "$arrayElemAt": ["$astrologerprices.dolar_video_sell_price", 0] },
                    "video_sell_price": { "$arrayElemAt": ["$astrologerprices.video_sell_price", 0] },
                    "call_minut": { "$arrayElemAt": ["$astrologerprices.call_minut", 0] },
                    "chat_minut": { "$arrayElemAt": ["$astrologerprices.chat_minut", 0] },
                    "video_minut": { "$arrayElemAt": ["$astrologerprices.video_minut", 0] },
                    language_id: "$astrologerlanguages.language_id",
                    astrologersubcat: "$astrologersubcat.name"
                }
            },
            {
                $lookup: {
                    from: "subcategories",
                    localField: "userId",
                    foreignField: "astrologer_id",
                    as: "astrologersubcat"
                },
            },
            { "$addFields": { "userId": { "$toString": "$_id" } } },

            {
                $lookup: {
                    from: "astrologer_categories",
                    localField: "userId",
                    foreignField: "astrologer_id",
                    as: "astrologercat"
                },
            },
            //  { astrologerprices: { $elemMatch: {call_sell_price:{ $gt: lowerPrice, $lt: hightPrice} } } },





        ]).toArray(function (err, result) {
            if (err) {
                res.status(400).json({
                    msg: 'Something Error',
                    err: err
                })
            }
            else {
                // price filter //


                result.forEach(ele => {
                    ele.languageList = [];
                    ele.language_id.forEach(lngid => {
                        ele.astrologersubcat.forEach(el => {
                            if (lngid == el._id) {
                                ele.languageList.push(el.name)
                            }
                        })
                    });
                })
                result.forEach(ele => {
                    ele.astrocategorylist = [];
                    ele.astrologercat.forEach(lngid => {
                        ele.astrologersubcat.forEach(el => {
                            if (lngid.category_id == el._id) {
                                ele.astrocategorylist.push(el.name)
                            }
                        })
                    });
                })
                result.forEach(ele => {
                    delete ele.astrologersubcat
                        &&
                        delete ele.language_id
                        && delete ele.userId
                        && delete ele.astrologercat
                })
                if ((hightPrice != undefined && lowerPrice != undefined)) {
                    const data = result.filter((o) => {
                        return parseInt(o.call_sell_price) <= parseInt(hightPrice) && parseInt(o.call_sell_price) >= parseInt(lowerPrice)
                    })
                    if (categoryarray.length > 0 || languagearray.length > 0 || experiencearray.length > 0 || ratingarray > 0) {

                        const categoryfilter = categoryarray.length > 0 ?
                            (data.filter((el) => {
                                return categoryarray.some(r => el.astrocategorylist.indexOf(r) >= 0)
                            })) : data

                        if (languagearray.length > 0 || experiencearray.length > 0 || ratingarray > 0) {
                            const languageFilter = languagearray.length > 0 ?
                                categoryfilter.filter((ele) => {
                                    return languagearray.some(i => ele.languageList.indexOf(i) >= 0)
                                }) : categoryfilter
                            if (experiencearray.length > 0 || ratingarray > 0) {
                                const minexpvalue = Math.min(...experiencearray)
                                const experiencefilter = experiencearray.length > 0 ?
                                    languageFilter.filter((exp) => {
                                        return parseFloat(exp.experience) >= parseFloat(minexpvalue)
                                    }) : languageFilter
                                if (ratingarray.length > 0) {
                                    const minexpvalue = Math.min(...ratingarray)
                                    const ratingfilter = experiencearray.length > 0 ?
                                        experiencefilter.filter((rat) => {
                                            return parseFloat(rat.rating) >= parseFloat(minexpvalue)
                                        }) : experiencefilter

                                    res.status(200).json({
                                        msg: 'Success List',
                                        result: ratingfilter.filter(el => {
                                            return el.save_status == "published"
                                        }),
                                        postSize: ratingfilter.filter(el => {
                                            return el.save_status == "published"
                                        }).length,
                                        filter: 'language & cat & exp &  rating'

                                    })
                                }
                                else {
                                    res.status(200).json({
                                        msg: 'Success List',
                                        result: experiencefilter.filter(el => {
                                            return el.save_status == "published"
                                        }),
                                        postSize: experiencefilter.filter(el => {
                                            return el.save_status == "published"
                                        }).length,
                                        filter: 'language & cat & exp'

                                    })
                                }
                            }
                            else {
                                res.status(200).json({
                                    msg: 'Success List',
                                    result: languageFilter.filter(el => {
                                        return el.save_status == "published"
                                    }),
                                    postSize: languageFilter.filter(el => {
                                        return el.save_status == "published"
                                    }).length,
                                    filter: 'language & cat'

                                })
                            }


                        }
                        else {
                            res.status(200).json({
                                msg: 'Success List',
                                result: categoryfilter.filter(el => {
                                    return el.save_status == "published"
                                }),
                                postSize: categoryfilter.filter(el => {
                                    return el.save_status == "published"
                                }).length,
                                filter: 'language'


                            })
                        }

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
                            filter: 'caa rate'


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
                        filter: ''


                    })
                }



            }


            db.close();
        });
    });

});

// filter video call astrologer List

router.post('/filter_video_astrologer_list', (req, res, next) => {
    let order = req.body.order ? req.body.order : "desc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "$_id";
    const skip = parseInt(req.body.skip);
    const limit = parseInt(req.body.limit);
    const lowerPrice = req.body.lowerPrice;
    const hightPrice = req.body.hightPrice;
    const astrologer_name = req.body.astrologer_name;
    const searchtext = req.body.searchtext;
    const categoryarray = req.body.categoryarray;
    const languagearray = req.body.languagearray;
    const experiencearray = req.body.experiencearray;
    const ratingarray = req.body.ratingarray;
    // const experiencearray = req.body.experiencearray

    MongoClient.connect(database.dbConnection, { useUnifiedTopology: true }, function (err, db) {
        if (err) throw err;
        var dbo = db.db("astrology");
        dbo.collection("astrologers").aggregate([
            { "$addFields": { "userId": { "$toString": "$_id" } } }, { $skip: skip }, { $limit: limit },


            // { 
            //     $match: { 
            //              name: { $eq: searchtext } 
            //     } 
            // },




            {

                $lookup: {
                    from: "astrologer_languages",
                    localField: "userId",
                    foreignField: "astrologer_id",
                    as: "astrologerlanguages"
                },

            },

            {
                $lookup: {
                    from: "astrologer_prices",
                    localField: "userId",
                    foreignField: "astrologer_id",
                    as: "astrologerprices"
                },
            },
            { "$addFields": { "userId": { "$toString": "$_id" } } },

            {

                $lookup: {
                    from: "astrologer_languages",
                    localField: "userId",
                    foreignField: "astrologer_id",
                    as: "astrologerlanguages"
                },

            },
            // {   $unwind: "$astrologerprices" },
            // { $text: { $search: searchtext } },

            // { 
            //     $match: { 
            //          astrologerprices: { $elemMatch: {call_sell_price:{ $gte: lowerPrice, $lt: hightPrice} } } 

            //         // $or: [
            //         //     { $text: { $search: searchtext } }
            //         //                  { name: { $eq: astrologer_name} }, 
            //         //                  { 'astrologerprices.call_sell_price': { $gt: '0' } }
            //         //              ]
            //         //  "astrologerprices.call_sell_price": "15"
            //     } 
            // },



            {
                "$project": {
                    "name": 1, "experience": 1, "rating": 1, "image": 1, "image_path": 1, "save_status": 1,
                    "call_sell_price": { "$arrayElemAt": ["$astrologerprices.call_sell_price", 0] },
                    "chat_sell_price": { "$arrayElemAt": ["$astrologerprices.chat_sell_price", 0] },
                    "dolar_call_sell_price": { "$arrayElemAt": ["$astrologerprices.dolar_call_sell_price", 0] },
                    "dolar_chat_sell_price": { "$arrayElemAt": ["$astrologerprices.dolar_chat_sell_price", 0] },
                    "dolar_video_sell_price": { "$arrayElemAt": ["$astrologerprices.dolar_video_sell_price", 0] },
                    "video_sell_price": { "$arrayElemAt": ["$astrologerprices.video_sell_price", 0] },
                    "call_minut": { "$arrayElemAt": ["$astrologerprices.call_minut", 0] },
                    "chat_minut": { "$arrayElemAt": ["$astrologerprices.chat_minut", 0] },
                    "video_minut": { "$arrayElemAt": ["$astrologerprices.video_minut", 0] },
                    language_id: "$astrologerlanguages.language_id",
                    astrologersubcat: "$astrologersubcat.name"
                }
            },
            {
                $lookup: {
                    from: "subcategories",
                    localField: "userId",
                    foreignField: "astrologer_id",
                    as: "astrologersubcat"
                },
            },
            { "$addFields": { "userId": { "$toString": "$_id" } } },

            {
                $lookup: {
                    from: "astrologer_categories",
                    localField: "userId",
                    foreignField: "astrologer_id",
                    as: "astrologercat"
                },
            },
            //  { astrologerprices: { $elemMatch: {call_sell_price:{ $gt: lowerPrice, $lt: hightPrice} } } },





        ]).toArray(function (err, result) {
            if (err) {
                res.status(400).json({
                    msg: 'Something Error',
                    err: err
                })
            }
            else {
                // price filter //


                result.forEach(ele => {
                    ele.languageList = [];
                    ele.language_id.forEach(lngid => {
                        ele.astrologersubcat.forEach(el => {
                            if (lngid == el._id) {
                                ele.languageList.push(el.name)
                            }
                        })
                    });
                })
                result.forEach(ele => {
                    ele.astrocategorylist = [];
                    ele.astrologercat.forEach(lngid => {
                        ele.astrologersubcat.forEach(el => {
                            if (lngid.category_id == el._id) {
                                ele.astrocategorylist.push(el.name)
                            }
                        })
                    });
                })
                result.forEach(ele => {
                    delete ele.astrologersubcat
                        &&
                        delete ele.language_id
                        && delete ele.userId
                        && delete ele.astrologercat
                })
                if ((hightPrice != undefined && lowerPrice != undefined)) {
                    const data = result.filter((o) => {
                        return parseInt(o.call_sell_price) <= parseInt(hightPrice) && parseInt(o.call_sell_price) >= parseInt(lowerPrice)
                    })
                    if (categoryarray.length > 0 || languagearray.length > 0 || experiencearray.length > 0 || ratingarray > 0) {

                        const categoryfilter = categoryarray.length > 0 ?
                            (data.filter((el) => {
                                return categoryarray.some(r => el.astrocategorylist.indexOf(r) >= 0)
                            })) : data

                        if (languagearray.length > 0 || experiencearray.length > 0 || ratingarray > 0) {
                            const languageFilter = languagearray.length > 0 ?
                                categoryfilter.filter((ele) => {
                                    return languagearray.some(i => ele.languageList.indexOf(i) >= 0)
                                }) : categoryfilter
                            if (experiencearray.length > 0 || ratingarray > 0) {
                                const minexpvalue = Math.min(...experiencearray)
                                const experiencefilter = experiencearray.length > 0 ?
                                    languageFilter.filter((exp) => {
                                        return parseFloat(exp.experience) >= parseFloat(minexpvalue)
                                    }) : languageFilter
                                if (ratingarray.length > 0) {
                                    const minexpvalue = Math.min(...ratingarray)
                                    const ratingfilter = experiencearray.length > 0 ?
                                        experiencefilter.filter((rat) => {
                                            return parseFloat(rat.rating) >= parseFloat(minexpvalue)
                                        }) : experiencefilter

                                    res.status(200).json({
                                        msg: 'Success List',
                                        result: ratingfilter.filter(el => {
                                            return el.save_status == "published" && el.video_sell_price != null
                                        }),
                                        postSize: ratingfilter.filter(el => {
                                            return el.save_status == "published"
                                        }).length,
                                        filter: 'language & cat & exp &  rating'

                                    })
                                }
                                else {
                                    res.status(200).json({
                                        msg: 'Success List',
                                        result: experiencefilter.filter(el => {
                                            return el.save_status == "published" && el.video_sell_price != null
                                        }),
                                        postSize: experiencefilter.filter(el => {
                                            return el.save_status == "published" && el.video_sell_price != null
                                        }).length,
                                        filter: 'language & cat & exp'

                                    })
                                }
                            }
                            else {
                                res.status(200).json({
                                    msg: 'Success List',
                                    result: languageFilter.filter(el => {
                                        return el.save_status == "published" && el.video_sell_price != null
                                    }),
                                    postSize: languageFilter.filter(el => {
                                        return el.save_status == "published" && el.video_sell_price != null
                                    }).length,
                                    filter: 'language & cat'

                                })
                            }


                        }
                        else {
                            res.status(200).json({
                                msg: 'Success List',
                                result: categoryfilter.filter(el => {
                                    return el.save_status == "published" && el.video_sell_price != null
                                }),
                                postSize: categoryfilter.filter(el => {
                                    return el.save_status == "published" && el.video_sell_price != null
                                }).length,
                                filter: 'language'


                            })
                        }

                    }
                    else {
                        res.status(200).json({
                            msg: 'Success List',
                            result: data.filter(el => {
                                return el.save_status == "published" && el.video_sell_price != null
                            }),
                            postSize: data.filter(el => {
                                return el.save_status == "published" && el.video_sell_price != null
                            }).length,
                            filter: 'caa rate'


                        })

                    }

                }

                else {
                    res.status(200).json({
                        msg: 'Success List',
                        result: result.filter(el => {
                            return el.save_status == "published" && el.video_sell_price != null
                        }),
                        postSize: result.filter(el => {
                            return el.save_status == "published" && el.video_sell_price != null
                        }).length,
                        filter: ''


                    })
                }



            }


            db.close();
        });
    });

});


module.exports = router;