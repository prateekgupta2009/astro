const Astrologer_commissions = require('../models/astrologer_commissions');


let astrologer_commissionsService = {

   getAstrologer_commissionsList: () => {
       return new Promise((resolve, reject) => {
        Astrologer_commissions.find((err, astrologer_commissions) => {
           if (err) {
             reject(err);
           };
           resolve(astrologer_commissions);
         });
       })
     }
}
module.exports = astrologer_commissionsService;