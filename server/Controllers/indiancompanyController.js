// Controllers/indiancompanyController.js

const db = require("../models");
const { Op } = require("sequelize"); // Imported, but not used in these functions. Keep if for future use.
const bcrypt = require("bcryptjs"); // For password hashing and comparison
const IndianCompany = db.IndianCompany; // Get the IndianCompany model

/**
 * Hashes a plain text password.
 * @param {string} password - The plain text password.
 * @returns {Promise<string>} The hashed password.
 */
async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10); // Generate a salt with 10 rounds
  return bcrypt.hash(password, salt); // Hash the password
}

/**
 * Compares a plain text password with a hashed password.
 * @param {string} plainPassword - The plain text password.
 * @param {string} hashedPassword - The hashed password from the database.
 * @returns {Promise<boolean>} True if passwords match, false otherwise.
 */
async function comparePassword(plainPassword, hashedPassword) {
  return bcrypt.compare(plainPassword, hashedPassword);
}

/**
 * Creates a new Indian company record.
 *
 * @param {object} req - The Express request object.
 * @param {object} res - The Express response object.
 */
async function createCompany(req, res) {
  const {
    companyName,
    officeNumber,
    registeredAddress,
    documentPaths, // Array of URLs/paths
    password, // Raw password from request body
    bankAccountNumber,
    bankName,
    ifscCode,
    representativeName,
    contactNumber,
    emailAddress,
    governmentIdPaths, // Array of URLs/paths
  } = req.body;

  // Basic validation: Ensure required fields are present
  if (!companyName || !password || !emailAddress) {
    return res.status(400).json({
      message: "Company name, password, and email address are required.",
    });
  }

  // Basic email format validation (can be more robust with a library)
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailAddress)) {
    return res.status(400).json({ message: "Invalid email address format." });
  }

  try {
    // Hash the password before saving for security
    const hashedPassword = await hashPassword(password);

    const newCompany = await IndianCompany.create({
      companyName,
      officeNumber,
      registeredAddress,
      documentPaths: documentPaths || [], // Ensure it's an array, even if empty
      password: hashedPassword, // Store the hashed password
      bankAccountNumber,
      bankName,
      ifscCode,
      representativeName,
      contactNumber,
      emailAddress,
      governmentIdPaths: governmentIdPaths || [], // Ensure it's an array, even if empty
    });

    // Exclude the password from the response for security
    const companyResponse = newCompany.toJSON();
    delete companyResponse.password;

    res.status(201).json({
      message: "Company registered successfully!",
      company: companyResponse,
    });
  } catch (error) {
    console.error("Error creating company:", error);
    // Handle specific Sequelize error for unique constraint violation (e.g., duplicate email)
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(409).json({
        message:
          "Email address already registered. Please use a different email.",
      });
    }
    // Handle other Sequelize validation errors (e.g., if model defines specific types/constraints)
    if (error.name === "SequelizeValidationError") {
      const errors = error.errors.map((err) => err.message);
      return res.status(400).json({
        message: "Validation failed.",
        errors: errors,
      });
    }
    res.status(500).json({
      message: "Failed to register company. An unexpected error occurred.",
      error: error.message, // Include error message for debugging in dev
    });
  }
}

/**
 * Retrieves an Indian company record by its ID.
 *
 * @param {object} req - The Express request object.
 * @param {object} res - The Express response object.
 */
async function getCompanyById(req, res) {
  const { id } = req.params; // Get company ID from URL parameters

  try {
    const company = await IndianCompany.findByPk(id, {
      attributes: { exclude: ["password"] }, // Exclude password from the fetched record
    });

    if (!company) {
      return res.status(404).json({ message: "Company not found." });
    }

    res.status(200).json(company);
  } catch (error) {
    console.error("Error fetching company by ID:", error);
    res.status(500).json({
      message: "Failed to retrieve company.",
      error: error.message,
    });
  }
}

/**
 * Retrieves all Indian company records.
 *
 * @param {object} req - The Express request object.
 * @param {object} res - The Express response object.
 */
