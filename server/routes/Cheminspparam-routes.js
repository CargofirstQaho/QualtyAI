const db = require("../models");
const express = require("express");

const router = express.Router();

// Import the controller (correct relative path from routes to Controllers)
const ChemicalinspparamController = require("../Controllers/CheminsparamController");

// Define routes

router.post("/save", ChemicalinspparamController.saveChemicalParameters);

// Export the router
module.exports = router;
