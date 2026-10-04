// import the signup validator from an object class
const { signupSchema } = require("../middlewares/validator.js");

//import the User model
const User = require("../models/usersModel.js");

// import the dohash function from utils folder
const { doHash } = require("../utils/hashing.js");

// signup logic
exports.signup = async (req, res) => {
  const { email, password } = req.body;
  try {
    const { error, value } = signupSchema.validate({ email, password });
    if (error) {
      return res
        .status(401)
        .json({ success: false, message: error.details[0].message });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(401)
        .json({ success: false, message: "User already exists!" });
    }
    const hashedPassword = await doHash(password, 12);
    const newUser = new User({ email: email, password: hashedPassword });
    const result = await newUser.save(); // this line returns the email and hashPassword
    result.password = undefined;
    res
      .status(201)
      .json({
        success: true,
        message: "Your account has been created successfully!",
        result
      });
  } catch (error) {
    console.log(error);
  }
};
