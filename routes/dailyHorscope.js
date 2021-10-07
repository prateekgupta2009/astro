const express = require('express');
const router = express.Router();
 const dailyhorscope = "https://api.vedicastroapi.com/json/prediction/daily";
 const weeklyhorscope="https://api.vedicastroapi.com/json/prediction/weeklysun"


const axios = require('axios')

// daily  horscope
router.post('/getdailyhorscope',async(req,res,next)=>{
    try{
      params={
        date:req.body.date,
        zodiac:req.body.zodiac,
        type:req.body.type,
        show_same:req.body.show_same,
        api_key:'b3e7fc34-f329-53f3-a7f4-cd96925c84b9'
      }
      console.log(params)
      var response = await axios.get(dailyhorscope,{params:params})
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

// weekly sun
router.post('/getweeklyhorscope',async(req,res,next)=>{
  try{
    params={
      week:req.body.date,
      zodiac:req.body.zodiac,
      type:req.body.type,
      show_same:req.body.show_same,
      api_key:'b3e7fc34-f329-53f3-a7f4-cd96925c84b9'
    }
    console.log(params)
    var response = await axios.get(weeklyhorscope,{params:params})
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


 
  



  
