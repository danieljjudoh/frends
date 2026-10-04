// import jsonwebtoken for token generation
const jwt = require("jsonwebtoken");

// import the signup validator from an object class
const { signupSchema, signinSchema } = require("../middlewares/validator.js");

// import transport from sendMail.js
const transport = require("../middlewares/sendMail.js");

//import the User model
const User = require("../models/usersModel.js");

// import all functions from utils folder
const {
  doHash,
  doHashValidation,
  hmacProcess,
} = require("../utils/hashing.js");

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
    res.status(201).json({
      success: true,
      message: "Your account has been created successfully!",
      result,
    });
  } catch (error) {
    console.log(error);
  }
};

// create the signin logic flow
exports.signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const { error, value } = signinSchema.validate({ email, password });
    if (error) {
      return res
        .status(401)
        .json({ success: false, message: "error.details[0].message" });
    }
    const existingUser = await User.findOne({ email }).select("+password");
    if (!existingUser) {
      return res
        .status(401)
        .json({ success: false, message: "User does not exist!" });
    }
    const result = await doHashValidation(password, existingUser.password);
    if (!result) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials!" });
    }
    const token = jwt.sign(
      {
        userId: existingUser._id,
        email: existingUser.email,
        verified: existingUser.verified,
      },
      process.env.TOKEN_SECRET,
      {
        expiresIn: "8h",
      },
    );
    res
      .cookie("Authorization", "Bearer" + token, {
        expires: new Date(Date.now() + 8 * 3600000),
        httpOnly: process.env.NODE_ENV === "production",
        secure: process.env.NODE_ENV === "production",
      })
      .json({
        success: true,
        token,
        message: "logged in successfully!",
      });
  } catch (error) {
    console.error(error);
  }
};

// creating the signout logic flow
exports.signout = (req, res) => {
  res
    .clearCookie("Authorization")
    .status(200)
    .json({ success: true, message: "logged out successfully!" });
};

// email verification logic
exports.sendVerificationCode = async (req, res) => {
  const { email } = req.body;
  try {
    const existingUser = User.findOne({ email });
    if (!existingUser) {
      return res
        .status(401)
        .json({ success: false, message: "User does not exist!" });
    }
    if (existingUser.verified) {
      return res
        .status(400)
        .json({ success: false, message: "You are already verified!" });
    }
    const codeValue = Math.floor(Math.random() * 1000000).toString();
    let info = await transport.sendMail({
      from: process.env.NODE_CODE_SENDING_EMAIL_ADDRESS,
      to: existingUser.email,
      subject: "Verification Code",
      html: "<h1>" + codeValue + "<h1>",
    });
    if (info.accepted[0] === existingUser.email) {
      const hashedCodeValue = hmacProcess(
        codeValue,
        process.env.HMAC_VERIFICATION_CODE_SECRET,
      );
      existingUser.verificationCode = hashedCodeValue;
      existingUser.verificationCodeValidation = Date.now();
      await existingUser.save();
      return res.status(200).json({ success: true, message: "Code sent!" });
    }
    return res
      .status(400)
      .json({ success: false, message: "Code send failed!" });
  } catch (error) {
    console.error(error);
  }
};