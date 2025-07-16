// --- models/Customer.js ---
// This file defines the Customer model for Sequelize.
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Customer = sequelize.define(
    "Customer",
    {
      customer_id: {
        // Renamed from 'id' to match user's request
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      country_code: {
        type: DataTypes.STRING(3), // e.g., 'USA', 'IND'
        allowNull: false,
      },
      full_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email_address: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      mobile_number: {
        type: DataTypes.STRING(20), // Store as string to handle various formats (e.g., +1-555-123-4567)
        allowNull: false,
        unique: true,
      },
      password: {
        // Added password field
        type: DataTypes.STRING, // Store the hashed password as a string
        allowNull: false, // Password is a required field
      },
      // Storing URLs for the documents/photos, not the actual files
      trade_license_or_legal_document_photo_url: {
        type: DataTypes.STRING,
        allowNull: true, // Can be null if not provided
        validate: {
          isUrl: true, // Basic URL validation
        },
      },
      certificate_photo_url: {
        type: DataTypes.STRING,
        allowNull: true, // Can be null if not provided
        validate: {
          isUrl: true, // Basic URL validation
        },
      },
    },
    {
      tableName: "customers", // Explicitly set table name
      timestamps: true, // Adds createdAt and updatedAt columns
    }
  );

  return Customer;
};
