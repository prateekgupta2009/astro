const express = require('express');
const router = express.Router();
const OnlineBookPujaUserService = require('../services/onlinePujaBookUser');
const onlinePujaBookUser = require('../models/onlinePujaBookUser');
const shortid = require('shortid');



router.post('/findonlineBookUser/:id', async (req, res, next) => {
    try {
        onlinePujaBookUser.find({ user_id: req.params.id })
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


router.post('/findOrderDetailByCurrentOrderId', async (req, res, next) => {
    const currentOrderID = req.body.currentOrderID
    console.log(currentOrderID)
    try {
        onlinePujaBookUser.find({ currentOrderID: currentOrderID })
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
                        success_msg: 'Your order has been placed successfully!',
                        orderDetail: orderDetail
                    })
                }
            })

    } catch (err) {
        console.log(err);
        res.status(400).send({ err });
    }
});


router.post('/createOnlinepujabookUser', async (req, res, next) => {
    console.log(req.body)
    try {
        const paymentid = req.body.paymentid;
        const user_id = req.body.user_id;
        const pujaprice = req.body.pujaprice;
        const category_id = req.body.category_id;
        const online_puja_id = req.body._id;
        const details = req.body.details;
        const duration_number = req.body.duration_number;
        const duration_type = req.body.duration_type;
        const Puja_name = req.body.Puja_name;
        const regular_price_inr = req.body.regular_price_inr;
        const regular_price_usd = req.body.regular_price_usd;
        const sell_price_inr = req.body.sell_price_inr;
        const sell_price_usd = req.body.sell_price_usd;
        const sku = req.body.sku;
        const status = req.body.status;
        const benifit = req.body.benifit;
        const name = req.body.name;
        const dob = req.body.dob;
        const phoneno = req.body.phoneno;
        const gotr = req.body.gotr;
        const order_status = req.body.order_status;
        var currentOrderID = shortid.generate();

    
        const BhojanAddonePrice = req.body.BhojanAddonePrice;
        const DakshinaAddonePrice = req.body.DakshinaAddonePrice;
        const BhojanAddoneId = req.body.BhojanAddoneId;
        const DakshinaAddoneId = req.body.DakshinaAddoneId;
        
        console.log(req.body)
        //  const   PujaAddon= PujaAddon;
        await OnlineBookPujaUserService.postonlinePujaBookUser({
            user_id, name, dob, gotr, phoneno, pujaprice, online_puja_id, paymentid,
            Puja_name, duration_number, currentOrderID, status, category_id, duration_type, regular_price_inr,
            regular_price_usd, sell_price_inr, sell_price_usd, sku, benifit, details, order_status,BhojanAddonePrice,
            DakshinaAddonePrice,BhojanAddoneId,DakshinaAddoneId

        });
        res.status(200).send({
            success: true,
            msg: 'Your order has been placed successfully!',
            currentOrderID: currentOrderID
        });
    } catch (err) {
        console.log(err);
        // res.status(400).send({ error:'Your request could not be processed. Please try again.' });
        res.status(400).send(err);

        // return next(err);
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