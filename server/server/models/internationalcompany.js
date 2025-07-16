// internationalcompany.js - Model Definition (Sequelize)

const { DataTypes } = require("sequelize");

// This file now exports a function that defines the InternationalInspector model.
// It expects the 'sequelize' instance to be passed as an argument.
module.exports = (sequelize) => {
  const InternationalCompany = sequelize.define(
    "InternationalCompany", // Model name
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      companyName: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: "company_name", // Maps to snake_case column in DB
      },
      officeNumber: {
        type: DataTypes.STRING(50),
        field: "office_number",
      },
      registeredAddress: {
        type: DataTypes.TEXT,
        field: "registered_address",
      },
      // Consolidated Document URLs/Paths
      documentUrls: {
        type: DataTypes.ARRAY(DataTypes.STRING(500)), // Stores an array of URLs/paths
        field: "document_urls",
        comment:
          "Array of URLs or paths to various document formats (PDF, JPG, PNG)",
      },
      // Consolidated Certificate Paths
      certificatePaths: {
        type: DataTypes.ARRAY(DataTypes.STRING(500)), // Stores an array of paths
        field: "certificate_paths",
        comment:
          "Array of paths to various certificate formats (PNG, JPG, JPEG, PDF)",
      },
      // Sensitive Data (Note: Passwords should be hashed before saving)
      password: {
        type: DataTypes.STRING(255), // Store hashed password
        allowNull: false,
      },
      bankAccountNumber: {
        type: DataTypes.STRING(255),
        field: "bank_account_number",
      },
      bankName: {
        type: DataTypes.STRING(255),
        field: "bank_name",
      },
      ifscCode: {
        type: DataTypes.STRING(50),
        field: "ifsc_code",
      },
      swiftCode: {
        type: DataTypes.STRING(50),
        field: "swift_code",
      },
      // Government ID Path
      governmentIdPath: {
        type: DataTypes.STRING(500),
        field: "government_id_path",
        comment: "Path to government ID document",
      },
    },
    {
      tableName: "international_company", // Explicitly set table name
      timestamps: true,
    }
  );

  return InternationalCompany; // Export the defined model
};
