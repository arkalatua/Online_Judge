const Problem = require('../models/problem');
const user = require('../models/user');


const problemsPage = (req, res) => {
    try {
        res.send('Problems Page');
    } catch (error) {
        console.error('Error occurred:', error);
    }
};

const problemPage = (req, res) => {
    try {
        const problemId = req.params.id;
        res.send(`Problem Page for ID: ${problemId}`);
    } catch (error) {
        console.error('Error occurred:', error);
    }
};


const addProblemPage = (req, res) => {
    try {
        res.send('Add Problem Page');
    } catch (error) {
        console.error('Error occurred:', error);
    }
};

const createProblem = async (req, res) => {
    try {
        const { name, difficulty, statement, sampleTestCases, constraint, hiddenTestCases, email } = req.body;
        console.log({ name, difficulty, statement, sampleTestCases, constraint, hiddenTestCases, email });

        // Validate required fields
        if (!name || !difficulty || !statement || !sampleTestCases || !constraint || !hiddenTestCases || !email) {
            return res.status(400).send('All fields are required');
        }
        const _id = await fetchUserIdFromEmail(email);
        if (!_id) {
            return res.status(401).json({ error: 'User not authenticated' });
        }
        console.log('User ID:', _id);
        // Validate test cases are arrays
        if (!Array.isArray(sampleTestCases)) {
            return res.status(400).send('sampleTestCases must be an array');
        }
        if (!Array.isArray(hiddenTestCases)) {
            return res.status(400).send('hiddenTestCases must be an array');
        }

        // Create new problem object
        const newProblem = {
            userId: _id,
            name: name.trim(),
            difficulty: difficulty.trim(),
            statement: statement.trim(),
            sampleTestcases: sampleTestCases,
            constraints: constraint.trim(),
            hiddenTestcases: hiddenTestCases
        };

        // Save to database
        const problem = await Problem.create(newProblem);

        res.status(201).json({
            message: 'Problem created successfully',
            problem: problem // Return the saved problem from DB
        });
    } catch (error) {
        console.error('Error occurred:', error);
        res.status(500).json({
            error: 'Internal Server Error',
            details: error.message
        });
    }
};

const getAllProblems = async (req, res) => {
    try {
        const problems = await Problem.find({});
        res.status(200).json({ problems });
    } catch (error) {
        console.error('Error fetching problems:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const fetchUserIdFromEmail = async (email) => {
    if (!email) throw new Error("Email is required");

    const user_ = await user.findOne({ email: email.trim().toLowerCase() });
    if (!user_) throw new Error("User not found");

    return user_._id;
};


module.exports = {
    problemsPage,
    problemPage,
    addProblemPage,
    createProblem,
    getAllProblems
};