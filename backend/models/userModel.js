const mongoose = require("mongoose"); // brining mongoose

// Creating the schema for registering user
const userSchema = mongoose.Schema(
  {
    // writing all the required filed as per rules
    name: {
      type: String,
      required: [true, "Please Add Name"],
    },
    email: {
      type: String,
      required: [true, "Please Add Email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please Add Email"],
    },
    isAdmin: {
      // if the user is admin to confirm it and provide different access
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true, // to add time stamp per user
  }
);

module.exports = mongoose.model("User", userSchema);
