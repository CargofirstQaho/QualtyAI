const db = require("../models");
const express = require("express");

const router = express.Router();

// Import the controller (correct relative path from routes to Controllers)
const PhyInspectionController = require("../Controllers/PhyinspectionparamController");

// Define routes

router.post("/save", PhyInspectionController.savePhyInspectionParam);

// Export the router
module.exports = router;
