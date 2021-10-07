Astrologer_report = require('../models/astrologerReport');


let astrologerReportService = {
   saveAstrologerReport: async (data) => {
        newAstrologer_report = new Astrologer_report(data)
       await newAstrologer_report.save();
       return newAstrologer_report;
       },

       getastrologersreportlist: () => {
         return new Promise((resolve, reject) => {
            Astrologer_report.find((err, list) => {
             if (err) {
               reject(err);
             };
             resolve(list);
           });
         })
       },
}
module.exports = astrologerReportService;