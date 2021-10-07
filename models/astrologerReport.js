const mongoose = require('mongoose');

// AstrologerReportSchema schema 

const AstrologerReportSchema = mongoose.Schema({

    astrologer_id:{
        type:String
    },
    subject: {
        type: String,
    },
    priority: {
        type: String,
    },
    reporttext: {
        type: String,
    },
    file: {
        type: String,
    },
    updated_at: {
        type: Date,
        default: new Date()
    },
    created_at: {
        type: Date,
        default: new Date()
    }
});


mongoose.model('astrologer_report', AstrologerReportSchema);

module.exports = mongoose.model('astrologer_report')
