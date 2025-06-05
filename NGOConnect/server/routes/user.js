const express = require("express");
const {
  getUserProfile,
  updateUserProfile,
} = require("../controllers/userController");
console.log("getUserProfile:", getUserProfile);
console.log("updateUserProfile:", updateUserProfile);
const { authenticate } = require("../middleware/auth");
const { authorize } = require("../middleware/role");

const router = express.Router();

// Route to get user profile
router.get("/profile", authenticate, getUserProfile);

// Route to update user profile
router.put(
  "/profile",
  authenticate,
  authorize("ngo", "volunteer", "admin"),
  updateUserProfile
);

module.exports = router;
