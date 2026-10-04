# frends
This project is a social web app where users post their stories.

# Steps for the Backend
1. npm init
2. npm install dependencies
3. created index.js, .gitignore and .env files
4. created controllers, middlewares, models, routers and utils folders
5. created usersModel.js and postsModel.js files inside the models folder
6. created authRouter.js
7. created authController.js for auth logics
8. Created validator.js and sendMail.js in the middlewares folder
9. created hashing.js in the utils folder
10. created identification.js to make sure users logged in are identified

### Index.js
1. imported the necessary dependencies
2. initialised an instance of express
3. used necessary middlewares including routers
4. connected to MongoDB
5. rendered the homepage
6. listened for incoming request

### usersModel.js
1. imported the necessary dependency
2. created the userSchema and set timeStamps to true for tracking record modification
3. compiled and exported the model

### postsModel.js
1. imported mongoose
2. created the postSchema
3. compiled and exported the model

### authRouter.js
1. imported express
2. imported controllers for the logic
3. defined routes for incoming signup request 
4. defined routes for incoming signin request 
5. defined routes for incoming signout request
6. defined routes for incoming email verification request
7. exported router

### authController.js
1. imported jwt for token generation
2. imported the input validators from validator.js and transport from sendMail.js
3. imported the user model from models/usersModel.js
4. imported the doHash, doHashValidation and hmacProcess functions from utils/hashing.js
5. exported signup logic function which is first validated in the try block
6. if there's error or user exists, success is false and the json response status of 401
7. if no error, hash and store the hashed password
8. exported signin logic function which is first validated in the try block
9. if there's error or user does not exist, success is false and the json response status of 401
10. on success, check if the password is not valid
11. if valid, generate token and send response cookies, expiring them in 8 hours.
12. exported signout logic function
13. exported the email verification logic.
14. checking if user exist or user already verified before creating and sending the codeValue
15. if code was sent, store the hashed value in the database
16. exported the function that verifies that the user inputed code tallies with database

### validator.js
1. imported joi
2. created and exported schema for data validation
3. The object checks the email and password for specific properties
4. copied the signupSchema for signinSchema
5. created and exported the email verification code schema

### hashing.js
1. import hash and compare as objects from bcryptjs
2. export the salting function that returns the hashes to be stored in the database
3. export the password doHashvalidation function that compares user input to database hash
4. export the email verification code hasher made with hmacProcess

### sendMail.js
1. import nodemailer
2. create transport middleware
3. export transport