Astrologer_login_history = require('../models/astrologinHistory');


let astrologinHistoryService = {
   saveAstrOLoginHistory: async (data) => {
        newAstrologer_login_history = new Astrologer_login_history(data)
       await newAstrologer_login_history.save();
       return newAstrologer_login_history;
       },

       getastrOLoginHistory: () => {
         return new Promise((resolve, reject) => {
            Astrologer_login_history.find((err, list) => {
             if (err) {
               reject(err);
             };
             resolve(list);
           });
         })
       },
}
module.exports = astrologinHistoryService;