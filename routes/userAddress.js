const express = require('express');
const router = express.Router();
const UserAddressService = require('../services/userAddress');
const User_Address = require('../models/userAddress');
const shortid = require('shortid');




router.post('/findUserAddress/:id', async (req, res, next) => {
    try {
        User_Address.find({ user_id: req.params.id })
            .exec()
            .then(user => {
                if (user.length < 1) {
                    // console.log(user)
                    res.json({
                        msg: 'User Address Not Found'
                    })
                }
                else {
                    res.json({
                        msg: 'UserAddress Found',
                        user: user
                    })
                }
            })

    } catch (err) {
        console.log(err);
        res.status(400).send({ err });
    }
});


router.post('/createUserAddress', async (req, res, next) => {
    try {
        const user_id = req.body.user_id;
        const name = req.body.name;
        const streetAddress = req.body.streetAddress;
        const city = req.body.city;
        const landmark = req.body.landmark;
        const pincode = req.body.pincode;
        const phone = req.body.phone;
        await UserAddressService.postEstore_user({
            user_id, name, streetAddress, city, landmark, pincode, phone
            
        });
        res.send({ msg: 'User Address create ...!',
       });
    } catch (err) {
        console.log(err);
        res.status(400).send({ err });
        // return next(err);
    }
});

router.post('/adduseraddress',async (req,res,next)=>{
    try{

        const user_id=req.body.user_id;
        const name=req.body.name;
        const streetAddress=req.body.streetAddress;
        const city=req.body.city;
        const  landmark=req.body.landmark;
        const  pincode=req.body.pincode;
        const  phone=req.body.phone;
        const  totalproductPrice=req.body.totalproductPrice;

        await UserAddressService.addUser_Address({
            user_id,name,streetAddress,city,landmark,pincode,phone,totalproductPrice
        });
        res.json({ msg: ' User_Address added ...!' });
    }
    catch (err) {
        res.status(400).send( err +'value is not defined' );
    }
});

router.put('/update')

// router.post('/findestoreOrderDetailByCurrentOrderId', async (req, res, next) => {
//     const   currentOrderID=req.body.currentOrderID
//     console.log(currentOrderID)
//       try {
//         estore_UserDispatch.find({ currentOrderID: currentOrderID })
//               .exec()
//               .then(orderDetail => {
//                   if (orderDetail.length < 1) {
//                       // console.log(user)
//                       res.json({
//                           msg: 'order Not Found by currentOrderId !'
//                       })
//                   }
//                   else {
//                       res.json({
//                           msg: 'order Found by currentOrderId !',
//                           success_msg:'Your order has been placed successfully!',
//                           orderDetail: orderDetail
//                       })
//                   }
//               })
  
//       } catch (err) {
//           console.log(err);
//           res.status(400).send({ err });
//       }
//   });

// router.post('/addestoreDispatchUser',async (req,res,next)=>{
//     try{

//         const user_id=req.body.user_id;
//         const name=req.body.name;
//         const streetAddress=req.body.streetAddress;
//         const city=req.body.city;
//         const  landmark=req.body.landmark;
//         const  pincode=req.body.pincode;
//         const  phone=req.body.phone;
//         const  totalproductPrice=req.body.totalproductPrice;
//         const   cartProduct=req.body.cartProduct;

//         await EstoreUserUserService.add_estore_user({
//             user_id,name,streetAddress,city,landmark,pincode,phone,totalproductPrice,cartProduct
//         });
//         res.json({ msg: ' Estore_user added ...!' });
//     }
//     catch (err) {
//         res.status(400).send( err +'value is not defined' );
//     }
// })

module.exports = router;