const express = require("express");
const { createEvent, getAllEvents } = require("../controllers/eventController");
const { authenticate } = require("../middleware/auth");
const { authorize } = require("../middleware/role");

const router = express.Router();

// Route for creating an event (NGO only)
router.post("/", authenticate, authorize("ngo"), createEvent);

// Route for getting all events (Volunteer only)
router.get("/", authenticate, authorize("volunteer"), getAllEvents);

module.exports = router;
