const express = require('express');
const router = express.Router();
 const kaalsarpdosh = "https://api.vedicastroapi.com/json/dosha/kaalsarpdosh";
 const mangaldosh = "https://api.vedicastroapi.com/json/dosha/mangaldosh";
 const pitradosh = "https://api.vedicastroapi.com/json/dosha/pitradosh";
 const papasamaya = "https://api.vedicastroapi.com/json/dosha/papasamaya";

const axios = require('axios')

// KaalSarp and Kalatra Dosh
router.post('/getkaalsarpdosh',async(req,res,next)=>{
    try{
      params={
        dob:req.body.dob,
        tob:req.body.tob,
        lat:req.body.lat,
        lon:req.body.lon,
        tz:req.body.tz,
        api_key:'b3e7fc34-f329-53f3-a7f4-cd96925c84b9'
      }
      var response = await axios.get(kaalsarpdosh,{params:params})
      var result = response.data
      ////console.log(result)
      if(result.status == 200){
          //200 is success code 
          var prediction = result.response
          //do something with the response data
          res.json({
            result:prediction
          })
          // console.log(prediction)
      }
      else{
          console.log("Error reason",result.response)
      }
      
      
    }catch{
      console.log('error')
    }
  });

  // Mangal Dosh

  router.post('/getmangaldosh',async(req,res,next)=>{
    try{
      params={
        dob:req.body.dob,
        tob:req.body.tob,
        lat:req.body.lat,
        lon:req.body.lon,
        tz:req.body.tz,
        api_key:'b3e7fc34-f329-53f3-a7f4-cd96925c84b9'
      }
      var response = await axios.get(mangaldosh,{params:params})
      var result = response.data
      ////console.log(result)
      if(result.status == 200){
          //200 is success code 
          var prediction = result.response
          //do something with the response data
          res.json({
            result:prediction
          })
          // console.log(prediction)
      }
      else{
          console.log("Error reason",result.response)
      }
      
      
    }catch{
      console.log('error')
    }
  });

  // Pitra Dosh
  router.post('/getpitradosh',async(req,res,next)=>{
    try{
      params={
        dob:req.body.dob,
        tob:req.body.tob,
        lat:req.body.lat,
        lon:req.body.lon,
        tz:req.body.tz,
        api_key:'b3e7fc34-f329-53f3-a7f4-cd96925c84b9'
      }
      var response = await axios.get(pitradosh,{params:params})
      var result = response.data
      ////console.log(result)
      if(result.status == 200){
          //200 is success code 
          var prediction = result.response
          //do something with the response data
          res.json({
            result:prediction
          })
          // console.log(prediction)
      }
      else{
          console.log("Error reason",result.response)
      }
      
      
    }catch{
      console.log('error')
    }
  });

  // Papasamaya Points 
  router.post('/getpapasamaya',async(req,res,next)=>{
    try{
      params={
        dob:req.body.dob,
        tob:req.body.tob,
        lat:req.body.lat,
        lon:req.body.lon,
        tz:req.body.tz,
        api_key:'b3e7fc34-f329-53f3-a7f4-cd96925c84b9'
      }
      var response = await axios.get(papasamaya,{params:params})
      var result = response.data
      ////console.log(result)
      if(result.status == 200){
          //200 is success code 
          var prediction = result.response
          //do something with the response data
          res.json({
            result:prediction
          })
          // console.log(prediction)
      }
      else{
          console.log("Error reason",result.response)
      }
      
      
    }catch{
      console.log('error')
    }
  });
  module.exports = router;

  



  
