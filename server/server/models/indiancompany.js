const { DataTypes } = require("sequelize");

// This file exports a function that defines the IndianInspector model.
// It expects the 'sequelize' instance to be passed as an argument.
module.exports = (sequelize) => {
  const indiancompany = sequelize.define(
    "IndianCompany", // Model name (will be pluralized to 'IndianInspectors' for table name by default)
    {
      // Primary Key: indian_company_id (auto-generated)
      // This 'id' in the model maps to 'indian_company_id' in the database.
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      // Company Name
      companyName: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: "company_name", // Maps 'companyName' to 'company_name' in DB
      },
      // Office Contact Number
      officeNumber: {
        type: DataTypes.STRING(50),
        field: "office_number",
      },
      // Registered Address
      registeredAddress: {
        type: DataTypes.TEXT,
        field: "registered_address",
      },
      // Consolidated Document Paths (e.g., PAN, GST, IEC documents)
      // Stored as an array of strings to allow multiple document URLs/paths.
      documentPaths: {
        type: DataTypes.ARRAY(DataTypes.STRING(500)), // Stores an array of URLs/paths
        field: "document_paths",
        comment:
          "Array of URLs or paths to PAN/GST/IEC documents (PDF, JPG, PNG)",
      },
      // Password (will store the hashed password)
      // Note: Passwords should always be hashed before saving to the database.
      password: {
        type: DataTypes.STRING(255), // Store hashed password
        allowNull: false,
      },
      // Bank Account Number
      bankAccountNumber: {
        type: DataTypes.STRING(50),
        field: "bank_account_number",
      },
      // Bank Name
      bankName: {
        type: DataTypes.STRING(255),
        field: "bank_name",
      },
      // IFSC Code
      ifscCode: {
        type: DataTypes.STRING(20),
        field: "ifsc_code",
      },
      // Representative Name
      representativeName: {
        type: DataTypes.STRING(255),
        field: "representative_name",
      },
      // Contact Number of Representative
      contactNumber: {
        type: DataTypes.STRING(50),
        field: "contact_number",
      },
      // Email Address (must be unique)
      emailAddress: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true, // Ensures email addresses are unique across all companies
        field: "email_address",
      },
      // Government ID Paths (e.g., Aadhar, PAN, Passport of representative)
      // Stored as an array of strings to allow multiple ID URLs/paths.
      governmentIdPaths: {
        type: DataTypes.ARRAY(DataTypes.STRING(500)), // Stores an array of URLs/paths
        field: "government_id_paths",
        comment:
          "Array of URLs or paths to government ID documents (Aadhar, PAN, Passport)",
      },
    },
    {
      // Model options
      tableName: "indian_companies", // Explicitly set the table name to 'indian_companies'
      timestamps: true, // Automatically add `createdAt` and `updatedAt` fields
      // Hooks for password hashing:
      // These hooks ensure that the password is hashed before it's saved
      // to the database, both on creation and on update if the password changes.
    }
  );

  return indiancompany; // Export the defined model
};
