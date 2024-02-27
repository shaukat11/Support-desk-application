// initiizing express
const express = require("express");

// calling the router to call other routes
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/userController");

// the api/user route
router.post("/", registerUser); 

// the api/user/login route
router.post("/login", loginUser);

// exporting the routers
module.exports = router;
