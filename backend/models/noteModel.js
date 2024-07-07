const mongoose = require("mongoose"); // brining mongoose

// Creating the schema for taking note from user
const noteSchema = mongoose.Schema(
  {
    // writing all the required filed as per rules
    user: {
      // to get the referrence who is the user who have added the notes
      type: mongoose.Schema.Types.ObjectId, // I think is the relation type
      required: true,
      ref: "User",
    },
    ticket: {
      // Tickets will be related to Ticket
      type: mongoose.Schema.Types.ObjectId, // I think is the relation type
      required: true,
      ref: "Ticket",
    },
    text: {
      type: String,
      required: [true, "Please Add Some Text"],
    },
    isStaff: {
      // in future if we are assinging staff to that individual note or user complain or chat
      type: Boolean,
      default: false,
    },
    staffId: {
      // Id of that staff member
      type: String,
    },
  },
  {
    timestamps: true, // to add time stamp per user
  }
);

module.exports = mongoose.model("Note", noteSchema);
