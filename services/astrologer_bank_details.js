const Astrologer_bankDetail = require('../models/astrologer_bank_details');


let astrologer_bankDetailService = {

   getAstrologer_bankDetailList: () => {
       return new Promise((resolve, reject) => {
        Astrologer_bankDetail.find((err, astrologer_bankDetail) => {
           if (err) {
             reject(err);
           };
           resolve(astrologer_bankDetail);
         });
       })
     }
}
module.exports = astrologer_bankDetailService;