const express = require('express');
const router = express.Router();
const userDispatchAddService = require('../services/userDispatchAdd');
const UserDispatchAdd = require('../models/userdispathAdd');
var ObjectId = require('mongodb').ObjectId;
var vcxroom = require('../services/vcxroom');
var basicAuth = require('basic-auth');
const shortid = require('shortid');
var randomize = require('randomatic');






// Application Server Route Definitions - These functions communicate with EnableX Server API
// Route: To get liist of all Rooms in your Application

router.get('/get-all-rooms', function (req, res) {

    vcxroom.getAllRooms(function (data) {
        res.status(200);
        res.send(data);
    });
});


// Route: To get information of a given room.

router.get('/get-room/:roomName', function (req, res) {
    var room = req.params.roomName;
    vcxroom.getRoom(room, function (status,data) {
        res.status(200);
        res.send(data);
        console.log(data)
    });
});


// Route: To get Token for a Room

router.post('/create-token/', function (req, res) {
   const dataroom= { 
    name: req.body.name,
  role: req.body.role,
  user_ref: randomize('000000'),
  room_id: req.body.room_id 
}
console.log(dataroom);
    vcxroom.getToken(dataroom, function (status,data) {
        res.status(200);
        res.send({data,
        msg:'create token...'});
    });
});


router.post('/create-room/', function (req, res) {
    var user = basicAuth(req);
    // if(vcxutil.validAuthInvite(user, basic)){ // Here you need some logic to validate authentication
        vcxroom.createRoom(function (status, data) {
            res.send({
                data:data,
                msg:'create room success'
            });
            res.status(200);
        });
   // } 
    // else {
    //     res.set({
    //         'WWW-Authenticate': 'Basic realm="simple-admin"'
    //     }).send(401);
    // }
});
// find room detail by room id
router.post('/findroomdetailbyroomid',function(req,res){
    const detail={
        room_id:req.body.room_id
    }
    vcxroom.getroomdetail(detail,function(status,data){
        res.status(200).send({
            data:data,
            msg:'detail find success'
        })
    })
})
module.exports = router;
