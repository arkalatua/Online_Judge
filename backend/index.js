const express = require('express');
const app = express();
const { DBconnection } = require('./databases/db');
const router = require('./routes/routes-auth');
const cors = require('cors');
const router_problems = require('./routes/routes-problems');

app.use(cors());

require('dotenv').config(); // Load environment variables from .env file
DBconnection();


app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies

app.use("/problems", router_problems); 
app.use("/" , router);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});