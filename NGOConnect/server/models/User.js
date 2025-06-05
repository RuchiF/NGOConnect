const mongoose = require("mongoose");
const bcrypt = require("bcryptjs"); // <-- use bcryptjs everywhere

const userSchema = new mongoose.Schema({
  name: { type: String }, // Use 'name' instead of 'username'
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["ngo", "volunteer", "admin"],
    required: true,
  },
  organization: { type: String },
  status: { type: String, enum: ["pending", "approved"], default: "pending" },
  createdAt: { type: Date, default: Date.now },
  registeredEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }],
});

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Method to compare password
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("User", userSchema);
