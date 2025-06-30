const mongoose = require('mongoose');

//  Problem ID: integer (foreign key: Problems)
// 	User ID: string (foreign key: Users)
// 	Verdict: boolean
// 	Submitted_at: date and time

const solutionSchema = new mongoose.Schema({
    problemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Problem',
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    verdict: {
        type: Boolean,
        required: true
    },
    submittedAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Solution', solutionSchema);