//import module - axios
const axios = require('axios')

//give the right end-point and params

const url = 'https://api.vedicastroapi.com/json/panchang/getpanchang'
// var params =  {
//     date: "19/09/1996",
//     tz: 5.5,
//     time:'2:30',
//     api_key: 'b3e7fc34-f329-53f3-a7f4-cd96925c84b9'
// }


let dailyPanchang ={
     getVedicPlanets: async (params) => {
  try {
      //wait for the VedicAstroAPI's response
    var response = await axios.get(url,{params:params})
    var result = response.data
    ////console.log(result)
    if(result.status == 200){
        //200 is success code 
        var prediction = result.response
        console.log(prediction)
        //do something with the response data
    }
    else{
        console.log("Error reason",result.response)
    }
  } catch (error) {
    console.error(error)
  }
}
}


module.exports = dailyPanchang;
