const Astrologer_time = require('../models/astrologer_time_availabilities');


let astrologer_timeService = {

   getAstrologer_timeList: () => {
       return new Promise((resolve, reject) => {
        Astrologer_time.find((err, astrologer_time) => {
           if (err) {
             reject(err);
           };
           resolve(astrologer_time);
         });
       })
     }
}
module.exports = astrologer_timeService;