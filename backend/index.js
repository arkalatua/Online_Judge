const express = require('express');
const app = express();
const { DBconnection } = require('./databases/db');
const User = require('./models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Validator = require('validatorjs');
const validator = require('validator');

require('dotenv').config(); // Load environment variables from .env file
DBconnection();


app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies


app.get('/', (req, res) => {
    try {
        res.send('Hello, World!');
    } catch (error) {
        console.error('Error occurred:', error);
        process.exit(1); // Exit the process with failure
    }
});



app.post('/register', async (req, res) => {
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
            firstName : firstName.trim(),
            lastName : lastName.trim(),
            email : email.trim().toLowerCase(),
            password: hashedPassword
        });

        // generate a token for user and send it 
        const token = jwt.sign(
            { id: user._id, email }, 
            process.env.SECRET_KEY, 
            { expiresIn: '1h' }
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
});


app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});