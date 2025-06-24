const express = require("express");
const { homePage , registerPage , registerUser , loginPage , loginUser } = require("../controller/oj-controller");
const router = express.Router();


// routes
router.get('/home', homePage);

router.get('/register', registerPage);
router.post('/register', registerUser);
router.get('/login', loginPage);
router.post("/login" , loginUser);

// Exporting the router to be used in the main app
module.exports = router;