const Event = require("../models/Event");
const User = require("../models/User");

// Register for an event
exports.registerForEvent = async (req, res) => {
  const userId = req.user.userId;
  const eventId = req.params.eventId;

  // Add event to user's registeredEvents
  await User.findByIdAndUpdate(userId, {
    $addToSet: { registeredEvents: eventId },
  });

  // Add user to event's registeredVolunteers
  await Event.findByIdAndUpdate(eventId, {
    $addToSet: { registeredVolunteers: userId },
  });

  res.status(200).json({ message: "Registered successfully!" });
};

// Get registered events for the logged-in volunteer
exports.getRegisteredEvents = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).populate(
      "registeredEvents"
    );
    res.status(200).json({ events: user.registeredEvents || [] });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Failed to fetch registered events",
        error: error.message,
      });
  }
};
