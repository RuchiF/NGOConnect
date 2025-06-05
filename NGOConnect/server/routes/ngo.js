const express = require("express");
const router = express.Router();
const { authenticate } = require("../middleware/auth");
const { authorize } = require("../middleware/role");
const { createEvent, getOwnEvents } = require("../controllers/eventController");

// NGO creates a new event
router.post("/events", authenticate, authorize("ngo"), createEvent);

// NGO gets their own events
router.get("/events", authenticate, authorize("ngo"), getOwnEvents);

module.exports = router;