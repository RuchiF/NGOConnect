const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.signup = async (req, res) => {
  try {
    const { name, email, password, role, organization } = req.body;

    // Basic validation
    if (!email || !password || !role) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields." });
    }
    if ((role === "ngo" && !organization) || (role !== "admin" && !name)) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields." });
    }

    // Check if user exists
    const existingUser = await User.findOne({ email, role });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists with this email and role." });
    }

    // Do NOT hash password here!
    // Create user
    const user = new User({
      name: role !== "admin" ? name : undefined,
      email,
      password, // plain password, will be hashed by pre-save hook
      role,
      organization: role === "ngo" ? organization : undefined,
      status: role === "ngo" ? "pending" : "approved",
    });

    await user.save();

    // JWT Token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        organization: user.organization,
        status: user.status,
      },
    });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Server error during signup." });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    console.log("Login attempt:", { email, role });

    if (!email || !password || !role) {
      console.log("Missing required fields");
      return res
        .status(400)
        .json({ message: "Please provide all required fields." });
    }

    const user = await User.findOne({ email, role });
    if (!user) {
      console.log("User not found for email/role:", email, role);
      return res.status(400).json({ message: "Invalid credentials." });
    }

    // For NGO, check if approved
    if (role === "ngo" && user.status !== "approved") {
      console.log("NGO not approved:", user.email, user.status);
      return res.status(403).json({ message: "NGO account not approved yet." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("Password mismatch for user:", email);
      return res.status(400).json({ message: "Invalid credentials." });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    console.log("Login successful for:", email, role);

    res.json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        organization: user.organization,
        status: user.status,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error during login." });
  }
};
