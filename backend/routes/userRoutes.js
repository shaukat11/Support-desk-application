// initiizing express
const express = require("express");

// calling the router to call other routes
const router = express.Router();
const {
  registerUser,
  loginUser,
  getMe,
} = require("../controllers/userController");

const { protect } = require("../middleWare/authMiddleware");

// the api/users route
router.post("/", registerUser);

// the api/users/login route
router.post("/login", loginUser);

// the api/users/me
router.get("/me", protect, getMe);

// exporting the routers
module.exports = router;
