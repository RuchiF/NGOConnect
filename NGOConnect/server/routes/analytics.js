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
    const events = await Event.find({ ngo: ngoId }).populate(
      "registeredVolunteers"
    );

    // Total events
    const totalEvents = events.length;

    // Total unique volunteers across all events
    const volunteerSet = new Set();
    events.forEach((event) => {
      (event.registeredVolunteers || []).forEach((vol) => {
        if (vol && vol._id) volunteerSet.add(vol._id.toString());
      });
    });
    const totalVolunteers = volunteerSet.size;

    // Most popular event (by number of registered volunteers)
    let mostPopularEvent = null;
    let maxVolunteers = -1;
    events.forEach((event) => {
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

// GET /api/analytics/leaderboard
router.get("/leaderboard", async (req, res) => {
  try {
    // Find all volunteers
    const volunteers = await User.find({ role: "volunteer" })
      .populate("registeredEvents")
      .lean();

    // Sort by number of registered events (descending)
    const leaderboard = volunteers
      .map((v) => ({
        _id: v._id,
        name: v.name,
        email: v.email,
        eventsCount: v.registeredEvents ? v.registeredEvents.length : 0,
      }))
      .sort((a, b) => b.eventsCount - a.eventsCount)
      .slice(0, 10); // Top 10

    res.json({ leaderboard });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch leaderboard." });
  }
});

module.exports = router;
