const mongoose = require('mongoose');

// askQuestion schema 

const Astrologer_languagesSchema = mongoose.Schema({

    astrologer_id: {
        type: String,
        required: true
    },
    language_id: {
        type: String,
        required: true,        
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

mongoose.model('astrologer_languages', Astrologer_languagesSchema);

module.exports = mongoose.model('astrologer_languages')
