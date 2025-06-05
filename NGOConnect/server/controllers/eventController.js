const Event = require("../models/Event");

// Create a new event
exports.createEvent = async (req, res) => {
  const { title, description, date } = req.body;

  try {
    const newEvent = new Event({
      title,
      description,
      date,
      ngo: req.user.userId, // <-- use userId, not id
    });

    await newEvent.save();
    res
      .status(201)
      .json({ message: "Event created successfully", event: newEvent });
  } catch (error) {
    console.error("Create Event error:", error); // Add this for debugging
    res
      .status(500)
      .json({ message: "Error creating event", error: error.message });
  }
};

// Get all events for volunteers
exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json({ events }); // <-- wrap in { events }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching events", error: error.message });
  }
};

// Get events created by the logged-in NGO
exports.getOwnEvents = async (req, res) => {
  try {
    const events = await Event.find({ ngo: req.user.userId }).populate(
      "registeredVolunteers",
      "name email"
    );
    res.status(200).json({ events });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching your events", error: error.message });
  }
};
