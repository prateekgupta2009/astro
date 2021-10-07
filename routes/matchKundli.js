const express = require('express');
const router = express.Router();
const ashtakoot = 'https://api.vedicastroapi.com/json/matching/ashtakoot';
const dashakoot = 'https://api.vedicastroapi.com/json/matching/dashakoot';
const starmatch = 'https://api.vedicastroapi.com/json/matching/starmatch';
const papasamaya = 'https://api.vedicastroapi.com/json/matching/papasamaya';
const western ='https://api.vedicastroapi.com/json/matching/western'

const axios = require('axios')


//ashtakoot Match Kundli  API

router.post('/getashtakootkundli',async(req,res,next)=>{
  try{
    params={
        boy_dob:req.body.boy_dob,
        boy_tob:req.body.boy_tob,
        boy_lat:req.body.boy_lat,
        boy_lon:req.body.boy_lon,
        boy_tz: req.body.boy_tz,
        girl_dob: req.body.girl_dob,
        girl_tob:req.body.girl_tob,
        girl_lat:req.body.girl_lat,
        girl_lon:req.body.girl_lon,
        girl_tz:req.body.girl_tz,
        api_key:'b3e7fc34-f329-53f3-a7f4-cd96925c84b9'
    }
    var response = await axios.get(ashtakoot,{params:params})
    var result = response.data
    ////console.log(result)
    if(result.status == 200){
        //200 is success code 

        var prediction = result.response;
        res.json({
            msg:'find data',
            result:prediction
        })


        //do something with the response data
    }else{
      console.log(params)
        console.log("Error reason",result.response)
    }
    
    
  }catch{
    console.log('error')
  }
})

//dashakoot  Match Kundli

router.post('/getdashakootkundli',async(req,res,next)=>{
  try{
    params={
        boy_dob:req.body.boy_dob,
        boy_tob:req.body.boy_tob,
        boy_lat:req.body.boy_lat,
        boy_lon:req.body.boy_lon,
        boy_tz: req.body.boy_tz,
        girl_dob: req.body.girl_dob,
        girl_tob:req.body.girl_tob,
        girl_lat:req.body.girl_lat,
        girl_lon:req.body.girl_lon,
        girl_tz:req.body.girl_tz,
      api_key:'b3e7fc34-f329-53f3-a7f4-cd96925c84b9'
    }
    var response = await axios.get(dashakoot,{params:params})
    var result = response.data
    ////console.log(result)
    if(result.status == 200){
        //200 is success code 

        var prediction = result.response
        res.json({
          msg:'find data',

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

// starmatch Match Kundli  
router.post('/getstarmatchkundli',async(req,res,next)=>{
  try{
    params={
        boy_star :req.body.boy_star,
        girl_star : req.body.girl_star,
        api_key:'b3e7fc34-f329-53f3-a7f4-cd96925c84b9'
    }
    var response = await axios.get(starmatch,{params:params})
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

// papasamaya MatchKundli 

router.post('/getpapasamayakundli',async(req,res,next)=>{
  try{
    params={
        boy_dob:req.body.boy_dob,
        boy_tob:req.body.boy_tob,
        boy_lat:req.body.boy_lat,
        boy_lon:req.body.boy_lon,
        boy_tz: req.body.boy_tz,
        girl_dob: req.body.girl_dob,
        girl_tob:req.body.girl_tob,
        girl_lat:req.body.girl_lat,
        girl_lon:req.body.girl_lon,
        girl_tz:req.body.girl_tz,
      api_key:'b3e7fc34-f329-53f3-a7f4-cd96925c84b9'
    }
    var response = await axios.get(papasamaya,{params:params})
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


// Western MatchKundli 

router.post('/getWesternkundli',async(req,res,next)=>{
    try{
      params={
        boy_sign : req.body.boy_sign,
        girl_sign : req.body.girl_sign,
        api_key:'b3e7fc34-f329-53f3-a7f4-cd96925c84b9'
      }
      var response = await axios.get(western,{params:params})
      var result = response.data;
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