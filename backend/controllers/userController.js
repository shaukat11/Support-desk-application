// initilaizing async handler
const asyncHandler = require("express-async-handler"); // bringing async for handeling async requests
const bcrpt = require("bcryptjs"); // bringing the bcrypt to encrpt passwards
const jwt = require("jsonwebtoken"); // bringing jsonwebtoken from jsonwt package

const User = require("../models/userModel"); // bring user from model file

// Register a new user, /api/users, send public token
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  //validation
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please Fill all the given fields");
  }

  // Find if user already Exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User Already Exists");
  }

  // Hashing the passward
  const salt = await bcrpt.genSalt(10); // using the .genSalt() method as recommeded from documentation
  const hashedPassward = await bcrpt.hash(password, salt);

  // Create User
  const user = await User.create({
    name,
    email,
    password: hashedPassward,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid User Data");
  }
});

// Login a user, /api/users/login,
const loginUser = asyncHandler(async (req, res) => {
  //getting the data from the body
  const { name, email, password } = req.body;
  console.log(email, password);
  //Finding the user
  const user = await User.findOne({ email });

  // To check the user and compare the plain text password with the hash passward
  if (user && (await bcrpt.compare(password, user.password))) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Credentials");
  }
});

// Token Generator for JSON
const generateToken = (id) => {
  return jwt.sign({id}, process.env.JWT_SECRET, {
    expiresIn : '30d'
  })
};

module.exports = {
  registerUser,
  loginUser,
};
