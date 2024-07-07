// initilaizing async handler
const asyncHandler = require("express-async-handler"); // bringing async for handeling async requests

const User = require("../models/userModel"); // bring user from model file
const Ticket = require("../models/ticketsModel"); //bringing the ticket model
const Note = require("../models/noteModel");

// Getting note for Ticket, Private, Route : GET api/tickets/:ticketId/notes
const getNotes = asyncHandler(async (req, res) => {
  // Getting user id from the JWT
  const user = await User.findById(req.user.id); // to check and fetch the user id from the exsisting user with the help of user model

  if (!user) {
    res.status(401);
    throw new Error("User Not Found");
  }
  //checking(fetching) the ticket with the help of ticket model
  const tickets = await Ticket.findById(req.params.ticketId);

  // to provide error if we find ticket with different user id i.e not the one who have requesed for it
  if (tickets.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User Not Authorised");
  }

  // Finding notes in with the Note model with the reff of ticket
  const notes = await Note.find({ ticket: req.params.ticketId });

  res.status(200).json(notes);
});

// Posting note for Ticket, Private, Route : POST api/tickets/:ticketId/notes
const addNote = asyncHandler(async (req, res) => {
  // Getting user id from the JWT
  const user = await User.findById(req.user.id); // to check and fetch the user id from the exsisting user with the help of user model

  if (!user) {
    res.status(401);
    throw new Error("User Not Found");
  }
  //checking(fetching) the ticket with the help of ticket model
  const tickets = await Ticket.findById(req.params.ticketId);

  // to provide error if we find ticket with different user id i.e not the one who have requesed for it
  if (tickets.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User Not Authorised");
  }

  // Finding notes in with the Note model with the reff of ticket
  const note = await Note.create({
    user: req.user.id,
    text: req.body.text,
    isStaff: false,
    ticket: req.params.ticketId,
  });

  res.status(200).json(note);
});

module.exports = {
  getNotes,
  addNote,
};
