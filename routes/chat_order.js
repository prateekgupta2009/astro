const express = require('express');
const router = express.Router();
const estore_addonsService = require('../services/estore_addons');
const Chat_order = require('../models/chatOrder');
const database = require('../config/database')
var randomize = require('randomatic');
var ObjectId = require('mongodb').ObjectId;
var MongoClient = require('mongodb').MongoClient;



router.post('/create_chat_order', async (req, res, next) => {

    try {
        const data = {
            user_id: req.body.user_id,
            astrologer_id: req.body.astrologer_id,
            chat_orderid: randomize('0000'),
            chatRate:req.body.chatRate
        }
        if (data.user_id === '' || data.astrologer_id === '' || data.chat_orderid === '') {
            res.send({
                msg: 'Responnse Data Empty'
            })
        }
        else {
            MongoClient.connect(database.dbConnection, function (err, db) {
                if (err) throw err;
                var dbo = db.db("astrology");
                dbo.collection("astrologers").find({ "_id":ObjectId(data.astrologer_id) }, { useUnifiedTopology: true })
                    .toArray(function (err, result) {
                        if (err) {
                            res.json({
                                msg:'Something Error',
                                result: err
                            })
                            console.log(err)
                        }
                        else {

                            console.log(result);
                            const astrologer_name=result[0].name;
                            const chatorderdata={
                                user_id: req.body.user_id,
                                astrologer_id: req.body.astrologer_id,
                                chat_orderid: randomize('0000'),
                                astrologer_name:astrologer_name,
                                chatdate:req.body.chatdate,
                                chatRate:req.body.chatRate
                            }
                            Chat_order.create(
                                chatorderdata
                            ).then(result => {
                                //   console.log(result)
                                res.send({
                                    msg: 'create Chat order',
                                    result: result
                                })
                            })
                                .catch(err => {
                                    console.log(err)
                                    res.send({
                                        msg: 'Invalid Response',
                                        err: err,
                                        reult: data
                                    })
                                })

                        }
                        db.close();

                        
                    });
            });
            
        }
    }
    catch (err) {
        console.log(err);
        res.send({
            msg: 'Invalid Response'
        })
    }

})

router.post('/chat_orderUpdate', async (req, res, next) => {

    try {
        Chat_order.findOneAndUpdate({ user_id: req.body.user_id, chat_orderid: req.body.chat_orderid }, {
            $inc: { chatprice: parseInt(req.body.chatprice), chattiming: parseInt(req.body.chattiming) },
            // $inc: { chattiming:parseInt(req.body.chattiming)}
        }, { new: true }, function (err, doc) {
            if (err) {
                res.send({
                    msg: 'Not Update Bal',
                    err: err
                })
            }
            else {
                res.status(200).send({
                    msg: 'chat order  Updated',
                    result: doc
                })
            }
        });
    }
    catch (err) {
        res.send({
            msg: 'Invvalid Response',
            err: err
        })

    }


})
// find chat order by userid

router.post('/findchatorderbyuserid', async (req, res, next) => {
    try {
        const user_id = req.body.user_id
        Chat_order.find({ user_id: user_id })
            .exec()
            .then(userdata => {
                if (userdata < 1) {
                    res.json({
                        msg: 'Order is Empty'
                    })
                }
                else {
                    res.status(200).json({
                        msg: 'Chat Order Find',
                        chatorder: userdata
                    })
                }
            })
    }
    catch (err) {
        res.send({
            msg: 'Invalid Response',
            err: err
        })
    }
})

// find chat by astrologerid
router.post('/findchatorderbyastrologerid', async (req, res, next) => {
    try {
        const astrologer_id = req.body.astrologer_id
        Chat_order.find({ astrologer_id: astrologer_id })
            .exec()
            .then(userdata => {
                if (userdata < 1) {
                    res.json({
                        msg: 'Order is Empty'
                    })
                }
                else {
                    res.status(200).json({
                        msg: 'Chat Order Find',
                        chatorder: userdata
                    })
                }
            })
    }
    catch (err) {
        res.send({
            msg: 'Invalid Response',
            err: err
        })
    }
})


module.exports = router;
