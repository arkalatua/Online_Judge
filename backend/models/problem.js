const mongoose = require('mongoose');

// Problem ID: integer
// User ID: string (foreign key to User model)
// Name: string
// Difficulty: string
// Statement: string
// Sample Testcases: collection (test_case , output , explanation)
// Constraints: string
// Hidden Testcases: collection (test_case , output)

const problemSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    difficulty: {
        type: String,
        enum: ['Easy', 'Medium', 'Hard'],
        required: true,
        trim: true
    },
    statement: {
        type: String,
        required: true,
        trim: true
    },
    sampleTestcases: [{
        test_case: {
            type: String,
            required: true
        },
        output: {
            type: String,
            required: true
        },
        explanation: {
            type: String
        }
    }],
    constraints: {
        type: String,
        required: true,
        trim: true
    },
    hiddenTestcases: [{
        test_case: {
            type: String,
            required: true
        },
        output: {
            type: String,
            required: true
        }
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});


module.exports = mongoose.model('Problem', problemSchema);