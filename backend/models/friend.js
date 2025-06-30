const mongoose = require('mongoose');

// UserID_1: string (foreign key: Users)
// 	UserID_2: string (foreign key: Users)
// 	Status: string (pending/accepted/blocked)
// 	Requested_at: date and time
// 	Accepted_at: date and time

const friendSchema = new mongoose.Schema({
    userID_1: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    userID_2: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'blocked'],
        default: 'pending'
    },
    requestedAt: {
        type: Date,
        default: Date.now
    },
    acceptedAt: {
        type: Date
    }
});

module.exports = mongoose.model('Friend', friendSchema);