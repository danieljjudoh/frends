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
1. exported signup logic function
2. 

### validator.js
1. imported joi
2. created and exported schema for data validation