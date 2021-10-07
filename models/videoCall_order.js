const mongoose = require('mongoose');

// VideoCallOrderSchema schema 

const VideoCallOrderSchema = mongoose.Schema({

    user_id: {
        type: String,
    },
    astrologer_id: {
        type: String,
    },
    video_orderid: {
        type: String,
    },
    date:{
        type:String
    },
    videocalltiming:{
        type: Number,
    },
    videocallprice:{
        type:Number,
    },
    astrologer_name:{
        type:String
    },
    videocallrate:{
        type:String
    },
    room_id:{
        type:String
    }

    
});

mongoose.model('videocall_order', VideoCallOrderSchema);

module.exports = mongoose.model('videocall_order')
