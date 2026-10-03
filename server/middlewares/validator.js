const joi = require('joi');

exports.signupSchema = joi.object({
    email: joi.string().min(10).max(60).required().email({
        tlds: {allow:['com','net']}
    })
})