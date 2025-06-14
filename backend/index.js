const express = require('express');
const app = express();
const { DBconnection } = require('./databases/db');
const User = require('./models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config(); // Load environment variables from .env file
DBconnection();

app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies

app.get('/', (req, res) => {
    try {
        res.send('Hello, Sayan!');
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

        // check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            // send error response
            return res.status(400).send('User already exists');
        }

        // hashing/encrypting the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // save user in the db 
        const user = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword
        });

        // generate a token for user and send it 
        const token = jwt.sign({ id: user._id, email }, process.env.SECRET_KEY, { expiresIn: '1h' });
        user.token = token;
        user.password = undefined; // remove password from the respons
        res.status(201).json({
            message: 'User registered successfully',
            user
        });
    } catch (error) {
        console.error('Error occurred:', error);
        process.exit(1); // Exit the process with failure
    }
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});