# frends
This project is a social web app where users post their stories.

# Steps for the Backend

## 🚀 Backend Development Blueprint: Step-by-Step Implementation Guide

Welcome to the team! You will be building a secure, production-ready RESTful API using Node.js, Express, and MongoDB (Mongoose).
To ensure the application is stable and easy to debug, complete the development in the exact order detailed below. Do not move to the next phase until you have verified the current phase works.


## 📂 Recommended Project Structure

Before writing any code, initialize your project and create your directory structure to match this clean architectural pattern:

"""
├── config/
│   └── db.js
├── controllers/
│   ├── authController.js
│   └── postController.js
├── middlewares/
│   ├── identification.js
│   └── validator.js
├── models/
│   ├── postsModel.js
│   └── userModel.js
├── routers/
│   ├── authRouter.js
│   └── postRouter.js
├── utils/
│   ├── hashing.js
│   └── sendMail.js
├── .env
├── package.json
└── server.js
"""


## 🛠️ Phase 1: Environment Setup & Core Configuration

Goal: Initialize the runtime workspace, install your tools, and get a basic server running.
1. Initialize Project: Run npm init -y in a blank directory.
2. Install Dependencies: Run the following commands to install required tools:
	• Core: npm i express mongoose cors helmet cookie-parser jsonwebtoken bcryptjs joi nodemailer
	• Development: npm i -D nodemon
3. Environment Workspace (.env): Create a .env file at the root. Populate it with your local configurations:

"""
PORT=5000
MONGO_URI=mongodb://localhost:27017/your_db_name
TOKEN_SECRET=your_super_long_jwt_secret_key
HMAC_VERIFICATION_CODE_SECRET=your_hmac_secret_key
NODE_CODE_SENDING_EMAIL_ADDRESS=your_gmail_address@gmail.com
NODE_CODE_SENDING_EMAIL_PASSWORD=your_16_character_google_app_password
NODE_ENV=development
"""

4. Configure Base Entry (server.js): Implement your main entry comments (Step 1 through Step 4, and Step 7 & 8). Launch the app using nodemon server.js and verify it boots up without errors on your configured port.



## 💾 Phase 2: Database Schema & Connectivity

Goal: Bridge your application securely to MongoDB and lay down your data layer structures.
1. Database Module Configuration: Move your database connection logic into a modular file (e.g., config/db.js or directly inside server.js matching Step 5 of your server comments). Ensure successful connection logs appear in your console.
2. Implement User Model (models/userModel.js): Write out your User schema. Pay close attention to setting up select: false on sensitive credentials to prevent accidental leaks.
3. Implement Post Model (models/postsModel.js): Write out your Post schema. Ensure the userId field is configured as an explicit ObjectId referencing the "User" model.



## 🔐 Phase 3: Cryptography Utilities & Validation Schemas

Goal: Build the underlying security tools before starting on your routes or business logic.
1. Implement Security Utilities (utils/hashing.js): Code your password hashing (doHash), password comparison (doHashValidation), and token security processor (hmacProcess) utilities.
2. Implement Payload Gatekeeper (middlewares/validator.js): Code your Joi validation object structures exactly as blueprinted.
3. Testing Checkpoint: Write a temporary execution script or test block to confirm your regex correctly flags a bad password layout, and that your hmacProcess returns a valid, consistent hex string.


## 🛰️ Phase 4: Mailer Utilities & Gatekeeper Middleware

Goal: Complete your infrastructure layer by configuring communication and security middleware modules.
1. Implement Email Transport Pipeline (utils/sendMail.js): Set up your Nodemailer transport engine.
2. Implement Route Guard Middleware (middlewares/identification.js): Code your identifier logic.
	• Make sure it safely handles token extraction for both web browsers (via secure cookies) and mobile apps/Postman (via request headers).
	• Crucial: Implement the catch-block safety fix so failed token authentications return a structured error code rather than hanging your system infinitely.



## 🔑 Phase 5: Authentication Routing & Controller Engines

Goal: Bring your user system online by combining validation schemas with operational database logic.
1. Map Authentication Strategy Routes (routers/authRouter.js): Define your routes. Bind your identifier middleware before your protected controller paths execution.
2. Mount Auth Pipeline (server.js): Update your root entry file to mount the authRouter onto /api/auth (Matching Step 6 of your main server blueprint).
3. Code Authentication Logic (controllers/authController.js): Implement your endpoints sequentially:
	• Code signup and check database storage formatting using a database client (like MongoDB Compass).
	• Code signin and confirm your token cookie is successfully received by your testing client.
	• Complete the rest of the verification and password lifecycle controllers.



## 📝 Phase 6: Post Routing, Controller Logic, & Access Control

Goal: Deploy your blog feature sets and lock down mutations with robust ownership checks.
1. Map Post Operations Routes (routers/postRouter.js): Set up your endpoints. Note that all post management paths require the identifier middleware block before hitting handlers.
2. Mount Post Pipeline (server.js): Mount your postRouter onto /api/posts.
3. Code Blog Logic (controllers/postController.js):
	• Code createPost and getPosts (implementing the skipping offset multiplier math required for pagination).
	• Code the singlePost lookup handler.
	• Write Data Shield Handlers: Code updatePost and deletePost. Ensure you cast database object fields to a string (.toString()) before doing equality evaluations against request context identities to enforce correct item ownership.



## 🧪 Phase 7: End-to-End API Integration Testing

Goal: Confirm that your entire ecosystem runs seamlessly as a unified machine.
Using an API client (like Postman, Insomnia, or the VS Code Thunder Client extension), execute these testing operations in sequence to confirm everything works perfectly:
• Test Case A (Signup & Login): Register a new user profile \(\rightarrow \) Verify the password is encrypted in MongoDB \(\rightarrow \) Log in \(\rightarrow \) Verify a secure bearer token or cookie is successfully issued.
• Test Case B (Verification): Trigger send-verification-code \(\rightarrow \) Capture the code \(\rightarrow \) Submit it to verify-verification-code \(\rightarrow \) Confirm your user document's verified boolean swaps smoothly from false to true.
• Test Case C (Creation & Paginated Feed): Log in \(\rightarrow \) Generate 12 distinct posts \(\rightarrow \) Execute a request to /api/posts/all-posts?page=2 \(\rightarrow \) Confirm you receive exactly 2 posts sorted in reverse chronological order.
• Test Case D (Security & Restrictions): Register a second user profile \(\rightarrow \) Log in as User 2 \(\rightarrow \) Attempt to update or delete a post generated by User 1 \(\rightarrow \) Confirm your system rejects the execution with an explicit 403 Unauthorized status code.



## 💡 Pro-Tips for Success:

• Keep Code Flat: Use the Guard Clause Pattern. Check for missing data or bad credentials early and return your error responses immediately. This prevents deeply nested if/else structures.
• Log Extensively: If a route is acting up, drop console.log() checkpoints right before your database actions to see exactly what shape your arguments look like before queries execute.
• Handle Errors Cleanly: Wrap all your controller database actions inside try/catch pipelines to ensure unexpected runtime issues never trigger an outright node application crash.
