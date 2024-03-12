const jwt = require("jsonwebtoken"); //bringing jwt token's
const asyncHandler = require("express-async-handler"); // bringing async for handeling async requests
const User = require("../models/userModel");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  // to check weather we have the token to protect the routes inside our header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header    using array split method to get the token with the help of split array method and 1 index i.e. the token
      token = req.headers.authorization.split(" ")[1];

      // Verfy the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // Getting user from token with user id in token
      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Not Authorised");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not Authorised");
  }
});

module.exports = { protect };
