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
        process.exit(1); // Exit the process with failure
    }
};

const registerPage = (req, res) => {
    try {
        res.send('Register Page');
    } catch (error) {
        console.error('Error occurred:', error);
        process.exit(1); // Exit the process with failure
    }
};

const registerUser = async (req, res) => {
    try {
        // get all data from frontend
        const { firstName, lastName, email, password } = req.body;

        // check that all the data should exist
        if (!(firstName && lastName && email && password)) {
            // send error response
            return res.status(400).send('Please send all the required data');
        }

        // check if the email and password is valid
        let data = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password
        };

        let rules = {
            firstName: 'required',
            lastName: 'required',
            email: 'required|email',
            password: 'required|min:6'
        };

        let validation = new Validator(data, rules);

        if (validation.fails() || !validator.isStrongPassword(password, {
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
                validation.errors.add('password', 'Password must be strong: should include (uppercase, lowercase, number, symbol and must be min 8 chars)');
            }
            // send error response
            return res.status(400).json({
                message: 'Validation failed',
                errors: validation.errors.all()
            });
        }

        // check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            // send error response
            return res.status(400).send('User already exists');
        }

        // hashing/encrypting the password
        const saltRounds = 12;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // save user in the db 
        const user = await User.create({
            firstName: firstName.trim(),
            lastName: lastName.trim(),
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
        process.exit(1); // Exit the process with failure
    }
};

const loginPage = (req, res) => {
    try {
        res.send('Login Page');
    } catch (error) {
        console.error('Error occurred:', error);
        process.exit(1); // Exit the process with failure
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        // check if email and password are provided
        if(!(email && password)) {
            return res.status(400).send('Please provide both email and password');
        }
        // check if the user exists
        const user = await User.findOne({ email: email.trim().toLowerCase() });
        if (!user) {
            return res.status(400).send('User not registered');
        }

        // check if the password is correct
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send('Invalid credentials');
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
        process.exit(1); // Exit the process with failure
    }
};


module.exports = {
    homePage,
    registerPage,
    registerUser,
    loginPage,
    loginUser
};