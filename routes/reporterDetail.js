const express = require('express');
const router = express.Router();
var jwt = require('jsonwebtoken');
const database = require('../config/database')
const mongodb = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;



router.get('/find_reporter_list', (req, res, next) => {

    try {
        const hightolow=req.body.hightolow;
        const lowtohigh=req.body.lowtohigh;
        MongoClient.connect(database.dbConnection, function (err, db) {
            if (err) throw err;
            var dbo = db.db("astrology");
            dbo.collection("reports").find({}, { useUnifiedTopology: true })
                .toArray(function (err, result) {
                    if (err) {
                        res.json({
                            msg: 'Invalid Response',
                            err: err
                        })
                    }
                    else {
                        MongoClient.connect(database.dbConnection, function (err, db) {
                            if (err) throw err;
                            var dbo = db.db("astrology");
                            dbo.collection("report_addon_values").find({}, { useUnifiedTopology: true })
                                .toArray(function (err, addoneList) {
                                    if (err) {
                                        res.json({
                                            msg: 'Invalid Response',
                                            err: err
                                        })
                                    }
                                    else {
                                        result.forEach(ele => {
                                            ele.sample_language_name_1 = [];
                                            addoneList.forEach(el => {
                                                if (ele.sample_language_id_1 == el._id) {
                                                    ele.sample_language_name_1.push(el.name)
                                                }
                                            })
                                        })
                                        result.forEach(ele => {
                                            ele.sample_language_name_2 = [];
                                            addoneList.forEach(el => {
                                                if (ele.sample_language_id_2 == el._id) {
                                                    ele.sample_language_name_2.push(el.name)
                                                }
                                            })
                                        })
                                        result.forEach(ele => {
                                            ele.sample_language_name_3 = [];
                                            addoneList.forEach(el => {
                                                if (ele.sample_language_id_3 == el._id) {
                                                    ele.sample_language_name_3.push(el.name)
                                                }
                                            })
                                        })
                                        result.forEach(ele => {
                                            ele.sample_language_name_4 = [];
                                            addoneList.forEach(el => {
                                                if (ele.sample_language_id_4 == el._id) {
                                                    ele.sample_language_name_4.push(el.name)
                                                }
                                            })
                                        })
                                            res.json({
                                                msg: "List Find Success",
                                                result: result.filter(el=>{
                                                    return el.save_status=='published'  
                                                })
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
    catch (err) {
        res.send({
            msg: 'Error',
            err: err
        })
    }
});
router.post('/findreportdetailbyid', (req, res, next) => {
    try {
        const reportid=req.body.reportid
        MongoClient.connect(database.dbConnection, function (err, db) {
            if (err) throw err;
            var dbo = db.db("astrology");
            dbo.collection("reports").find({}, { useUnifiedTopology: true })
                .toArray(function (err, result) {
                    if (err) {
                        res.json({
                            msg: 'Invalid Response',
                            err: err
                        })
                    }
                    else {
                        MongoClient.connect(database.dbConnection, function (err, db) {
                            if (err) throw err;
                            var dbo = db.db("astrology");
                            dbo.collection("report_addon_values").find({}, { useUnifiedTopology: true })
                                .toArray(function (err, addoneList) {
                                    if (err) {
                                        res.json({
                                            msg: 'Invalid Response',
                                            err: err
                                        })
                                    }
                                    else {
                                        result.forEach(ele => {
                                            ele.sample_language_name_1 = [];
                                            addoneList.forEach(el => {
                                                if (ele.sample_language_id_1 == el._id) {
                                                    ele.sample_language_name_1.push(el.name)
                                                }
                                            })
                                        })
                                        result.forEach(ele => {
                                            ele.sample_language_name_2 = [];
                                            addoneList.forEach(el => {
                                                if (ele.sample_language_id_2 == el._id) {
                                                    ele.sample_language_name_2.push(el.name)
                                                }
                                            })
                                        })
                                        result.forEach(ele => {
                                            ele.sample_language_name_3 = [];
                                            addoneList.forEach(el => {
                                                if (ele.sample_language_id_3 == el._id) {
                                                    ele.sample_language_name_3.push(el.name)
                                                }
                                            })
                                        })
                                        result.forEach(ele => {
                                            ele.sample_language_name_4 = [];
                                            addoneList.forEach(el => {
                                                if (ele.sample_language_id_4 == el._id) {
                                                    ele.sample_language_name_4.push(el.name)
                                                }
                                            })
                                        })
                                        res.json({
                                            msg: "List Find Success",
                                            result: result.filter(el=>{
                                                return el.save_status=='published'  && el._id==reportid
                                            })                                
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
    catch (err) {
        res.send({
            msg: 'Error',
            err: err
        })
    }
});

module.exports = router;

