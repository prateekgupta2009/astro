let express = require('express');
let router = express.Router();
const axios = require('axios');




// router.post('/gettimezone', async (req, res, next) => {
//     try {
//         const lat = req.body.lat;
//         const lng = req.body.lng
//         axios.get(`https://maps.googleapis.com/maps/api/timezone/json?location=${lat},${lng}&timestamp=1331161200&key=AIzaSyA_K4ptz2258p2Ehuk9bEISC_yH_nuju0c`)
//         .then(res=>{
//             res.send({
//                 msg:'sucess',
//                 data:res
//             })
//         })

      
//     } catch (err) {
//         console.log(err);
//         res.status(400).send({ err });
//     }
// });


module.exports = router;