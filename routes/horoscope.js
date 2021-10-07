const express = require('express');
var xml = require('xml');
const libxmljs = require("libxmljs");


const router = express.Router();
 const vedic = "https://api.vedicastroapi.com/json/horoscope/vedic";
 const mahadasha = "https://api.vedicastroapi.com/json/horoscope/mahadasha";
 const antardasha = "https://api.vedicastroapi.com/json/horoscope/antardasha";
 const ashtakvarga="https://api.vedicastroapi.com/json/horoscope/ashtakvarga";
 const divisionalcharts = "https://api.vedicastroapi.com/json/horoscope/divisionalcharts";
 const western = 'https://api.vedicastroapi.com/json/horoscope/western';
 const findsunsign= 'https://api.vedicastroapi.com/json/horoscope/findsunsign';
 const findmoonsign = 'https://api.vedicastroapi.com/json/horoscope/findmoonsign';
 const  findascendant= 'https://api.vedicastroapi.com/json/horoscope/findascendant';
 const divvisionchartimage='https://api.vedicastroapi.com/json/horoscope/chartimage'

const axios = require('axios')

// Planetary Details (Vedic)
router.post('/getvedic',async(req,res,next)=>{
  //console.log(req.body)
    try{
      params={
        dob:req.body.dob,
        tob:req.body.bot,
        lat:req.body.lat,
        lon:req.body.lng,
        tz:req.body.timezone,
        api_key:'b3e7fc34-f329-53f3-a7f4-cd96925c84b9'
      }
      console.log(params)

      var response = await axios.get(vedic,{params:params})
      var result = response.data
      ////console.log(result)
      if(result.status == 200){
          //200 is success code 
          var prediction = result.response
          //do something with the response data
          res.status(200).json({
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

  // Mahadasha

  router.post('/getmahadasha',async(req,res,next)=>{
    try{
      params={
        dob:req.body.dob,
        tob:req.body.bot,
        lat:req.body.lat,
        lon:req.body.lng,
        tz:req.body.timezone,
        api_key:'b3e7fc34-f329-53f3-a7f4-cd96925c84b9'
      }
      var response = await axios.get(mahadasha,{params:params})
      var result = response.data
      ////console.log(result)
      if(result.status == 200){
          //200 is success code 
          var prediction = result.response
          //do something with the response data
          res.status(200).json({
            result:prediction,

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

  // Antardasha
  router.post('/getantardasha',async(req,res,next)=>{
    try{
      params={
        dob:req.body.dob,
        tob:req.body.bot,
        lat:req.body.lat,
        lon:req.body.lng,
        tz:req.body.timezone,
        api_key:'b3e7fc34-f329-53f3-a7f4-cd96925c84b9'
      }
      var response = await axios.get(antardasha,{params:params})
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

  // Ashtakvarga
  router.post('/getashtakvarga',async(req,res,next)=>{
    try{
      params={
        dob:req.body.dob,
        tob:req.body.bot,
        lat:req.body.lat,
        lon:req.body.lng,
        tz:req.body.timezone,
        api_key:'b3e7fc34-f329-53f3-a7f4-cd96925c84b9'
      }
      var response = await axios.get(ashtakvarga,{params:params})
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

  // Divisional Charts 
  router.post('/getdivisionalcharts',async(req,res,next)=>{
    try{
      params={
        dob:req.body.dob,
        tob:req.body.bot,
        lat:req.body.lat,
        lon:req.body.lng,
        tz:req.body.timezone,
        div:req.body.div,
        api_key:'b3e7fc34-f329-53f3-a7f4-cd96925c84b9'
      }
      var response = await axios.get(divisionalcharts,{params:params})
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

   // Divisional Charts  image
   router.post('/getdivisionalchartsimage',async(req,res,next)=>{
    try{
      params={
        dob:req.body.dob,
        tob:req.body.tob,
        lat:req.body.lat,
        lon:req.body.lon,
        tz:req.body.tz,
        div:req.body.div,
        style:"north",
        color:"red",
        api_key:'b3e7fc34-f329-53f3-a7f4-cd96925c84b9'
      }
      var response = await axios.get(divvisionchartimage,{params:params})
      var result = response.data
      //console.log(result)
      if(result == ''){
          //200 is success code 
          var prediction = result.response
          //do something with the response data
          res.send({
            msg:'Error',
            err:result
          })

          // console.log(prediction)
      }
      else{
        res.send({
          msg:'success',
          result:result
        })
         // console.log("Error reason",params)
      }
      
      
    }catch{
      res.send({
        msg:'Error',
        err:err
      })
     // console.log(err)
    //  console.log('error')
    }
  });

  //Planetary Details (western)

  router.post('/getwestern',async(req,res,next)=>{
    try{
      params={
        dob:req.body.dob,
        tob:req.body.bot,
        lat:req.body.lat,
        lon:req.body.lng,
        tz:req.body.timezone,
        api_key:'b3e7fc34-f329-53f3-a7f4-cd96925c84b9'
      }
      var response = await axios.get(western,{params:params})
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
// True Sun Sign Finder

  router.post('/getfindsunsign',async(req,res,next)=>{
    try{
      params={
        dob:req.body.dob,
        tob:req.body.bot,
        lat:req.body.lat,
        lon:req.body.lng,
        tz:req.body.timezone,
        api_key:'b3e7fc34-f329-53f3-a7f4-cd96925c84b9'
      }
      var response = await axios.get(findsunsign,{params:params})
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

// Moon Sign Finders

  router.post('/getfindmoonsign',async(req,res,next)=>{
    try{
      params={
        dob:req.body.dob,
        tob:req.body.bot,
        lat:req.body.lat,
        lon:req.body.lng,
        tz:req.body.timezone,
        api_key:'b3e7fc34-f329-53f3-a7f4-cd96925c84b9'
      }
      var response = await axios.get(findmoonsign,{params:params})
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


// Ascendant Finder

  router.post('/getfindascendant',async(req,res,next)=>{
    try{
      params={
        dob:req.body.dob,
        tob:req.body.bot,
        lat:req.body.lat,
        lon:req.body.lng,
        tz:req.body.timezone,
        api_key:'b3e7fc34-f329-53f3-a7f4-cd96925c84b9'
      }
      var response = await axios.get(findascendant,{params:params})
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


 
  



  
