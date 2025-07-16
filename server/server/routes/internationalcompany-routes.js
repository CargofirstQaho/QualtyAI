// internationalcompany-routes.js (Example usage with the corrected controller)

const express = require("express");
const router = express.Router();

// Import the controller instance directly
const internationalCompanyController = require("../Controllers/internationalcompanyController"); // Adjust path if needed

// Define your routes using the methods from the controller instance
router.post("/register", internationalCompanyController.createCompany);
router.get("/login", internationalCompanyController.getAllCompanies);

module.exports = router;
