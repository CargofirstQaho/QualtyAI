// internationalinspector-controller.js (Controller Logic)

// Import the sequelize instance from db.config.js
// Assuming db.config.js is in the project root (e.g., C:\Qualtybackend\db.config.js)

// Import the model definition function and call it with the sequelize instance
// Assuming the models directory is at C:\Qualtybackend\server\models
const db = require("../models");
const { Op } = require("sequelize"); // Import Op for OR conditions
const bcrypt = require("bcryptjs"); // Import bcryptjs for password hashing

// Destructure the InternationalInspector model from the db object
const InternationalInspector = db.internationalInspector; // Ensure this matches your model name in models/index.js

// Get all international inspectors
exports.getAllInspectors = async (req, res) => {
  try {
    const inspectors = await InternationalInspector.findAll({
      attributes: { exclude: ["password"] }, // Exclude password from results for security
    });
    res.status(200).json(inspectors);
  } catch (error) {
    console.error("Error fetching inspectors:", error);
    res
      .status(500)
      .json({ message: "Error fetching inspectors", error: error.message });
  }
};

// Add a new international inspector
exports.createInspector = async (req, res) => {
  console.log("Inspector data received:", req.body);
  const {
    countryCode,
    fullName,
    emailAddress,
    mobileNumber,
    password, // Password is now expected
    address,
    internationalInspectorCode,
    commodityName,
    experienceYears,
    filePaths,
    bankAccountNumber,
    bankDetails,
    tradeLicenseOrLegalDocumentPhotoUrl, // New field
    certificatePhotoUrl, // New field
  } = req.body;

  // Start a transaction to ensure atomicity of database operations
  const transaction = await sequelize.transaction();

  try {
    // Basic validation: ensure all required fields are present.
    if (
      !countryCode ||
      !fullName ||
      !emailAddress ||
      !mobileNumber ||
      !password || // Password is now a required field
      !internationalInspectorCode
    ) {
      await transaction.rollback(); // Rollback the transaction if validation fails
      return res.status(400).json({
        status: false,
        message:
          "Country Code, Full Name, Email Address, Mobile Number, Password, and International Inspector Code are required.",
      });
    }

    // Check for existing inspector by email or inspector code to ensure uniqueness.
    const existingInspector = await InternationalInspector.findOne({
      where: {
        [Op.or]: [
          { emailAddress: emailAddress },
          { internationalInspectorCode: internationalInspectorCode },
        ],
      },
      transaction, // Associate this query with the ongoing transaction
    });

    if (existingInspector) {
      await transaction.rollback(); // Rollback if a duplicate inspector is found
      let errorMessage = "Inspector already exists.";
      if (existingInspector.emailAddress === emailAddress) {
        errorMessage = "Inspector with this email address already exists.";
      } else if (
        existingInspector.internationalInspectorCode ===
        internationalInspectorCode
      ) {
        errorMessage = "Inspector with this code already exists.";
      }
      return res.status(409).json({
        status: false,
        message: errorMessage,
      });
    }

    // Hash the plain-text password before storing it in the database.
    const hashedPassword = await bcrypt.hash(password, 10); // 10 salt rounds

    // Create the new inspector record in the database
    const newInspector = await InternationalInspector.create(
      {
        countryCode,
        fullName,
        emailAddress,
        mobileNumber,
        password: hashedPassword, // Store the hashed password
        address: address || null,
        internationalInspectorCode,
        commodityName: commodityName || null,
        experienceYears: experienceYears || null,
        filePaths: filePaths || null,
        bankAccountNumber: bankAccountNumber || null,
        bankDetails: bankDetails || null,
        tradeLicenseOrLegalDocumentPhotoUrl:
          tradeLicenseOrLegalDocumentPhotoUrl || null,
        certificatePhotoUrl: certificatePhotoUrl || null,
      },
      { transaction } // Associate this creation with the ongoing transaction
    );

    await transaction.commit(); // Commit the transaction if all operations are successful

    // Return a success response, excluding the password (even hashed) for security
    return res.status(201).json({
      status: true,
      message: "International Inspector created successfully!",
      inspector: {
        id: newInspector.id,
        fullName: newInspector.fullName,
        emailAddress: newInspector.emailAddress,
        internationalInspectorCode: newInspector.internationalInspectorCode,
      },
    });
  } catch (error) {
    await transaction.rollback(); // Rollback the transaction in case of any error
    console.error("Error creating international inspector:", error);

    // Handle Sequelize unique constraint errors (e.g., duplicate email/code)
    if (error.name === "SequelizeUniqueConstraintError") {
      const field = error.errors[0]?.path;
      let specificMessage =
        "An inspector with the provided details already exists.";
      if (field === "email_address") {
        specificMessage =
          "An inspector with this email address already exists.";
      } else if (field === "international_inspector_code") {
        specificMessage = "An inspector with this code already exists.";
      }
      return res.status(409).json({
        status: false,
        message: specificMessage,
        error: error.message,
      });
    }

    // Handle Sequelize validation errors (e.g., data type mismatches, missing required fields)
    if (error.name === "SequelizeValidationError") {
      return res.status(400).json({
        status: false,
        message:
          error.errors[0]?.message ||
          "Validation error while creating inspector.",
        error: error.message,
      });
    }

    // Handle any other unexpected errors
    return res.status(500).json({
      status: false,
      message:
        "Failed to create international inspector. Please try again later.",
      error: error.message,
    });
  }
};
