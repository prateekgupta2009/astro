const express = require('express');
const router = express.Router();
const axios = require('axios')
const url='https://api.salesquared.io/call_connect2/v1'


    router.post('/callingservice', async (req, res, next) => {
        try {
            console.log(req.body)
            const data = {
                num_1: req.body.num_1,
                num_2: req.body.num_2,
                api_key: "c4UDGGucL6nTMZLxPQqWLZ2AHOD2h5eu847bDzHrymGSUdpF8p",
                callerid: "04071812390",
                calldet_callback_url: "https://en31t2u38ozab.x.pipedream.net"
            }
            var response = await axios.post(url,data )
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));

        } catch{
            console.log('error')
         }
    })


    module.exports = router;