const express = require('express');
const router = express.Router();
var jwt = require('jsonwebtoken');
const database = require('../config/database')
const mongodb = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;



router.get('/create_astrologer_detail', (req, res, next) => {

    MongoClient.connect(database.dbConnection, function (err, db) {
        if (err) throw err;
        var dbo = db.db("astrology");
        dbo.collection("astrologers").find({}).toArray(function (err, result) {
            if (err) {
                console.log(err)
            };
            res.json({
                resultdata: result

            }
            )
            db.close();
        });
    });
});

router.get('/find_astrologer_detail', (req, res, next) => {

    MongoClient.connect(database.dbConnection, { useUnifiedTopology: true }, function (err, db) {
        if (err) throw err;
        var dbo = db.db("astrology");
        dbo.collection("astrologers").aggregate([

            { "$addFields": { "userId": { "$toString": "$_id" } } },

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
            {
                $lookup: {
                    from: "astrologer_categories",
                    localField: "userId",
                    foreignField: "astrologer_id",
                    as: "astrologercategories"


                },
            }

        ]).toArray(function (err, result) {
            if (err) {
                res.status(400).json({
                    msg: 'Something Error'
                })
            }
            res.status(200).json({
                msg: 'Success List',
                result: result
            })
            // result.forEach(ele=>console.log(ele.astrologercategories[0].category_id));


            db.close();
        });
    });

});


router.get('/find_astrologer_list', (req, res, next) => {

    MongoClient.connect(database.dbConnection, { useUnifiedTopology: true }, function (err, db) {
        if (err) throw err;
        var dbo = db.db("astrology");
        dbo.collection("astrologers").aggregate([
            { "$addFields": { "userId": { "$toString": "$_id" } } },

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

        ]).toArray(function (err, result) {
            if (err) {
                res.status(400).json({
                    msg: 'Something Error'
                })
            }
            else {
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
                res.status(200).json({
                    msg: 'Success List',
                    result: result.filter(el => {
                        return el.save_status == "published"
                    })

                })
            }


            db.close();
        });
    });

});

// new astrologer fetch list by api

router.post('/fetch_astrologer_list', (req, res, next) => {
    let order = req.body.order ? req.body.order : "desc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "$_id";
    const skip=parseInt(req.body.skip);
    const limit=parseInt(req.body.limit);

    MongoClient.connect(database.dbConnection, { useUnifiedTopology: true }, function (err, db) {
        if (err) throw err;
        var dbo = db.db("astrology");
        dbo.collection("astrologers").aggregate([{ $skip : skip },{ $limit : limit },
            { "$addFields": { "userId": { "$toString": "$_id" } } },
            

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

        ]).toArray(function (err, result) {
            if (err) {
                res.status(400).json({
                    msg: 'Something Error'
                })
            }
            else {
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
                res.status(200).json({
                    msg: 'Success List',
                    result: result.filter(el => {
                        return el.save_status == "published"
                    }),
                    postSize:result.filter(el => {
                        return el.save_status == "published"
                    }).length

                })
            }


            db.close();
        });
    });

});

