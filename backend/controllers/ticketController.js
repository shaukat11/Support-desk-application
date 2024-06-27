// initilaizing async handler
const asyncHandler = require("express-async-handler"); // bringing async for handeling async requests

const User = require("../models/userModel"); // bring user from model file
const Ticket = require("../models/ticketsModel"); //bringing the ticket model

// Getting User Ticket, Private, Route : GET api/tickets
const getTickets = asyncHandler(async (req, res) => {
  // Getting user id from the JWT
  const user = await User.findById(req.user.id); // to check and fetch the user id from the exsisting user with the help of user model

  if (!user) {
    res.status(401);
    throw new Error("User Not Found");
  }
  //checking(fetching) the ticket with the help of ticket model
  const tickets = await Ticket.find({ user: req.user.id });

  res.status(200).json(tickets);
});

// Getting Single Ticket, Private, Route : Get api/tickets/:id
const getTicket = asyncHandler(async (req, res) => {
  // Getting user id from the JWT
  const user = await User.findById(req.user.id); // to check and fetch the user id from the exsisting user with the help of user model

  if (!user) {
    res.status(401); // Non Authorised Code
    throw new Error("User Not Found");
  }
  //checking(fetching) the ticket with the help of ticket model
  const ticket = await Ticket.findById(req.params.id); // to get the ticket by id using params

  if (!ticket) {
    res.status(404); // Page not find Error
    throw new Error("Ticket Not Found");
  }

  // To check that the user which is requesting is the one who is created the ticket
  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not Authorised");
  }

  res.status(200).json(ticket); // Every thing is all right
});

// Creating user Ticket, Private, Route : POST api/tickets
const createTickets = asyncHandler(async (req, res) => {
  const { product, description } = req.body;

  // Asking for validation
  if (!product || !description) {
    res.status(400);
    throw new Error("Please Enter the Required Details");
  }

  // Getting user id from the JWT
  const user = await User.findById(req.user.id); // to check and fetch the user id from the exsisting user with the help of user model

  if (!user) {
    res.status(401);
    throw new Error("User Not Found");
  }

  // Creating the Ticket
  const ticket = await Ticket.create({
    product,
    description,
    user: req.user.id,
    status: "new",
  });

  res.status(201).json(ticket);
});

// Delete Single Ticket, Private, Route : DELETE api/tickets/:id
const deleteTicket = asyncHandler(async (req, res) => {
  // Getting user id from the JWT
  const user = await User.findById(req.user.id); // to check and fetch the user id from the exsisting user with the help of user model

  if (!user) {
    res.status(401); // Non Authorised Code
    throw new Error("User Not Found");
  }
  //checking(fetching) the ticket with the help of ticket model
  const ticket = await Ticket.findById(req.params.id); // to get the ticket by id using params

  if (!ticket) {
    res.status(404); // Page not find Error
    throw new Error("Ticket Not Found");
  }

  // To check that the user which is requesting is the one who is created the ticket
  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not Authorised");
  }

  await ticket.deleteOne();
  
  res.status(200).json({ success: true }); // Every thing is all right, Updating the deleted ticket with a ture message
});

// Updating the Ticket, Private, Route : PUT api/tickets/:id
const updateTicket = asyncHandler(async (req, res) => {
  // Getting user id from the JWT
  const user = await User.findById(req.user.id); // to check and fetch the user id from the exsisting user with the help of user model

  if (!user) {
    res.status(401); // Non Authorised Code
    throw new Error("User Not Found");
  }
  //checking(fetching) the ticket with the help of ticket model
  const ticket = await Ticket.findById(req.params.id); // to get the ticket by id using params

  if (!ticket) {
    res.status(404); // Page not find Error
    throw new Error("Ticket Not Found");
  }

  // To check that the user which is requesting is the one who is created the ticket
  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not Authorised");
  }

  const updatedticket = await Ticket.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json(updatedticket); // Every thing is all right
});

module.exports = {
  getTickets,
  createTickets,
  getTicket,
  deleteTicket,
  updateTicket,
};