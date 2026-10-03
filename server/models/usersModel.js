// Import the necessary dependency
const mongoose = require("mongoose");

// Create the schema
const userSchema = mongoose.Schema({
    email:{
        type: String,
        required: [true, "Email is required!"],
        trim: true,
        unique: [true, "Email must be unique!"],
        minLength: [10, "Email must have minimum of 10 characters!"],
        lowercase: true,
    },
    password:{
        type: String,
        required: [true, "Password must be provided!"],
        trim: true,
        minLength: [8, "Password length must be a minimum of 8 characters!"],
        select: false,
    },
    verified:{
        type: Boolean,
        default: false,
    },
    verificationCode:{
        type: String,
        select: false,
    },
    verificationCodeValidation:{
        type: Number,
        select: false,
    },
    forgotPasswordCode:{
        type: String,
        select: false,
    },
    forgotPasswordCodeValidation:{
        type: Number,
        select: false,
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("User", userSchema);