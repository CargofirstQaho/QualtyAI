// internationalinspector.js (Model Definition)

const { DataTypes } = require("sequelize");

// This file now exports a function that defines the InternationalInspector model.
// It expects the 'sequelize' instance to be passed as an argument.
module.exports = (sequelize) => {
  const InternationalInspector = sequelize.define(
    "InternationalInspector",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      countryCode: {
        type: DataTypes.STRING(10),
        allowNull: false,
        field: "country_code",
      },
      fullName: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: "full_name",
      },
      emailAddress: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
        field: "email_address",
      },
      mobileNumber: {
        type: DataTypes.STRING(50),
        field: "mobile_number",
      },
      // Added password field
      password: {
        type: DataTypes.STRING(255), // Store hashed password
        allowNull: false,
      },
      address: {
        type: DataTypes.TEXT,
      },
      internationalInspectorCode: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        field: "international_inspector_code",
      },
      commodityName: {
        type: DataTypes.STRING(255),
        field: "commodity_name",
      },
      experienceYears: {
        type: DataTypes.INTEGER,
        field: "experience_years",
      },
      filePaths: {
        type: DataTypes.TEXT,
        field: "file_paths",
        comment: "Comma-separated paths/URLs to stored files (PNG, JPG, PDF)",
      },
      bankAccountNumber: {
        type: DataTypes.STRING(100),
        field: "bank_account_number",
      },
      bankDetails: {
        type: DataTypes.TEXT,
        field: "bank_details",
      },
      // Added fields for document URLs
      tradeLicenseOrLegalDocumentPhotoUrl: {
        type: DataTypes.STRING(500),
        field: "trade_license_or_legal_document_photo_url",
        comment: "URL to the trade license or legal document photo",
      },
      certificatePhotoUrl: {
        type: DataTypes.STRING(500),
        field: "certificate_photo_url",
        comment: "URL to the certificate photo",
      },
    },
    {
      tableName: "international_inspectors", // Explicitly set table name
      // Timestamps and underscored are now defined in the db.config.js for global application
      // define: {
      //     timestamps: true,
      //     underscored: true,
      // }
    }
  );

  return InternationalInspector; // Export the defined model
};