router.post('/find_astrologer_detailby_id/:id', (req, res, next) => {
    console.log('detail')

    MongoClient.connect(database.dbConnection, { useUnifiedTopology: true }, function (err, db) {
        if (err) throw err;
        var dbo = db.db("astrology");
        dbo.collection("astrologers").aggregate([
            { "$addFields": { "userId": { "$toString": "$_id" } } },


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

            {
                "$project": {
                    "name": 1, "experience": 1, "rating": 1, "image": 1, "image_path": 1, "save_status": 1, "city_id": 1, "about_us": 1,
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
            // { "$addFields": { "userId": { "$toString": "$_id" } } },
            { "$addFields": { "userId": { "$toString": "$_id" } } },

            {
                $lookup: {
                    from: "astrologer_time_availabilities",
                    localField: "userId",
                    foreignField: "astrologer_id",
                    as: "astrologertimetable"
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


        ]).toArray(function (err, result) {
            if (err) {
                res.status(400).json({
                    msg: 'Something Error'
                })
            }
            else {
                result.forEach(ele => {
                    ele.languageList = [];
                    ele.language_id.forEach(lngid => {
                        ele.astrologersubcat.forEach(el => {
                            // console.log(lngid)
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
                //    result.forEach((ele,index) => {
                //         ele.timetablelist=[]
                //         // ele.astrologertimetable.filter(el=>{
                //         //     return  ele._id==el.astrologer_id
                //         // })
                //         ele.astrologertimetable.forEach(lngid => {

                //                 if( lngid.astrologer_id==ele._id){
                //                     ele.timetablelist.push(JSON.stringify.ele)
                //                 }
                //         });
                //    })
                result.forEach(ele => {
                    delete ele.astrologersubcat
                        && delete ele.language_id
                        && delete ele.userId
                        && delete ele.astrologercat
                    //  && delete ele.astrologertimetable
                })

                res.status(200).json({
                    msg: 'Success List',
                    result: result.filter(el => {
                        return el.save_status == "published" && el._id == req.params.id
                    })

                })
            }


            db.close();
        });
    });

});

// find_astrologer_Filter_list
router.post('/find_astrologer_Filter_list', (req, res, next) => {

     console.log(req.body)
    const category = req.body.category;
    const experience = req.body.experience;
    const rating = req.body.rating;
    const language = req.body.language
    const callData=req.body.callData
    const chatData= req.body.chatData
    const maxprice=req.body.maxprice
    const minprice=req.body.minprice

    // const category=["Zodiac"]
    // console.log(mapdata)


    MongoClient.connect(database.dbConnection, { useUnifiedTopology: true }, function (err, db) {
        if (err) throw err;
        var dbo = db.db("astrology");
        dbo.collection("astrologers").aggregate([
            { "$addFields": { "userId": { "$toString": "$_id" } } },

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

        ]).toArray(function (err, result) {
            if (err) {
                res.status(400).json({
                    msg: 'Something Error'
                })
            }
            else {
               
                result.forEach(ele => {
                    ele.languageList = []
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
                result.filter((el) => {
                    return el.astrocategorylist.forEach(ele => {
                        category.forEach(item => {
                            if (ele === item) {
                                el.catfilter = true
                            }
                            // console.log(ele===item)
                        })


                    })
                })
                const data = result
                    .filter(el => {
                        return el.catfilter === true
                        //&& el.langfilter===true
                    })
                data.filter((el) => {
                    return el.languageList.forEach(ele => {
                        language.forEach(item => {
                            if (ele === item) {
                                el.lanfilter = true
                            }
                        })
                    })
                })
                const lanfilterdata = data
                    .filter(el => {
                        return el.lanfilter === true
                        //&& el.langfilter===true
                    })

                const expfilterdata = lanfilterdata.filter(el => {
                    return (parseInt(el.experience) >= (Math.min.apply(Math, experience)) - 9 && parseInt(el.experience) <= Math.max.apply(Math, experience))
                })
                const ratingfilterdata = expfilterdata.filter(el => {
                    return parseFloat(el.rating) >= (Math.min.apply(Math, rating)) && parseFloat(el.rating) <= Math.max.apply(Math, rating)
                })

                const pricefilter=ratingfilterdata.filter(el=>{
                  return   parseInt(el.chat_sell_price)>=minprice && parseInt(el.chat_sell_price)<=maxprice && el.chat_sell_price !==null
                })
                console.log(ratingfilterdata)

                const finalfilter = pricefilter
                    .filter(el => {
                        return el.save_status == "published" 
                    })
                // console.log(finalfilter)
                if (finalfilter.length === 0) {
                    res.status(200).json({
                        msg: 'Success List',
                        result: 'data not found'

                    })
                }
                else {
                    res.status(200).json({
                        msg: 'Success List',
                        result: finalfilter

                    })
                }
            }
            db.close();
        });
    });

});

// list video call astrologer 

router.get('/find_videocall_astrologer_list', (req, res, next) => {

    MongoClient.connect(database.dbConnection, { useUnifiedTopology: true }, function (err, db) {
        if (err) throw err;
        var dbo = db.db("astrology");
        dbo.collection("astrologers").aggregate([
            { "$addFields": { "userId": { "$toString": "$_id" } } },

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


            {
                "$project": {
                    "name": 1, "experience": 1, "rating": 1, "image": 1, "image_path": 1, "save_status": 1,
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

        ]).toArray(function (err, result) {
            if (err) {
                res.status(400).json({
                    msg: 'Something Error'
                })
            }
            else {
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
                const dataresult=result.filter(el => {
                    return el.save_status == "published" && el.video_sell_price != null
                })
                res.status(200).json({
                    msg: 'Success List',
                    result: dataresult,
                    postSize:dataresult.length

                })
            }


            db.close();
        });
    });

});

//new  find video astrologer list 

router.post('/fetch_videocall_astrologer_list', (req, res, next) => {
    let order = req.body.order ? req.body.order : "desc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "$_id";
    const skip=parseInt(req.body.skip);
    const limit=parseInt(req.body.limit);

    MongoClient.connect(database.dbConnection, { useUnifiedTopology: true }, function (err, db) {
        if (err) throw err;
        var dbo = db.db("astrology");
        dbo.collection("astrologers").aggregate([{ $skip : skip },{ $limit : limit },
            { "$addFields": { "userId": { "$toString": "$_id" } } },

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


            {
                "$project": {
                    "name": 1, "experience": 1, "rating": 1, "image": 1, "image_path": 1, "save_status": 1,
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

        ]).toArray(function (err, result) {
            if (err) {
                res.status(400).json({
                    msg: 'Something Error'
                })
            }
            else {
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
                const dataresult=result.filter(el => {
                    return el.save_status == "published" && el.video_sell_price != null
                })
                res.status(200).json({
       
                    msg: 'Success List',
                    result: dataresult,
                    postSize:dataresult.length

                })
            }


            db.close();
        });
    });

});

// find video call astrologer detail by astrologer id


router.post('/find_videocall_astrologer_detailby_id/:id', (req, res, next) => {

    MongoClient.connect(database.dbConnection, { useUnifiedTopology: true }, function (err, db) {
        if (err) throw err;
        var dbo = db.db("astrology");
        dbo.collection("astrologers").aggregate([
            { "$addFields": { "userId": { "$toString": "$_id" } } },

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

            {
                "$project": {
                    "name": 1, "experience": 1, "rating": 1, "image": 1, "image_path": 1, "save_status": 1, "city_id": 1, "about_us": 1,
                    "dolar_video_sell_price": { "$arrayElemAt": ["$astrologerprices.dolar_video_sell_price", 0] },
                    "video_sell_price": { "$arrayElemAt": ["$astrologerprices.video_sell_price", 0] },
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
                    from: "astrologer_time_availabilities",
                    localField: "userId",
                    foreignField: "astrologer_id",
                    as: "astrologertimetable"
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
        ]).toArray(function (err, result) {
            if (err) {
                res.status(400).json({
                    msg: 'Something Error'
                })
            }
            else {
                result.forEach(ele => {
                    ele.languageList = [];
                    ele.language_id.forEach(lngid => {
                        ele.astrologersubcat.forEach(el => {
                            // console.log(lngid)
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
                        && delete ele.language_id
                        && delete ele.userId
                        && delete ele.astrologercat

                })
                const resultdata = result.filter(el => {
                    return el.save_status == "published" && el._id == req.params.id && el.video_sell_price != null
                })
                if (resultdata.length === 0) {
                    res.status(200).json({
                        msg: 'Success List',

                        result: 'Astrologer Not found'

                    })
                }
                else {
                    res.status(200).json({
                        msg: 'Success List',

                        result: resultdata

                    })
                }
            }


            db.close();
        });
    });

});

// astrologer filter api

// router.post('/filter_astrologer_list', (req, res, next) => {
//     let order = req.body.order ? req.body.order : "desc";
//     let sortBy = req.body.sortBy ? req.body.sortBy : "$_id";
//     const skip=parseInt(req.body.skip);
//     const limit=parseInt(req.body.limit);
//     const lowerPrice=req.body.lowerPrice;
//     const hightPrice = req.body.hightPrice;
//     const astrologer_name=req.body.astrologer_name;
//     const searchtext = req.body.searchtext;

//     MongoClient.connect(database.dbConnection, { useUnifiedTopology: true }, function (err, db) {
//         if (err) throw err;
//         var dbo = db.db("astrology");
//         dbo.collection("astrologers").aggregate([
//             { "$addFields": { "userId": { "$toString": "$_id" } } },{ $skip : skip },{ $limit : limit },


//             { 
//                 $match: { 
//                          name: { $eq: searchtext } 
//                 } 
//             },
            
          

//             // { astrologerprices: { $elemMatch: {call_sell_price:{ $gte: lowerPrice, $lt: hightPrice} } } },

//             {

//                 $lookup: {
//                     from: "astrologer_languages",
//                     localField: "userId",
//                     foreignField: "astrologer_id",
//                     as: "astrologerlanguages"
//                 },

//             },
           
//             {
//                 $lookup: {
//                     from: "astrologer_prices",
//                     localField: "userId",
//                     foreignField: "astrologer_id",
//                     as: "astrologerprices"
//                 },
//             },
//             { "$addFields": { "userId": { "$toString": "$_id" } } },

//             {

//                 $lookup: {
//                     from: "astrologer_languages",
//                     localField: "userId",
//                     foreignField: "astrologer_id",
//                     as: "astrologerlanguages"
//                 },

//             },
//             // {   $unwind: "$astrologerprices" },
//             // { $text: { $search: searchtext } },

//             // { 
//             //     $match: { 
//             //         $or: [
//             //             { $text: { $search: searchtext } }
//             //                         //  { name: { $eq: astrologer_name} }, 
//             //                         //  { 'astrologerprices.call_sell_price': { $gt: '0' } }
//             //                      ]
//             //         //  "astrologerprices.call_sell_price": "15"
//             //     } 
//             // },


//             {
//                 "$project": {
//                     "name": 1, "experience": 1, "rating": 1, "image": 1, "image_path": 1, "save_status": 1,
//                     "call_sell_price": { "$arrayElemAt": ["$astrologerprices.call_sell_price", 0] },
//                     "chat_sell_price": { "$arrayElemAt": ["$astrologerprices.chat_sell_price", 0] },
//                     "dolar_call_sell_price": { "$arrayElemAt": ["$astrologerprices.dolar_call_sell_price", 0] },
//                     "dolar_chat_sell_price": { "$arrayElemAt": ["$astrologerprices.dolar_chat_sell_price", 0] },
//                     "dolar_video_sell_price": { "$arrayElemAt": ["$astrologerprices.dolar_video_sell_price", 0] },
//                     "video_sell_price": { "$arrayElemAt": ["$astrologerprices.video_sell_price", 0] },
//                     "call_minut": { "$arrayElemAt": ["$astrologerprices.call_minut", 0] },
//                     "chat_minut": { "$arrayElemAt": ["$astrologerprices.chat_minut", 0] },
//                     "video_minut": { "$arrayElemAt": ["$astrologerprices.video_minut", 0] },
//                     language_id: "$astrologerlanguages.language_id",
//                     astrologersubcat: "$astrologersubcat.name"

//                 }
//             },
//             {
//                 $lookup: {
//                     from: "subcategories",
//                     localField: "userId",
//                     foreignField: "astrologer_id",
//                     as: "astrologersubcat"
//                 },
//             },
//             { "$addFields": { "userId": { "$toString": "$_id" } } },

//             {
//                 $lookup: {
//                     from: "astrologer_categories",
//                     localField: "userId",
//                     foreignField: "astrologer_id",
//                     as: "astrologercat"
//                 },
//             },




//         ]).toArray(function (err, result) {
//             if (err) {
//                 res.status(400).json({
//                     msg: 'Something Error',
//                     err:err
//                 })
//             }
//             else {
//                 result.forEach(ele => {
//                     ele.languageList = [];
//                     ele.language_id.forEach(lngid => {
//                         ele.astrologersubcat.forEach(el => {
//                             if (lngid == el._id) {
//                                 ele.languageList.push(el.name)
//                             }
//                         })
//                     });
//                 })
//                 result.forEach(ele => {
//                     ele.astrocategorylist = [];
//                     ele.astrologercat.forEach(lngid => {
//                         ele.astrologersubcat.forEach(el => {
//                             if (lngid.category_id == el._id) {
//                                 ele.astrocategorylist.push(el.name)
//                             }
//                         })
//                     });
//                 })
//                 result.forEach(ele => {
//                     delete ele.astrologersubcat
//                         &&
//                         delete ele.language_id
//                         && delete ele.userId
//                         && delete ele.astrologercat
//                 })
//                 res.status(200).json({
//                     msg: 'Success List',
//                     result: result.filter(el => {
//                         return el.save_status == "published"
//                     }),
//                     postSize:result.filter(el => {
//                         return el.save_status == "published"
//                     }).length

//                 })
//             }


//             db.close();
//         });
//     });

// });


module.exports = router;