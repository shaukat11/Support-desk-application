// initializing express (bringing express)
const express = require("express");

// Creating the env files
const dotenv = require("dotenv").config();

//importing the errorhandler file
const { errorHandler } = require("./middleWare/errorMiddleware");

// initializing the port || or operator
const PORT = process.env.PORT || 5000;

// initializing app with express
const app = express();

// to get data from body
app.use(express.json());
// to get url incoded data add this
app.use(express.urlencoded({ extended: false }));


// Creating Route
app.get("/", (req, res) => {
  res.status(200).json({ Message: "Welcome to the hub Man" });
});

// Routes for all pages, to use the userRoutes we initilize we uses the use
app.use("/api/users", require("./routes/userRoutes"));
// using errorhandler
app.use(errorHandler);

// Making(listening) the port to start the server
app.listen(PORT, () => console.log(`Server is working on the port ${PORT}`));
