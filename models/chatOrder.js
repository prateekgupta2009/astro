const mongoose = require('mongoose');

// ProductOrderSchema schema 

const ChatOrderSchema = mongoose.Schema({

    user_id: {
        type: String,
    },
    astrologer_id: {
        type: String,
    },
    chat_orderid: {
        type: String,
    },
    chattiming:{
        type: Number,
    },
    chatprice:{
        type:Number,
    },
    chatdate:{
        type:String
    },
    chatRate:{
        type:String
    },
    astrologer_name:{
        type:String
    }
});

// askQuestion model

mongoose.model('chat_order', ChatOrderSchema);

module.exports = mongoose.model('chat_order')
