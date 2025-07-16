// server/controllers/cheminsparamController.js
// This file manages the creation, retrieval, updating, and deletion of chemical parameter templates.

const db = require("../models"); // Adjust path to your db setup where models are initialized
const CheminsParam = db.CheminsParam; // Access the CheminsParam model

// Note: No 'bcryptjs' or 'Op' imports are needed for this controller's current logic.

/**
 * Saves one or more chemical parameters.
 * Expects `req.body` to be an array of chemical parameter objects.
 * Each object should have at least `parameter_name`.
 * Optional fields: `min_value`, `max_value`, `unit`.
 * This function allows you to create new chemical parameter templates in the database.
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {function} next - Express next middleware function.
 */
exports.saveChemicalParameters = async (req, res, next) => {
  try {
    const chemicalParameters = req.body; // Expecting an array of chemical parameter objects

    if (!Array.isArray(chemicalParameters) || chemicalParameters.length === 0) {
      return res.status(400).json({
        message:
          "No chemical parameters provided. Please send an array of chemical parameter objects.",
      });
    }

    const savedParameters = [];
    for (const param of chemicalParameters) {
      if (!param.parameter_name) {
        return res.status(400).json({
          message: "Each chemical parameter must have a parameter_name.",
        });
      }
      // Use Sequelize's create method to save to the database
      const newParam = await CheminsParam.create(param);
      savedParameters.push(newParam);
    }

    res.status(201).json({
      message: "Chemical parameter(s) saved successfully.",
      data: savedParameters,
    });
  } catch (error) {
    console.error("Error saving chemical parameters:", error);
    // Check for unique constraint violation (e.g., if parameter_name is unique)
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(409).json({
        message: "A chemical parameter with this name already exists.",
        errors: error.errors,
      });
    }
    next(error); // Pass other errors to global error handler
  }
};

/**
 * Retrieves all chemical parameters.
 * This is the crucial function that provides the list of available chemical parameter templates.
 * Your frontend will call an API route linked to this to populate dropdowns for users.
 * The RaiseEnquiryController.js will then use the ID from this list to fetch details from the database.
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {function} next - Express next middleware function.
 */
exports.getAllChemicalParameters = async (req, res, next) => {
  try {
    // Use Sequelize's findAll method to query the database
    const parameters = await CheminsParam.findAll({
      order: [["parameter_name", "ASC"]], // Order by parameter_name for consistent listing
    });
    res.status(200).json({
      message: "Chemical parameters retrieved successfully.",
      data: parameters,
    });
  } catch (error) {
    console.error("Error retrieving chemical parameters:", error);
    next(error);
  }
};

/**
 * Retrieves a single chemical parameter by ID.
 * This function allows for fetching specific chemical parameter details.
 * The RaiseEnquiryController.js internally uses a similar method (CheminsParam.findByPk)
 * to get the details of a selected chemical parameter from the database.
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {function} next - Express next middleware function.
 */
exports.getChemicalParameterById = async (req, res, next) => {
  try {
    const { id } = req.params;
    // Use Sequelize's findByPk (find by primary key) method
    const parameter = await CheminsParam.findByPk(id);

    if (!parameter) {
      return res.status(404).json({ message: "Chemical parameter not found." });
    }

    res.status(200).json({
      message: "Chemical parameter retrieved successfully.",
      data: parameter,
    });
  } catch (error) {
    console.error("Error retrieving chemical parameter by ID:", error);
    next(error);
  }
};

/**
 * Updates a chemical parameter by ID.
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {function} next - Express next middleware function.
 */
exports.updateChemicalParameter = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ message: "No update data provided." });
    }

    // Use Sequelize's update method
    const [updatedRowsCount, updatedParameters] = await CheminsParam.update(
      updateData,
      {
        where: { id: id },
        returning: true, // Return the updated records
      }
    );

    if (updatedRowsCount === 0) {
      return res
        .status(404)
        .json({ message: "Chemical parameter not found or no changes made." });
    }

    res.status(200).json({
      message: "Chemical parameter updated successfully.",
      data: updatedParameters[0], // updatedParameters is an array, take the first element
    });
  } catch (error) {
    console.error("Error updating chemical parameter:", error);
    // Check for unique constraint violation
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(409).json({
        message: "A chemical parameter with this name already exists.",
        errors: error.errors,
      });
    }
    next(error);
  }
};

/**
 * Deletes a chemical parameter by ID.
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {function} next - Express next middleware function.
 */
exports.deleteChemicalParameter = async (req, res, next) => {
  try {
    const { id } = req.params;
    // Use Sequelize's destroy method
    const deletedRowCount = await CheminsParam.destroy({
      where: { id: id },
    });

    if (deletedRowCount === 0) {
      return res.status(404).json({ message: "Chemical parameter not found." });
    }

    res.status(200).json({
      message: "Chemical parameter deleted successfully.",
      data: { id: id, message: "Parameter deleted." }, // Return ID of deleted item
    });
  } catch (error) {
    console.error("Error deleting chemical parameter:", error);
    next(error);
  }
};
