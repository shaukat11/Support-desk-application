// intializing express
const express = require("express");
// intializing router to call other needed routes in the category
const router = express.Router({ mergeParams: true });

const { getNotes, addNote } = require("../controllers/noteController");

const { protect } = require("../middleWare/authMiddleware"); // to authenticate the if the user is login or not (verify the user)

router.route("/").get(protect, getNotes).post(protect, addNote);

module.exports = router;
