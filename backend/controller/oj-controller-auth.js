const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Validator = require('validatorjs');
const validator = require('validator');


const homePage = (req, res) => {
    try {
        res.send('Hello, World!');
    } catch (error) {
        console.error('Error occurred:', error);
    }
};

const registerPage = (req, res) => {
    try {
        res.send('Register Page');
    } catch (error) {
        console.error('Error occurred:', error);
    }
};

const registerUser = async (req, res) => {
    try {
        // get all data from frontend
        const { firstName, lastName, email, password } = req.body;

        // check that all the data should exist
        if (!(firstName && lastName && email && password)) {
            // send error response
            return res.status(400).json({
                message: 'Please send all the required data'
            });
        }

        // check if the email and password is valid
        let data = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password
        };

        let rules1 = {
            firstName: 'required|alpha'
        };
        let rules2 = {
            lastName: 'required|alpha'
        };
        let rules3 = {
            email: 'required|email'
        };
        let rules4 = {
            password: 'required|min:6'
        };

        let validation1 = new Validator(data, rules1);
        let validation2 = new Validator(data, rules2);
        let validation3 = new Validator(data, rules3);
        let validation4 = new Validator(data, rules4);

        if (validation1.fails() || validation2.fails() || validation3.fails() || validation4.fails() || !validator.isStrongPassword(password, {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1,
        })) {
            if (!validator.isStrongPassword(password, {
                minLength: 8,
                minLowercase: 1,
                minUppercase: 1,
                minNumbers: 1,
                minSymbols: 1,
            })) {
                return res.status(400).json({
                    field: 'password',
                    message: 'Password must be strong: should include (uppercase, lowercase, number, symbol and must be min 8 chars)'
                });
            }
            if (validation1.fails()) {
                return res.status(400).json({
                    field: 'firstName',
                    message: 'First name is required and should contain only alphabets'
                });
            }
            if (validation2.fails()) {
                return res.status(400).json({
                    field: 'lastName',
                    message: 'Last name is required and should contain only alphabets'
                });
            }
            if (validation3.fails()) {
                return res.status(400).json({
                    field: 'email',
                    message: 'Email is required and should be a valid email address'
                });
            }
            if (validation4.fails()) {
                return res.status(400).json({
                    field: 'password',
                    message: 'Password must be strong: should include (uppercase, lowercase, number, symbol and must be min 8 chars)'
                });
            }
        }

        // check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            // send error response
            return res.status(400).json({
                message: 'User with the same email id is already registered',
                field: 'email'
            });
        }

        // hashing/encrypting the password
        const saltRounds = 12;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // convert firstName and lastName to title case
        const toTitleCase = (str) => {
            return str[0].toUpperCase() + str.slice(1).toLowerCase();
        };

        // save user in the db 
        const user = await User.create({
            firstName: toTitleCase(firstName.trim()),
            lastName: toTitleCase(lastName.trim()),
            email: email.trim().toLowerCase(),
            password: hashedPassword
        });

        // generate a token for user and send it 
        const token = jwt.sign(
            { id: user._id, email },
            process.env.SECRET_KEY,
            { expiresIn: '24h' }
        );

        // send response to the frontend
        const userResponse = {
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            createdAt: user.createdAt
        }

        res.status(201).json({
            message: 'User registered successfully',
            user: userResponse,
            token: token
        });
    } catch (error) {
        console.error('Error occurred:', error);
    }
};

const loginPage = (req, res) => {
    try {
        res.send('Login Page');
    } catch (error) {
        console.error('Error occurred:', error);
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // check if email and password are provided
        if (!(email && password)) {
            return res.status(400).json({
                message: 'Please provide both email and password'
            });
        }
        // check if the user exists
        const user = await User.findOne({ email: email.trim().toLowerCase() });
        if (!user) {
            return res.status(400).json({
                message: 'User not registered'
            });
        }

        const name = user.firstName + ' ' + user.lastName;

        // check if the password is correct
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                message: 'Invalid credentials'
            });
        }

        // generate a token for user and send it
        const token = jwt.sign(
            { id: user._id, email },
            process.env.SECRET_KEY,
            { expiresIn: '24h' }
        );
        

        // send response to the frontend
        res.status(200).json({
            message: 'Login successful',
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                createdAt: user.createdAt
            },
            token: token
        });
    } catch (error) {
        console.error('Error occurred:', error);
    }
};

const getUserNameFromEmail = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        const user = await User.findOne({ email: email.trim().toLowerCase() });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            name: `${user.firstName} ${user.lastName}`
        });
    } catch (error) {
        console.error("Error in getUserNameFromEmail:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const getUserNameFromId = async (req, res) => {
    try {
        const { userId } = req.body;

        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }

        const user = await User.findById(userId);
        if (!user) {
            
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({
            name: `${user.firstName} ${user.lastName}`
        });
    } catch (error) {
        console.error("Error in getUserNameFromId:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


module.exports = {
    homePage,
    registerPage,
    registerUser,
    loginPage,
    loginUser,
    getUserNameFromEmail,
    getUserNameFromId
};