const Astrologer_categories = require('../models/astrologer_categories');


let astrologer_categoriesService = {

   getAstrologer_categoriesList: () => {
       return new Promise((resolve, reject) => {
        Astrologer_categories.find((err, astrologer_categories) => {
           if (err) {
             reject(err);
           };
           resolve(astrologer_categories);
         });
       })
     }
}
module.exports = astrologer_categoriesService;