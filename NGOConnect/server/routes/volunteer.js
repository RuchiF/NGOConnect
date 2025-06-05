const express = require("express");
const router = express.Router();
const { authenticate } = require("../middleware/auth");
const { authorize } = require("../middleware/role");
const { getAllEvents } = require("../controllers/eventController");
const { registerForEvent, getRegisteredEvents } = require("../controllers/volunteerController");

// Get all events for volunteers
router.get("/events", authenticate, authorize("volunteer"), getAllEvents);

// Register for an event
router.post("/register/:eventId", authenticate, authorize("volunteer"), registerForEvent);

// Get registered events for the logged-in volunteer
router.get("/registered-events", authenticate, authorize("volunteer"), getRegisteredEvents);

module.exports = router;
