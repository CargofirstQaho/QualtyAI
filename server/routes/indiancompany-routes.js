// internationalcompany-routes.js (Example usage with the corrected controller)

const express = require("express");
const router = express.Router();

// Import the controller instance directly
const IndianCompanyController = require("../Controllers/indiancompanyController"); // Adjust path if needed

// Define your routes using the methods from the controller instance

router.post("/register", IndianCompanyController.createCompany);
router.get("/login", IndianCompanyController.getAllCompanies);
module.exports = router;
