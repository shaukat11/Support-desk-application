const mongoose = require("mongoose"); // brining mongoose

// Creating the schema for registering user
const ticketSchema = mongoose.Schema(
  {
    // writing all the required filed as per rules
    user: {
      // Tickets will be related to user
      type: mongoose.Schema.Types.ObjectId, // I think is the relation type
      required: true,
      ref: "User",
    },
    product: {
      type: String,
      required: [true, "Please select Product"],
      enum: ["iphone", "Macbook pro", "iMac", "ipad"],  
    },
    description: {
      type: String,
      required: [true, "Enter the problem you are facing with the product"],
    },
    status: {
      // if the user is admin to confirm it and provide different access
      type: String,
      required: true,
      enum: ["new", "open", "close"],
      default: "new",
    },
  },
  {
    timestamps: true, // to add time stamp per user
  }
);

module.exports = mongoose.model("Ticket", ticketSchema);
