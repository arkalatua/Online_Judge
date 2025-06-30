const Problem = require('../models/problem');

let problem_id = 1;
const problemsPage = (req, res) => {
    try {
        res.send('Problems Page');
    } catch (error) {
        console.error('Error occurred:', error);
        process.exit(1); // Exit the process with failure
    }
};

const problemPage = (req, res) => {
    try {
        const problemId = req.params.id;
        res.send(`Problem Page for ID: ${problemId}`);
    } catch (error) {
        console.error('Error occurred:', error);
        process.exit(1); // Exit the process with failure
    }
};


const addProblemPage = (req, res) => {
    try {
        res.send('Add Problem Page');
    } catch (error) {
        console.error('Error occurred:', error);
        process.exit(1); // Exit the process with failure
    }
};

const createProblem = async (req, res) => {
    try {
        const { name, difficulty, statement, sample_testcases, constraints, hidden_testcases } = req.body;
        
        // Validate required fields
        if (!name || !difficulty || !statement || !sample_testcases || !constraints || !hidden_testcases) {
            return res.status(400).send('All fields are required');
        }

        // Validate test cases are arrays
        if (!Array.isArray(sample_testcases)) {
            return res.status(400).send('sample_testcases must be an array');
        }
        if (!Array.isArray(hidden_testcases)) {
            return res.status(400).send('hidden_testcases must be an array');
        }

        // Create new problem object
        const newProblem = {
            problemId: problem_id++,
            name: name.trim(),
            difficulty: difficulty.trim(),
            statement: statement.trim(),
            sampleTestcases: sample_testcases, // Don't trim arrays!
            constraints: constraints.trim(),
            hiddenTestcases: hidden_testcases  // Don't trim arrays!
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

module.exports = {
    problemsPage,
    problemPage,
    addProblemPage,
    createProblem
};