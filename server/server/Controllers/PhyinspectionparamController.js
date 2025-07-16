// server/controllers/PhyinspectionparamController.js
const db = require("../models");
const Phyinspectionparam = db.Phyinspectionparam;

// Controller function to save a single physical inspection parameter set
exports.savePhyInspectionParam = async (req, res) => {
  try {
    // Extract data from the request body
    const {
      broken,
      purity,
      yellowKernel,
      damageKernel,
      redKernel,
      paddyKernel,
      chalkyRice,
      liveInsects,
      millingDegree, // Expected to be a STRING (e.g., "Well Milled")
      averageGrainLength,
    } = req.body;

    // Basic validation
    // Validating millingDegree as a STRING from the allowed list.
    if (
      typeof broken !== "number" ||
      broken < 0 ||
      typeof purity !== "number" ||
      purity < 0 ||
      purity > 100 ||
      typeof yellowKernel !== "number" ||
      yellowKernel < 0 ||
      typeof damageKernel !== "number" ||
      damageKernel < 0 ||
      typeof redKernel !== "number" ||
      redKernel < 0 ||
      typeof paddyKernel !== "number" ||
      paddyKernel < 0 ||
      typeof chalkyRice !== "number" ||
      chalkyRice < 0 ||
      typeof liveInsects !== "number" ||
      liveInsects < 0 ||
      typeof millingDegree !== "string" ||
      !["Under Milled", "Well Milled", "Over Milled"].includes(millingDegree) ||
      typeof averageGrainLength !== "number" ||
      averageGrainLength < 0
    ) {
      return res.status(400).json({
        message:
          "Invalid input data. Please check all fields and ensure they are valid numbers, and 'millingDegree' is one of 'Under Milled', 'Well Milled', 'Over Milled'.",
      });
    }

    // Create the record using the model's standard `create` method
    const savedParam = await Phyinspectionparam.create({
      broken,
      purity,
      yellowKernel,
      damageKernel,
      redKernel,
      paddyKernel,
      chalkyRice,
      liveInsects,
      millingDegree, // Save the string value for millingDegree
      averageGrainLength,
    });

    // Respond with the saved data
    res.status(201).json({
      message: "Physical inspection parameter saved successfully!",
      data: savedParam,
    });
  } catch (error) {
    console.error("Error saving physical inspection parameter:", error);
    // Handle Sequelize validation errors specifically
    if (error.name === "SequelizeValidationError") {
      const errors = error.errors.map((err) => err.message);
      return res.status(400).json({ message: "Validation error", errors });
    }
    // Generic error response for other unexpected errors
    res.status(500).json({
      message: "Error saving physical inspection parameter",
      error: error.message,
    });
  }
};

// Controller function to retrieve all physical inspection parameters
exports.getAllPhyInspectionParams = async (req, res) => {
  try {
    const params = await Phyinspectionparam.findAll({
      order: [["createdAt", "DESC"]],
      attributes: [
        "id",
        "broken",
        "purity",
        "yellowKernel",
        "damageKernel",
        "redKernel",
        "paddyKernel",
        "chalkyRice",
        "liveInsects",
        "millingDegree",
        "averageGrainLength",
      ],
    });
    res.status(200).json({
      message: "Physical inspection parameters retrieved successfully.",
      data: params,
    });
  } catch (error) {
    console.error("Error fetching physical inspection parameters:", error);
    res.status(500).json({
      message: "Error fetching physical inspection parameters",
      error: error.message,
    });
  }
};
