const express = require('express');
const router = express.Router();
const EstoreDispatchUser = require('../services/estoreDispatchUser');
const estore_UserDispatch = require('../models/estoreDispatch_user');
const shortid = require('shortid');




router.post('/findestoredisptachUser/:id', async (req, res, next) => {
    try {
        estore_User.find({ user_id: req.params.id })
            .exec()
            .then(user => {
                if (user.length < 1) {
                    // console.log(user)
                    res.json({
                        msg: 'Estore_User Not Found'
                    })
                }
                else {
                    res.json({
                        msg: 'Estore_User Found',
                        user: user
                    })
                }
            })

    } catch (err) {
        console.log(err);
        res.status(400).send({ err });
    }
});


router.post('/createestoreDispatch_user', async (req, res, next) => {
    try {
        const user_id = req.body.user_id;
        const name = req.body.name;
        const streetAddress = req.body.streetAddress;
        const city = req.body.city;
        const landmark = req.body.landmark;
        const pincode = req.body.pincode;
        const phone = req.body.phone;
        const totalproductPrice = req.body.totalproductPrice;
        const cartProduct = req.body.cartProduct;
        const status= req.body.status;
        var currentOrderID=shortid.generate();


        await EstoreDispatchUser.postEstore_user({
            user_id, name, streetAddress, city, landmark, pincode, phone, totalproductPrice, cartProduct,status,
            currentOrderID
        });
        res.send({ msg: 'estoreDispatch Detail create ...!',
        currentOrderID:currentOrderID
       });
    } catch (err) {
        console.log(err);
        res.status(400).send({ err });
        // return next(err);
    }
});

router.post('/findestoreOrderDetailByCurrentOrderId', async (req, res, next) => {
    const   currentOrderID=req.body.currentOrderID
    console.log(currentOrderID)
      try {
        estore_UserDispatch.find({ currentOrderID: currentOrderID })
              .exec()
              .then(orderDetail => {
                  if (orderDetail.length < 1) {
                      // console.log(user)
                      res.json({
                          msg: 'order Not Found by currentOrderId !'
                      })
                  }
                  else {
                      res.json({
                          msg: 'order Found by currentOrderId !',
                          success_msg:'Your order has been placed successfully!',
                          orderDetail: orderDetail
                      })
                  }
              })
  
      } catch (err) {
          console.log(err);
          res.status(400).send({ err });
      }
  });

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