const express = require("express");
const router = express.Router();
const { authenticate } = require("../middleware/auth");
const { authorize } = require("../middleware/role");
const { getAllEvents } = require("../controllers/eventController");
const {
  registerForEvent,
  getRegisteredEvents,
} = require("../controllers/volunteerController");

// Get all events for volunteers
router.get("/events", authenticate, authorize("volunteer"), getAllEvents);

// Register for an event
router.post(
  "/register/:eventId",
  authenticate,
  authorize("volunteer"),
  registerForEvent
);

// Get registered events for the logged-in volunteer
router.get(
  "/registered-events",
  authenticate,
  authorize("volunteer"),
  getRegisteredEvents
);

// GET /api/volunteer/:id/profile
router.get("/:id/profile", async (req, res) => {
  try {
    const volunteer = await User.findById(req.params.id).lean();
    if (!volunteer || volunteer.role !== "volunteer") {
      return res.status(404).json({ message: "Volunteer not found" });
    }
    const events = await Event.find({
      _id: { $in: volunteer.registeredEvents },
    })
      .select("title date")
      .sort({ date: -1 })
      .lean();

    // Check if this volunteer is in the top 3 by event count
    const topVolunteers = await User.find({ role: "volunteer" })
      .sort({ registeredEvents: -1 })
      .limit(3)
      .select("_id")
      .lean();
    const topVolunteer = topVolunteers.some(
      (v) => v._id.toString() === volunteer._id.toString()
    );

    res.json({
      profile: {
        _id: volunteer._id,
        name: volunteer.name,
        email: volunteer.email,
        eventsCount: volunteer.registeredEvents.length,
      },
      events,
      topVolunteer,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch profile" });
  }
});

module.exports = router;
