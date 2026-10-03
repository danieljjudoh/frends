// Import Mongoose
const mongoose = require('mongoose');

// Create postSchema
const postSchema = mongoose.Schema({
    title:{
        type: String,
        required: [true, "A suitable title is required!"],
        trim: true,
    },
    description:{
        type: String,
        required: [true, "Description is required!"],
        trim: true,
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Post", postschema);