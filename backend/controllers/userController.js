// initilaizing async handler
const asyncHandler = require("express-async-handler");

// Register a new user, /api/users, send public token
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  //validation
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please Fill all the given fields");
  }

  res.send("regester route");
});

// Login a user, /api/users/login,
const loginUser = asyncHandler(async (req, res) => {
  res.send("login route");
});

module.exports = {
  registerUser,
  loginUser,
};
