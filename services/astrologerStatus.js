Astrologer_status = require('../models/astrologerStatus');


let astrologerStatusService = {
   saveAstrologerStatus: async (data) => {
        newAstrologer_status = new Astrologer_status(data)
       await newAstrologer_status.save();
       return newAstrologer_status;
       },

       getastrologerstatuslist: () => {
         return new Promise((resolve, reject) => {
            Astrologer_status.find((err, list) => {
             if (err) {
               reject(err);
             };
             resolve(list);
           });
         })
       },
}
module.exports = astrologerStatusService;