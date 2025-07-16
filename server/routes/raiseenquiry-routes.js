// server/routes/raiseenquiry-routes.js (Express Routes)

const db = require("../models");
const express = require("express");

const router = express.Router();

const raiseenquiryController = require("../Controllers/RaiseEnquiryController"); // Adjust path as necessary

// Define the POST route for submitting an inquiry
// This route will call the createInquiry function from the controller
router.post("/inquiries", raiseenquiryController.createRaiseEnquiry);

module.exports = router;
