const mongoose = require('mongoose');

// VideoCallOrderSchema schema 

const InternationalAudioCallOrderSchema = mongoose.Schema({

    user_id: {
        type: String,
    },
    astrologer_id: {
        type: String,
    },
    call_orderid: {
        type: String,
    },
    date:{
        type:String
    },
    calltiming:{
        type: Number,
    },
    callprice:{
        type:Number,
    },
    astrologer_name:{
        type:String
    },
    callrate:{
        type:String
    }
    ,
    room_id:{
        type:String

    }

    
});

mongoose.model('internationalcall_order', InternationalAudioCallOrderSchema);

module.exports = mongoose.model('internationalcall_order')
