const mongoose = require("mongoose"); // bringing mongoose

// creating a function async function to connet to database
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI); // connection uri
    console.log(`MongoDB Connected : ${conn.connection.host}`.cyan.underline); // loging the connection confirmation with use of colors
  } catch (error) {
    console.log(`Error : ${error.message}`.red.underline.bold); // reporting the error
    process.exit(1); // if error termination the process without moving further
  }
};

module.exports = connectDB;
