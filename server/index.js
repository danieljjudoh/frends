// Import necessary dependencies
const express = require("express");
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

// importing routers
const authRouter = require('./routers/authRouter');

// Initialising an instance of express
const app = express();

// Middlewares
app.use(cors());
app.use(helmet());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Database connected")
    })
    .catch((err) => {
    console.error("Database connection failed!", err)
    })

// custom middlewares
app.use('/api/auth', authRouter)

// Render the homepage
app.get('/', (req,res) => {
    res.json({message: "Hello from the server"})
});

// Starting the server to listen on port 8000
app.listen(process.env.PORT, () => {
    console.log("Listening for incoming request...")
});