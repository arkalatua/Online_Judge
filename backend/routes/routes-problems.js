const express = require("express");
const { problemsPage, problemPage, addProblemPage, createProblem, getAllProblems, getUserIdFromEmail, getUserProblems } = require("../controller/oj-controller-problems");
const router_problems = express.Router();


// routes

// read operations
router_problems.get('/addProblem', addProblemPage); // Page to add a new problem
router_problems.get('/', problemsPage); // Page to list all problems
router_problems.get('/:id', problemPage); // Page to view a specific problem by ID

// create operations
router_problems.post('/', createProblem); // Endpoint to create a new problem
router_problems.post('/getProblems' , getAllProblems); // Endpoint to get all problems
router_problems.post('/getIdFromEmail', getUserIdFromEmail); // Endpoint to get user ID from email
router_problems.post('/getUserProblems', getUserProblems); // Endpoint to get user problems by user ID

// router_problems.get('/problems/:id', problemPage);

// Exporting the router to be used in the main app
module.exports = router_problems;