const express = require('express');
const router=express.Router();
const shortid = require('shortid');
const Razorpay= require('razorpay')
const request = require('request');
const axios  = require('axios');
 const crypto = require('crypto');

const keys = require('../utils/razorpayKey');

const razorInstance = new Razorpay({
    key_id:keys.razorIdkey,
    key_secret: keys.razorIdSecret
});

router.post('/orders',(req,res,next)=>{
    try{
        const options = {
            amount:parseInt(req.body.amount)*100,
            currency:'INR',
            receipt:'receipt#1',
            payment_capture:0,
        };
        razorInstance.orders.create(options, (error,order)=>{
            if(error){
                console.log(error)
                return res.status(500).json({
                    message:'something error!'
                })
            }else{
            return res.status(200).json(order)
            }
        })
    }catch(err){
        return res.status(500).json({
            message:'something errors !'
        })
    }
});

router.post("/success", async (req, res) => {
    // console.log(req.body)
    try {
        // getting the details back from our font-end
        const {
            orderCreationId,
            razorpayPaymentId,
            razorpayOrderId,
            razorpaySignature,
        } = req.body;
        const form= {
            amount: 1000,
            currency: INR
          }
        const url=`https://rzp_test_Q3fBqz6p2Yj9On:QlavORPZ04g0bqornvlMGJDU@api.razorpay.com/v1/payments/${razorpayPaymentId}`

        axios.post(url,form)
        .then(res=>{
            console.log(res)
        })
    //   request({
    //     method: 'POST',
    //      url:`https://rzp_test_Q3fBqz6p2Yj9On:QlavORPZ04g0bqornvlMGJDU@api.razorpay.com/v1/payments/${razorpayPaymentId}`,
    //     form: {
    //       amount: 1000,
    //       currency: INR
    //     }
    //   }, function (error, response, body) {
    //     console.log('Status:', response.statusCode);
    //     console.log('Headers:', JSON.stringify(response.headers));
    //     console.log('Response:', body);
    //   });

        // Creating our own digest
        // The format should be like this:
        // digest = hmac_sha256(orderCreationId + "|" + razorpayPaymentId, secret);
        // const shasum = crypto.createHmac("sha256", "w2lBtgmeuDUfnJVp43UpcaiT");

        // shasum.update(`${orderCreationId}|${razorpayPaymentId}`);

        // const digest = shasum.digest("hex");

        // // comaparing our digest with the actual signature
        // if (digest !== razorpaySignature)
        //     return res.status(400).json({ msg: "Transaction not legit!" });
    //   const   generated_signature = hmac_sha256(razorpayOrderId + "|" + razorpayPaymentId, keys.razorIdSecret); 
    //      if (generated_signature === razorpaySignature)
    //      {   
    //             console.log('payment is successful')
    //          }
    //          else{
    //             return res.status(400).json({ msg: "Transaction not legit!" });
    //          }

        // THE PAYMENT IS LEGIT & VERIFIED
        // YOU CAN SAVE THE DETAILS IN YOUR DATABASE IF YOU WANT

        // res.json({
        //     msg: "success",
        //     orderId: razorpayOrderId,
        //     paymentId: razorpayPaymentId,
        // });
    } catch (error) {
        res.status(500).send("error" );
    }
});

router.get('/payments/:id',(req,res)=>{
    // console.log(req.params.id)
     const url=`https://rzp_test_Q3fBqz6p2Yj9On:QlavORPZ04g0bqornvlMGJDU@api.razorpay.com/v1/payments/${req.params.id}`
    request(url,function(error,response,body){
        console.log("Response",body)
        return res.status(200).json(JSON.parse(body))
    })
})

router.post('/payments/:id/capture',(req,res)=>{
    console.log(req.params.id)
    
    request({
        method:'POST',
        url:`https://rzp_test_Q3fBqz6p2Yj9On:QlavORPZ04g0bqornvlMGJDU@api.razorpay.com/v1/payments/${req.params.id}/capture`,

        form:{
            amount:'100',
            currency:'INR'
        },
         function(err,response,body){
            if(err){
                console.log(err)
                return res.status(500).json({
                    message:'something errors !'
                })
            }
            else{
                console.log(response)
                console.log("Status:", response.statusCode);
                console.log("Headers:", JSON.stringify(response.headers));
                console.log("Response:", body);    
                  return res.status(200).json(body)

            }
        }

    })
    // try{
    //     return
    //      request({
    //         method:"POST",
    //         url:`https://rzp_test_Q3fBqz6p2Yj9On:QlavORPZ04g0bqornvlMGJDU@api.razorpay.com/v1/payments/${req.params.id}/capture`,
    //       //  url: `https://api.razorpay.com/v1/payments/${req.params.paymentId}/capture`,

    //         form:{
    //             amount:10 *100,
    //             currency:"INR"
    //         },
    //         async function(err,response,body){
    //             if(err){
    //                 console.log(err)
    //                 return res.status(500).json({
    //                     message:'something errors !'
    //                 })
    //             }
    //             else{
    //                 console.log("Status:", response.statusCode);
    //                 console.log("Headers:", JSON.stringify(response.headers));
    //                 console.log("Response:", body);    
    //                   return res.status(200).json(body)

    //             }
    //         }

    //     })
    // }catch(err){
    //     if(err){
    //         return res.status(500).json({
    //             message:err.message
    //         })
    //     }
  //  }
})

// router.post('/razorpay',async(req,res,next)=>{
//     const payment_capture=1;
//     const amount=10;
//     const currency ='INR';

//     const options = {
//         amount :amount*100,
//         currency,
//         receipt:shortid.generate(),
//         payment_capture
//     }
//    const response = await  Razorpay.orders.create(options);
//    console.log(response);
//    res.send('ok')
// })


router.post('/verification', (req, res) => {
	// do a validation
	const secret = '12345678'

	console.log(req.body)

	const crypto = require('crypto')

	const shasum = crypto.createHmac('sha256', secret)
	shasum.update(JSON.stringify(req.body))
	const digest = shasum.digest('hex')

	console.log(digest, req.headers['x-razorpay-signature'])

	if (digest === req.headers['x-razorpay-signature']) {
		console.log('request is legit')
		// process it
		require('fs').writeFileSync('payment1.json', JSON.stringify(req.body, null, 4))
	} else {
		// pass it
	}
	res.json({ status: 'ok' })
})


router.post('/razorpay', async (req, res) => {
	const payment_capture = 1
	//const amount = 10
	const currency = 'INR'

	const options = {
        amount:10*100,
        currency:'INR',
        receipt:'receipt#1',
        payment_capture:0,
	}

	try {
		const response = await razorInstance.orders.create(options)
		console.log(response)
		res.json({
			id: response.id,
			currency: response.currency,
			amount: response.amount
		})
	} catch (error) {
		console.log(error)
	}
})

module.exports = router;