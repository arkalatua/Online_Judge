const express = require("express");
const { problemsPage, problemPage, addProblemPage, createProblem } = require("../controller/oj-controller-problems");
const router_problems = express.Router();


// routes

// read operations
router_problems.get('/addProblem', addProblemPage); // Page to add a new problem
router_problems.get('/', problemsPage); // Page to list all problems
router_problems.get('/:id', problemPage); // Page to view a specific problem by ID

// create operations
router_problems.post('/', createProblem); // Endpoint to create a new problem

// router_problems.get('/problems/:id', problemPage);
// router.post('/register', registerUser);
// router.get('/login', loginPage);
// router.post("/login" , loginUser);

// Exporting the router to be used in the main app
module.exports = router_problems;