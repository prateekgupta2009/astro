const mongoose = require('mongoose');

// askQuestion schema 

const Astrologer_timeSchema = mongoose.Schema({

    astrologer_id: {
        type: String,
        required: true
    },
    days: {
        type: String,
        required: true,        
    },
    all_same_time: {
        type: String,
        required: true,
    },
    closed_day: {
        type: String,
        required: true
    },
    slot_one_opening:{
        type: String,
        required: true
    },
    slot_one_closing:{
        type:String,
        required: true
    },
    slot_two_opening:{
        type:String,
        required: true
    },
    slot_two_closing:{
        type:String,
        required:true
    },
    slot_three_opening:{
        type:String,
        required:true
    },
    slot_three_closing:{
        type:String,
        required:true
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

mongoose.model('astrologer_time_availabilities', Astrologer_timeSchema);

module.exports = mongoose.model('astrologer_time_availabilities')
