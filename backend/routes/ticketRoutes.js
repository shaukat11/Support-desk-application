// intializing express
const express = require("express");
// intializing router to call other needed routes in the category
const router = express.Router();
const {
  getTickets,
  createTickets,
  getTicket,
  deleteTicket,
  updateTicket,
} = require("../controllers/ticketController");

const { protect } = require("../middleWare/authMiddleware"); // to authenticate the if the user is login or not (verify the user)
const noteRouter = require("./noteRoutes"); // bring other page routes so it can be used with other things

router.use("/:ticketId/notes", noteRouter); // use the back part with other router 

router.route("/").get(protect, getTickets).post(protect, createTickets); // type of route request which will be made
router
  .route("/:id")
  .get(protect, getTicket)
  .delete(protect, deleteTicket)
  .put(protect, updateTicket);

module.exports = router;
