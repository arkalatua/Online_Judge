const express = require("express");
const { homePage , registerPage , registerUser , loginPage , loginUser, getUserNameFromEmail, getUserNameFromId } = require("../controller/oj-controller-auth");
const router = express.Router();


// routes
router.get('/home', homePage);
router.get('/register', registerPage);
router.post('/register', registerUser);
router.get('/login', loginPage);
router.post("/login" , loginUser);
router.post('/getName', getUserNameFromEmail);
router.post('/getUserName', getUserNameFromId);

// Exporting the router to be used in the main app
module.exports = router;