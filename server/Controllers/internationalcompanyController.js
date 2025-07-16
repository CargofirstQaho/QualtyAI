// internationalcompany-controller.js - Controller (Sequelize)
// This file handles the business logic and interacts with the Sequelize model.

const db = require("../models");
const { Op } = require("sequelize"); // Import Op for OR conditions
const bcrypt = require("bcryptjs"); // Import bcryptjs for password hashing

// Destructure the InternationalCompany model from the db object.
// IMPORTANT: Ensure 'internationalCompany' matches the key in your db.models object.
const InternationalCompany = db.internationalCompany;

/**
 * Creates a new international company.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
exports.createCompany = async (req, res) => {
  const {
    companyName,
    officeNumber,
    registeredAddress,
    documentUrls, // Now an array of URLs/paths
    certificatePaths, // Now an array of paths
    password,
    bankAccountNumber,
    bankName,
    ifscCode,
    swiftCode,
    governmentIdPath,
  } = req.body;

  // Basic validation
  if (!companyName || !password) {
    return res
      .status(400)
      .json({ error: "Company name and password are required." });
  }

  try {
    // Hash the password before creating the record
    const hashedPassword = await bcrypt.hash(password, 10); // 10 salt rounds

    const newCompany = await InternationalCompany.create({
      // Use InternationalCompany directly
      companyName,
      officeNumber,
      registeredAddress,
      documentUrls,
      certificatePaths,
      password: hashedPassword, // Store the hashed password
      bankAccountNumber,
      bankName,
      ifscCode,
      swiftCode,
      governmentIdPath,
    });

    // Exclude password hash from response for security
    const companyResponse = newCompany.toJSON();
    delete companyResponse.password; // 'password' is the field name in the model

    res.status(201).json({
      message: "Company created successfully",
      company: companyResponse,
    });
  } catch (error) {
    console.error("Error in createCompany:", error);
    // Handle Sequelize unique constraint errors, etc.
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(409).json({
        error: "Company with this name or other unique field already exists.",
        details: error.message,
      });
    }
    res
      .status(500)
      .json({ error: "Failed to create company", details: error.message });
  }
};

/**
 * Gets an international company by ID.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
exports.getCompanyById = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: "Company ID is required." });
  }

  try {
    const company = await InternationalCompany.findByPk(id); // Use InternationalCompany directly
    if (!company) {
      return res.status(404).json({ error: "Company not found." });
    }
    // Exclude password hash from response for security
    const companyResponse = company.toJSON();
    delete companyResponse.password;
    res.status(200).json(companyResponse);
  } catch (error) {
    console.error("Error in getCompanyById:", error);
    res
      .status(500)
      .json({ error: "Failed to retrieve company", details: error.message });
  }
};

/**
 * Gets all international companies.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
exports.getAllCompanies = async (req, res) => {
  try {
    const companies = await InternationalCompany.findAll({
      // Use InternationalCompany directly
      attributes: { exclude: ["password"] }, // Exclude password hash from all results
    });
    res.status(200).json(companies);
  } catch (error) {
    console.error("Error in getAllCompanies:", error);
    res.status(500).json({
      error: "Failed to retrieve companies",
      details: error.message,
    });
  }
};

/**
 * Updates an international company.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
exports.updateCompany = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  if (!id) {
    return res
      .status(400)
      .json({ error: "Company ID is required for update." });
  }
  if (Object.keys(updates).length === 0) {
    return res.status(400).json({ error: "No update data provided." });
  }

  try {
    // If password is being updated, hash it
    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, 10);
    }

    const [updatedRowsCount, updatedCompanies] =
      await InternationalCompany.update(updates, {
        // Use InternationalCompany directly
        where: { id: id },
        returning: true, // Return the updated record(s)
      });

    if (updatedRowsCount === 0) {
      return res
        .status(404)
        .json({ error: "Company not found or no changes applied." });
    }

    // Exclude password hash from response for security
    const companyResponse = updatedCompanies[0].toJSON();
    delete companyResponse.password;
    res.status(200).json({
      message: "Company updated successfully",
      company: companyResponse,
    });
  } catch (error) {
    console.error("Error in updateCompany:", error);
    res
      .status(500)
      .json({ error: "Failed to update company", details: error.message });
  }
};

/**
 * Deletes an international company.
 * @param {string} id - The UUID of the company to delete.
 * @returns {Object|null} The deleted company record or null if not found.
 */
exports.deleteCompany = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res
      .status(400)
      .json({ error: "Company ID is required for deletion." });
  }

  try {
    const deletedRowsCount = await InternationalCompany.destroy({
      // Use InternationalCompany directly
      where: { id: id },
    });

    if (deletedRowsCount === 0) {
      return res.status(404).json({ error: "Company not found." });
    }
    res.status(200).json({ message: "Company deleted successfully" });
  } catch (error) {
    console.error("Error in deleteCompany:", error);
    res
      .status(500)
      .json({ error: "Failed to delete company", details: error.message });
  }
};
