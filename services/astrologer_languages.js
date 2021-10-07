const Astrologer_language = require('../models/astrologer_languages');


let astrologer_languageService = {

   getAstrologer_languageList: () => {
       return new Promise((resolve, reject) => {
        Astrologer_language.find((err, astrologer_language) => {
           if (err) {
             reject(err);
           };
           resolve(astrologer_language);
         });
       })
     }
}
module.exports = astrologer_languageService;