const mongoose = require('mongoose');

// askQuestion schema 

const UserDispatch_Add = mongoose.Schema({

    user_id: {
        type: String,
    },
    name: {
        type: String, requried: true
    },
    country: { type: String, requried: true },
    streetAddress: { type: String, requried: true },
    city: { type: String, requried: true },
    landmark: { type: String, requried: true },
    pincode: { type: String, requried: true },
    phone: { type: String, requried: true },

    created_at: {
        type: Date,
        default: new Date()
    },
    updated_at: {
        type: Date,
        default: new Date()
    },
});

// astrologers model

mongoose.model('userdispatchadd', UserDispatch_Add);

module.exports = mongoose.model('userdispatchadd')
