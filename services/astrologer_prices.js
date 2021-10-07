const Astrologer_price = require('../models/astrologer_prices');


let astrologer_priceService = {

   getAstrologer_priceList: () => {
       return new Promise((resolve, reject) => {
        Astrologer_price.find((err, astrologer_price) => {
           if (err) {
             reject(err);
           };
           resolve(astrologer_price);
         });
       })
     }
}
module.exports = astrologer_priceService;