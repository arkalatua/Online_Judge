const mongoose = require('mongoose');

//  PostID: string
//  Parent_postID: string (NULL for top level comments)
// 	UserID: string (foreign key:Users)
// 	Title: string
// 	Comment: string
// 	Created_at: date and time
// 	Votes: integer


const commentSchema = new mongoose.Schema({
    postID: {
        type: String,
        required: true
    },
    parent_postID: {
        type: String,
        default: null
    },
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        trim: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    comment: {
        type: String,
        required: true,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    votes: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('Comment', commentSchema);