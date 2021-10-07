Astrologer_review = require('../models/astroReview');


let astrologReviewService = {
   saveAstrReview: async (data) => {
        newAstrologer_review = new Astrologer_review(data)
       await newAstrologer_review.save();
       return newAstrologer_review;
       },

       getastroReview: () => {
         return new Promise((resolve, reject) => {
            Astrologer_review.find((err, list) => {
             if (err) {
               reject(err);
             };
             resolve(list);
           });
         })
       },
}
module.exports = astrologReviewService;