async function getAllCompanies(req, res) {
  try {
    const companies = await IndianCompany.findAll({
      order: [["createdAt", "DESC"]], // Order by creation date, most recent first
      attributes: { exclude: ["password"] }, // Exclude password from all results
    });

    res.status(200).json(companies);
  } catch (error) {
    console.error("Error fetching all companies:", error);
    res.status(500).json({
      message: "Failed to retrieve companies.",
      error: error.message,
    });
  }
}

/**
 * Updates an existing Indian company record.
 *
 * @param {object} req - The Express request object.
 * @param {object} res - The Express response object.
 */
async function updateCompany(req, res) {
  const { id } = req.params; // Get company ID from URL parameters
  let companyData = req.body; // Get updated data from request body

  try {
    // Find the company first
    const company = await IndianCompany.findByPk(id);
    if (!company) {
      return res.status(404).json({ message: "Company not found." });
    }

    // If password is being updated, hash it before saving
    if (companyData.password) {
      companyData.password = await hashPassword(companyData.password);
    }

    const updatedCompany = await company.update(companyData);

    // Exclude the password from the response for security
    const companyResponse = updatedCompany.toJSON();
    delete companyResponse.password;

    res.status(200).json({
      message: "Company updated successfully!",
      company: companyResponse,
    });
  } catch (error) {
    console.error("Error updating company:", error);
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(409).json({
        message:
          "Email address already registered. Please use a different email.",
      });
    }
    if (error.name === "SequelizeValidationError") {
      const errors = error.errors.map((err) => err.message);
      return res.status(400).json({
        message: "Validation failed.",
        errors: errors,
      });
    }
    res.status(500).json({
      message: "Failed to update company. An unexpected error occurred.",
      error: error.message,
    });
  }
}

/**
 * Deletes an Indian company record.
 *
 * @param {object} req - The Express request object.
 * @param {object} res - The Express response object.
 */
async function deleteCompany(req, res) {
  const { id } = req.params; // Get company ID from URL parameters

  try {
    // Use Sequelize's `destroy` method to delete the record.
    // Assuming 'id' is the primary key column name in the database.
    const deletedRowsCount = await IndianCompany.destroy({
      where: { id: id }, // Corrected to use 'id' for consistency with findByPk
    });

    if (deletedRowsCount === 0) {
      return res.status(404).json({ message: "Company not found." });
    }
    res.status(200).json({ message: "Company deleted successfully!" });
  } catch (error) {
    console.error("Error deleting company:", error);
    res.status(500).json({
      message: "Failed to delete company.",
      error: error.message,
    });
  }
}

/**
 * Handles company login authentication.
 * This function is a placeholder and assumes email/password for login.
 * You would typically return a JWT or session token upon successful authentication.
 *
 * @param {object} req - The Express request object (expected: { emailAddress, password }).
 * @param {object} res - The Express response object.
 */
async function authenticateCompanyLogin(req, res) {
  const { emailAddress, password } = req.body;

  if (!emailAddress || !password) {
    return res
      .status(400)
      .json({ message: "Email and password are required for login." });
  }

  try {
    // Find the company by email address
    const company = await IndianCompany.findOne({
      where: { emailAddress: emailAddress },
    });

    if (!company) {
      // Use a generic message for security, don't reveal if email exists or not
      return res.status(401).json({ message: "Invalid credentials." });
    }

    // Compare the provided password with the hashed password in the database
    const isMatch = await comparePassword(password, company.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    // If credentials are valid, generate and send a token (e.g., JWT)
    // For simplicity, we'll just send a success message and company info (without password)
    const companyResponse = company.toJSON();
    delete companyResponse.password;

    res.status(200).json({
      message: "Login successful!",
      company: companyResponse,
      // token: "YOUR_GENERATED_JWT_TOKEN_HERE" // In a real app, send a JWT
    });
  } catch (error) {
    console.error("Error during company login:", error);
    res.status(500).json({
      message: "An error occurred during login.",
      error: error.message,
    });
  }
}

// Export all controller functions to be used by the routes
module.exports = {
  createCompany,
  getCompanyById,
  getAllCompanies,
  updateCompany,
  deleteCompany,
  authenticateCompanyLogin, // Export the new login function
};
