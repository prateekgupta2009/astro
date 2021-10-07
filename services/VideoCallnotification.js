VideoCallNotification = require('../models/VideoCallnotification');


let VideoCallNotificationService = {
   saveNotificationStatus: async (data) => {
        newVideoCallNotification = new VideoCallNotification(data)
       await newVideoCallNotification.save();
       return newVideoCallNotification;
       },

    //    getastrologerstatuslist: () => {
    //      return new Promise((resolve, reject) => {
    //         VideoCallNotification.find((err, list) => {
    //          if (err) {
    //            reject(err);
    //          };
    //          resolve(list);
    //        });
    //      })
    //    },
}
module.exports = VideoCallNotificationService;