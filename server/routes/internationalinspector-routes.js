// routes/internationalinspector-routes.js
const db = require("../models");
const express = require("express");

const router = express.Router();

// Import the controller (correct relative path from routes to Controllers)
const inspectorController = require("../Controllers/internationalinspectorController");

// Define routes
router.get("/login", inspectorController.getAllInspectors);
router.post("/Register", inspectorController.createInspector);

// Export the router
module.exports = router;
