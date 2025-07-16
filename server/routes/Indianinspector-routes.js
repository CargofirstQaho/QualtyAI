// routes/indianinspector-routes.js
const express = require("express");
const router = express.Router();
// Changed variable name to indianInspectorController for consistency
const indianInspectorController = require("../Controllers/IndianinspectorController");
// Ensure this path is correct

// Define API routes and link them to controller functions
// These routes will interact with the functions defined in indianinspector-controller.js
router.get("/login", indianInspectorController.getAllInspectors); // GET /api/inspectors
// GET /api/inspectors/:id
router.post("/Register", indianInspectorController.addInspector); // POST /api/inspectors
// DELETE /api/inspectors/:id

module.exports = router;
