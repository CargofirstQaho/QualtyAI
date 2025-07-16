// models/indianinspector.js
const { DataTypes } = require("sequelize");

// This file exports a function that defines the IndianInspector model.
// It expects the 'sequelize' instance to be passed as an argument.
module.exports = (sequelize) => {
  const IndianInspector = sequelize.define(
    "IndianInspector", // Model name (will be pluralized to 'IndianInspectors' for table name by default)
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      indianInspectorId: {
        type: DataTypes.UUID, // Use UUID for auto-generated unique IDs
        defaultValue: DataTypes.UUIDV4, // Auto-generate UUIDs
        allowNull: false,
        unique: true,
        field: "indian_inspector_id", // Maps to snake_case column in DB
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      mobileNumber: {
        type: DataTypes.STRING(20),
        allowNull: false,
        field: "mobile_number",
      },
      emailId: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true, // Ensures email addresses are unique
        field: "email_id",
      },
      password: {
        type: DataTypes.STRING(255), // Store hashed password (e.g., bcrypt hash)
        allowNull: false,
      },
      address: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      commodityName: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: "commodity_name",
      },
      experience: {
        type: DataTypes.STRING(100), // e.g., "5 years", "10+ years"
        allowNull: false,
      },
      aadharCardUrl: {
        type: DataTypes.STRING(500), // Increased length for URLs
        field: "aadhar_card_url",
        comment: "URL or path to the Aadhar card document",
      },
      bankAccountNumber: {
        type: DataTypes.STRING(50),
        allowNull: false,
        field: "bank_account_number",
      },
      bankName: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: "bank_name",
      },
      ifscCode: {
        type: DataTypes.STRING(20),
        allowNull: false,
        field: "ifsc_code",
      },
      countryCode: {
        type: DataTypes.STRING(10),
        defaultValue: "+91", // Default value for Indian country code
        field: "country_code",
      },
      userId: {
        // To associate records with a specific user from the frontend (if applicable)
        type: DataTypes.STRING(255),
        allowNull: false,
        field: "user_id",
      },
    },
    {
      tableName: "indian_inspectors", // Explicitly set table name to match previous schema
      // timestamps: true, // Handled globally by db.config.js or similar, as per your example
      // underscored: true, // Handled globally by db.config.js or similar, as per your example
    }
  );

  return IndianInspector; // Export the defined model
};
