const mongoose = require('mongoose');

// askQuestion schema 

const Astrologer_priceSchema = mongoose.Schema({

    astrologer_id: {
        type: String,
        required: true
    },
    call_minut: {
        type: String,
        required: true,        
    },
    call_price: {
        type: String,
        required: true,
    },
    chat_minut: {
        type: String,
        required: true
    },
    chat_price:{
        type: String,
        required: true
    },
    video_minut:{
        type:String,
        required: true
    },
    video_price:{
        type:String,
        required: true
    },
    created_by:{
        type:String,
        required:true
    },
    dolar_call_price:{
        type:String,
        required:true
    },
    dolar_chat_price:{
        type:String,
        required:true
    },
    dolar_video_price:{
        type:String,
        required:true
    },
    call_commission:{
        type:String,
        require:true
    },
    chat_commission:{
        type:String,
        require:true
    },
    video_commission:{
        type:String,
        require:true
    }
    
    // created_at: {
    //     type: Date,
    //     default: new Date()
    // }
    // createAt: {
    //     type: Date,
    //     default: Date.now(),
    //     index: { expires: 60*1 }
    // }
//     expire_at: {type: Date,
//         default: Date.now, 
//         expires: 30
//    } 
});

// astrologers model

mongoose.model('astrologer_prices', Astrologer_priceSchema);

module.exports = mongoose.model('astrologer_prices')
