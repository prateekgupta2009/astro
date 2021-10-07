const mongoose = require('mongoose');

// ProductOrderSchema schema 

const VideoCallNotificationSchema = mongoose.Schema({

   user_id:{
    type: String,
   },

   astrologer_id:{
    type: String,
   },
   user_ref:{
        type: String,
    },
    room_id:{
        type: String,
    },
    astroresponcemsg: {
        type: String,
    },
    userresponcemsg:{
        type: String,
    },
});

// askQuestion model

mongoose.model('VideoCall_notification', VideoCallNotificationSchema);

module.exports = mongoose.model('VideoCall_notification')
