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
8. Created validator.js in the middlewares folder
9. created hashing.js in the utils folder

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
3. defined routes for incoming request
4. exported router

### authController.js
1. imported the email and password checker from validator.js
2. imported the user model from models/usersModel.js
3. imported the dohash function from utils/hashing.js
4. exported signup logic function which is first validated in the try block
5. if there's error or user exists, success is false and the json response status of 401
6. if no error, hash and store the password

### validator.js
1. imported joi
2. created and exported schema for data validation
3. The object checks the email and password for specific properties
4. 

### hashing.js
1. import hash as an object from bcryptjs
2. export the salting function that returns the hashes to be stored in the database