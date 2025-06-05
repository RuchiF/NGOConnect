const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Event = require("../models/Event");

// GET /api/analytics/ngo/:id
router.get("/ngo/:id", async (req, res) => {
  try {
    const ngoId = req.params.id;

    // Find the NGO user
    const ngoUser = await User.findById(ngoId);
    if (!ngoUser || ngoUser.role !== "ngo") {
      return res.status(404).json({ message: "NGO not found." });
    }

    // Get all events created by this NGO
    const events = await Event.find({ ngo: ngoId }).populate("registeredVolunteers");

    // Total events
    const totalEvents = events.length;

    // Total unique volunteers across all events
    const volunteerSet = new Set();
    events.forEach(event => {
      (event.registeredVolunteers || []).forEach(vol => {
        if (vol && vol._id) volunteerSet.add(vol._id.toString());
      });
    });
    const totalVolunteers = volunteerSet.size;

    // Most popular event (by number of registered volunteers)
    let mostPopularEvent = null;
    let maxVolunteers = -1;
    events.forEach(event => {
      const count = (event.registeredVolunteers || []).length;
      if (count > maxVolunteers) {
        maxVolunteers = count;
        mostPopularEvent = event;
      }
    });

    res.json({
      totalEvents,
      totalVolunteers,
      mostPopularEvent: mostPopularEvent
        ? { title: mostPopularEvent.title, _id: mostPopularEvent._id }
        : null,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch analytics." });
  }
});

module.exports = router;