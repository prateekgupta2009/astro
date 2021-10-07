const express = require('express');
const router = express.Router();
const dailyPanchang = require('../utils/dailyPanchang');
 const url = 'https://api.vedicastroapi.com/json/panchang/getpanchang';
 const MoonPhase = 'https://api.vedicastroapi.com/json/panchang/moonphase';
 const Sunsine = 'https://api.vedicastroapi.com/json/panchang/sunrise';
 const Sunset = 'https://api.vedicastroapi.com/json/panchang/sunset'


const axios = require('axios')


// panchang API

router.post('/createdailypanchang',async(req,res,next)=>{
  try{
    params={
      date:req.body.date,
      tz:req.body.tz,
      time:req.body.time,
      api_key:'b3e7fc34-f329-53f3-a7f4-cd96925c84b9'
    }
    var response = await axios.get(url,{params:params})
    var result = response.data
    ////console.log(result)
    if(result.status == 200){
        //200 is success code 
        var prediction = result.response
        //do something with the response data
        res.json({
          resultdata:prediction
        })
        // console.log(prediction)
    }
    else{
        console.log("Error reason",result.response)
    }
    
    
  }catch{
    console.log('error')
  }
})

//Moon Phase Panchang

router.post('/createmoonphase',async(req,res,next)=>{
  try{
    params={
      date:req.body.date,
      tz:req.body.tz,
      api_key:'b3e7fc34-f329-53f3-a7f4-cd96925c84b9'
    }
    var response = await axios.get(MoonPhase,{params:params})
    var result = response.data
    ////console.log(result)
    if(result.status == 200){
        //200 is success code 

        var prediction = result.response
        res.json({
          result:prediction
        })


        //do something with the response data
    }else{
        ////console.log("Error reason",result.response)
    }
    
    
  }catch{
    console.log('error')
  }
});

// Sunrise AND Sunset API
router.post('/createsunrise',async(req,res,next)=>{
  try{
    params={
      date:req.body.date,
      lat:req.body.lat,
      lon:req.body.lon,
      tz:req.body.tz,
      api_key:'b3e7fc34-f329-53f3-a7f4-cd96925c84b9'
    }
    var response = await axios.get(Sunsine,{params:params})
    var result = response.data
    ////console.log(result)
    if(result.status == 200){
        //200 is success code 

        var prediction = result.response
        res.json({
          result:prediction
        })


        //do something with the response data
    }else{
        console.log("Error reason",result.response)
    }
    
    
  }catch{
    console.log('error')
  }
});

// Sunset API

router.post('/createsunset',async(req,res,next)=>{
  try{
    params={
      date:req.body.date,
      lat:req.body.lat,
      lon:req.body.lon,
      tz:req.body.tz,
      api_key:'b3e7fc34-f329-53f3-a7f4-cd96925c84b9'
    }
    var response = await axios.get(Sunset,{params:params})
    var result = response.data
    ////console.log(result)
    if(result.status == 200){
        //200 is success code 

        var prediction = result.response
        res.json({
          result:prediction
        })


        //do something with the response data
    }else{
        console.log("Error reason",result.response)
    }
    
    
  }catch{
    console.log('error')
  }
});





module.exports = router;