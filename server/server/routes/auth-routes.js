// server/routes/authRoutes.js (or similar name)
const express = require("express");
const router = express.Router();
const authController = require("../Controllers/auth-controller"); // Adjust path if needed

// Route for user login
// This will handle POST requests to /api/auth/login
router.post("/login", authController.login);

// Route for user registration
// This will handle POST requests to /api/auth/register
router.post("/register", authController.register);

module.exports = router;
