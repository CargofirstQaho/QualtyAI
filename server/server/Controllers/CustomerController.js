// server/serve/controllers/customerController.js
const models = require("../../models");
const { Op } = require("sequelize");
const bcrypt = require("bcryptjs"); // Import bcryptjs for password hashing

exports.createCustomer = async (req, res) => {
  console.log("Customer data received:", req.body);
  const {
    country_code,
    full_name,
    email_address,
    mobile_number,
    password, // Include password from the request body
    trade_license_or_legal_document_photo_url,
    certificate_photo_url,
  } = req.body;

  // Determine who created the customer (e.g., from JWT payload or default to 'System')
  const createdBy = res.locals.jwtPayload
    ? res.locals.jwtPayload.userId
    : "System";

  // Start a transaction to ensure atomicity of database operations
  const transaction = await models.sequelize.transaction();

  try {
    // Basic validation: ensure all required fields, including password, are present.
    if (
      !country_code ||
      !full_name ||
      !email_address ||
      !mobile_number ||
      !password // Password is now a required field
    ) {
      await transaction.rollback(); // Rollback the transaction if validation fails
      return res.status(400).json({
        status: false,
        message:
          "Country Code, Full Name, Email Address, Mobile Number, and Password are required.",
      });
    }

    // Check for existing customer by email or mobile number to ensure uniqueness.
    const existingCustomer = await models.Customer.findOne({
      where: {
        [Op.or]: [
          { email_address: email_address },
          { mobile_number: mobile_number },
        ],
      },
      transaction, // Associate this query with the ongoing transaction
    });

    if (existingCustomer) {
      await transaction.rollback(); // Rollback if a duplicate customer is found
      let errorMessage = "Customer already exists.";
      if (existingCustomer.email_address === email_address) {
        errorMessage = "Customer with this email address already exists.";
      } else if (existingCustomer.mobile_number === mobile_number) {
        errorMessage = "Customer with this phone number already exists.";
      }
      return res.status(409).json({
        status: false,
        message: errorMessage,
      });
    }

    // Hash the plain-text password before storing it in the database.
    // bcrypt.hash() is an asynchronous function that generates a strong, salted hash.
    // The '10' represents the number of salt rounds (cost factor), higher is more secure but slower.
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new customer record in the database
    const newCustomer = await models.Customer.create(
      {
        country_code,
        full_name,
        email_address,
        mobile_number,
        password: hashedPassword, // Store the hashed password
        trade_license_or_legal_document_photo_url:
          trade_license_or_legal_document_photo_url || null,
        certificate_photo_url: certificate_photo_url || null,
        // `createdAt` and `updatedAt` are managed automatically by Sequelize
        // due to `timestamps: true` in your model definition.
      },
      { transaction } // Associate this creation with the ongoing transaction
    );

    await transaction.commit(); // Commit the transaction if all operations are successful

    // Return a success response, excluding the password (even hashed) for security
    return res.status(201).json({
      status: true,
      message: "Customer created successfully!",
      customer: {
        customer_id: newCustomer.customer_id,
        full_name: newCustomer.full_name,
        email_address: newCustomer.email_address,
        mobile_number: newCustomer.mobile_number,
      },
    });
  } catch (error) {
    await transaction.rollback(); // Rollback the transaction in case of any error
    console.error("Error creating customer:", error);

    // Handle Sequelize unique constraint errors (e.g., duplicate email/mobile)
    if (error.name === "SequelizeUniqueConstraintError") {
      const field = error.errors[0]?.path;
      let specificMessage =
        "A customer with the provided details already exists.";
      if (field === "email_address") {
        specificMessage = "A customer with this email address already exists.";
      } else if (field === "mobile_number") {
        specificMessage = "A customer with this mobile number already exists.";
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
          "Validation error while creating customer.",
        error: error.message,
      });
    }

    // Handle any other unexpected errors
    return res.status(500).json({
      status: false,
      message: "Failed to create customer. Please try again later.",
      error: error.message,
    });
  }
};
