const express = require('express');
const router = express.Router();
const axios = require('axios')
const url = 'https://api.salesquared.io/call_connect2/v1';
var request = require('request');
var xml2js = require('xml2js')




router.post('/callingservices', async (req, res, next) => {

    // var key = "7961e91641f07b19fafca1f1897952b659766ce0951139dc"
    //     var sid = "pratstechnologies1"
    //     var token = "3f5e2eb869ddf6ebd23ee359140a98f346e75d9821746e59"
    //     var from = "08962544890"
    //      var to = "07979081703"
    //      var StatusCallback="http://localhost:8000/api/calldetailbyid"
    //      var TimeLimit =10;
    // var dataString = 'From=08962544890&To=07979081703&CallerId=pratstechnologies1&StatusCallback=http://your-application.com/exotel-callback&StatusCallbackEvents[0]=terminal&StatusCallbackContentType=application/json';
    
    // var options = {
    //      url:`https://${key}:${token}@api.exotel.com/v1/Accounts/${sid}/Calls/connect`,
    // method: 'POST',
    //     body: dataString
    // };
    
    // function callback(error, response, body) {
    //     console.log(body)
    //     // if (!error && response.statusCode == 200) {
    //     //     console.log(body);
    //     // }
    //     // else{
    //     //     console.log(error)
    //     // }
    // }
    
    // request(options, callback);
    


        var dataString = 'From=9513886363&To=9250904129&CallerId=01143078481';
        var key = "7961e91641f07b19fafca1f1897952b659766ce0951139dc"
        var sid = "pratstechnologies1"
        var token = "3f5e2eb869ddf6ebd23ee359140a98f346e75d9821746e59"
        var from = "08962544890"
         var to = "07979081703"
         var StatusCallback="https://localhost:8000/api/calldetailbyid"
         var TimeLimit =10;
       //  08077954391
      var StatusCallbackEvents="terminal"
        const formUrlEncoded = x => Object.keys(x).reduce((p, c) => p + `&${c}=${encodeURIComponent(x[c])}`, '')
     var   url=`https://${key}:${token}@api.exotel.com/v1/Accounts/${sid}/Calls/connect`
                axios.post(url,
            formUrlEncoded({
                "From": from,
                "To": to,
                "CallerId": 'pratstechnologies1',
                "CallerType": 'promo',
                "TimeLimit":TimeLimit,
                "StatusCallback":"http://api.astrosarathi.com/api/callstatusback",
                "StatusCallbackEvents[0]":StatusCallbackEvents,
              //  "StatusCallbackEvents[0]":["terminal"],
                "StatusCallbackContentType":"multipart/form-data"
            }),
            {
                withCredentials: true,
                headers: {
                    "Accept": "application/x-www-form-urlencoded",
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            },
        )
            .then((response) => {
              const json = response.data;
              xml2js.parseString(json,(err,result)=>{
                  if(err){
                      throw err
                  }
                  else{
                  const jsondata = JSON.stringify(result,null,4);
                  console.log(result.TwilioResponse.Call[0])
                  const resultdata={
                    Sid:result.TwilioResponse.Call[0].Sid[0] ,
                    ParentCallSid:result.TwilioResponse.Call[0].ParentCallSid[0],
                    DateCreated:result.TwilioResponse.Call[0].DateCreated[0],
                    DateUpdated:result.TwilioResponse.Call[0].DateUpdated[0],
                    AccountSid: result.TwilioResponse.Call[0].AccountSid[0],
                    To: result.TwilioResponse.Call[0].To[0],
                    From: result.TwilioResponse.Call[0].From[0],
                    PhoneNumberSid:result.TwilioResponse.Call[0].PhoneNumberSid[0],
                    Status:result.TwilioResponse.Call[0].Status[0],
                    StartTime: result.TwilioResponse.Call[0].StartTime[0],
                    EndTime: result.TwilioResponse.Call[0].EndTime[0],
                    Duration: result.TwilioResponse.Call[0].Duration[0],
                    Price: result.TwilioResponse.Call[0].Price[0],
                    Direction:result.TwilioResponse.Call[0].Direction[0],
                    AnsweredBy:result.TwilioResponse.Call[0].AnsweredBy[0],
                    ForwardedFrom:result.TwilioResponse.Call[0].ForwardedFrom[0],
                    CallerName:result.TwilioResponse.Call[0].CallerName[0],
                    Uri: result.TwilioResponse.Call[0].Uri[0],
                    RecordingUrl:result.TwilioResponse.Call[0].RecordingUrl[0]
                }
                  res.json({
                      msg:'call connect successfully',
                      data:resultdata
                  })
                }
              })
        
            })
            .catch((error) => {
                res.json({
                    msg:'something error plz tryagainlater'
                })
                console.error(error.response.status)
            })


})


router.post('/calldetailbyid', async (req, res, next) => {
  
        var dataString = 'From=9513886363&To=9250904129&CallerId=01143078481';
        var key = "7961e91641f07b19fafca1f1897952b659766ce0951139dc"
        var sid = "pratstechnologies1"
        var token = "3f5e2eb869ddf6ebd23ee359140a98f346e75d9821746e59"
        var from = "08962544890"
         var to = "07979081703"
         var TimeLimit =10
         var CallSid = req.body.CallSid
         var options = {
            url: `https://${key}:${token}@api.exotel.com/v1/Accounts/${sid}/Calls/${CallSid}/`
        };
        
        function callback(error, response, body) {
            if(error){
                console.log(error)
            }
          //  (!error && response.statusCode == 200)

            else  {
                const json = body;
                xml2js.parseString(json,(err,result)=>{
                    if(err){
                        throw err
                    }
                    const jsondata = JSON.stringify(result,null,4);
                    console.log(result.TwilioResponse.Call[0])
                    const resultdata={
                      Sid:result.TwilioResponse.Call[0].Sid[0] ,
                      ParentCallSid:result.TwilioResponse.Call[0].ParentCallSid[0],
                      DateCreated:result.TwilioResponse.Call[0].DateCreated[0],
                      DateUpdated:result.TwilioResponse.Call[0].DateUpdated[0],
                      AccountSid: result.TwilioResponse.Call[0].AccountSid[0],
                      To: result.TwilioResponse.Call[0].To[0],
                      From: result.TwilioResponse.Call[0].From[0],
                      PhoneNumberSid:result.TwilioResponse.Call[0].PhoneNumberSid[0],
                      Status:result.TwilioResponse.Call[0].Status[0],
                      StartTime: result.TwilioResponse.Call[0].StartTime[0],
                      EndTime: result.TwilioResponse.Call[0].EndTime[0],
                      Duration: result.TwilioResponse.Call[0].Duration[0],
                      Price: result.TwilioResponse.Call[0].Price[0],
                      Direction:result.TwilioResponse.Call[0].Direction[0],
                      AnsweredBy:result.TwilioResponse.Call[0].AnsweredBy[0],
                      ForwardedFrom:result.TwilioResponse.Call[0].ForwardedFrom[0],
                      CallerName:result.TwilioResponse.Call[0].CallerName[0],
                      Uri: result.TwilioResponse.Call[0].Uri[0],
                      RecordingUrl:result.TwilioResponse.Call[0].RecordingUrl[0]
                  }
                    res.json({
                        data:resultdata
                    })
                })
               // console.log(response);
            }
        }
        request(options, callback);
})

router.post('/callstatusback', async (req, res, next) => {

    var CallSid  =req.body.CallSid ;
    var Status =req.body.Status ;
    var DateUpdated  =req.body.DateUpdated ;
    console.log(req.body)
console.log('call complete')
// const data={
//     user_id:'601e1c8d4b394c0cf91ed060'

// }
// const options = {
//                  "method": 'GET',
//                  "url": `http://api.astrosarathi.com/api/walletUserfind`,
//                  "body":data
//              };
//              function callback(error, response, body) {
//                 if (!error && response.statusCode == 200) {
//                     console.log(body);
//                 }
//                 else{
//                     console.log(error)
//                 }
//             }          
//             request(options, callback);


 })

module.exports = router;