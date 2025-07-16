// server/models/Raiseenquiry.js (Sequelize Model for PostgreSQL)
const { DataTypes } = require("sequelize");

// This file now exports a function that defines the Raiseenquiry model.
// It expects the 'sequelize' instance to be passed as an argument.
module.exports = (sequelize) => {
  const Raiseenquiry = sequelize.define(
    "Raiseenquiry",
    {
      // Inspection Location Details
      inspectionLocation: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Inspection location is required.",
          },
          notEmpty: {
            msg: "Inspection location cannot be empty.",
          },
        },
      },
      country: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Country is required.",
          },
          notEmpty: {
            msg: "Country cannot be empty.",
          },
        },
      },
      // Urgency and Commodity Details
      urgencyLevel: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "Low",
        validate: {
          isIn: {
            args: [["Low", "Medium", "High", "Critical"]],
            msg: "Invalid urgency level. Must be Low, Medium, High, or Critical.",
          },
        },
      },
      commodityCategory: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Commodity category is required.",
          },
          notEmpty: {
            msg: "Commodity category cannot be empty.",
          },
        },
      },
      subCommodity: {
        type: DataTypes.STRING,
        allowNull: true, // This is correct, as it's conditionally required by controller
        validate: {
          // notNull is removed because controller sets to null for some cases.
          // We keep notEmpty to prevent saving empty string if value is provided.
          notEmpty: {
            msg: "Sub-commodity cannot be empty if provided.",
          },
        },
      },
      // NEW: riceType column added
      riceType: {
        type: DataTypes.STRING,
        allowNull: true, // This is correct, as it's conditionally required by controller
        validate: {
          notEmpty: {
            msg: "Rice type cannot be empty if provided.",
          },
        },
      },
      volume: {
        type: DataTypes.FLOAT, // Use FLOAT for numbers that might have decimals
        allowNull: false,
        validate: {
          notNull: {
            msg: "Volume is required.",
          },
          isFloat: {
            msg: "Volume must be a number.",
          },
          min: {
            args: [0],
            msg: "Volume cannot be negative.",
          },
        },
      },
      siUnits: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "SI units are required.",
          },
          isIn: {
            args: [["kg", "ton", "liter", "gallon", "pieces", "other"]],
            msg: "Invalid SI unit. Must be kg, ton, liter, gallon, pieces, or other.",
          },
        },
      },
      expectedBudgetUSD: {
        type: DataTypes.FLOAT,
        allowNull: true, // Budget can be optional
        validate: {
          isFloat: {
            msg: "Expected budget must be a number.",
          },
          min: {
            args: [0],
            msg: "Budget cannot be negative.",
          },
        },
      },
      // Inspection Type and Dates
      inspectionType: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Inspection type is required.",
          },
          isIn: {
            // Updated to match the controller's exact values for validation consistency
            args: [["single_day", "multi_day"]],
            msg: "Invalid inspection type. Must be single_day or multi_day.",
          },
        },
      },
      singleDayInspectionDate: {
        type: DataTypes.DATEONLY, // Use DATEONLY for dates without time
        allowNull: true, // Correct, as it can be null if multi-day
        validate: {
          isDate: {
            msg: "Single day inspection date must be a valid date format.", // Clarified msg
          },
          // Custom validation for conditional requirement is handled in controller
        },
      },
      multiDayInspectionStartDate: {
        type: DataTypes.DATEONLY,
        allowNull: true, // Correct, can be null if single-day
        validate: {
          isDate: {
            msg: "Multi-day inspection start date must be a valid date format.", // Clarified msg
          },
        },
      },
      multiDayInspectionEndDate: {
        type: DataTypes.DATEONLY,
        allowNull: true, // Correct, can be null if single-day
        validate: {
          isDate: {
            msg: "Multi-day inspection end date must be a valid date format.", // Clarified msg
          },
          // Custom validation for conditional requirement and date comparison is handled in controller
        },
      },
      // Services Required
      physicalInspection: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      chemicalTesting: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      certificates: {
        type: DataTypes.ARRAY(DataTypes.STRING), // PostgreSQL specific array type
        allowNull: false,
        defaultValue: [],
        validate: {
          // Custom validator to ensure all elements are within the allowed enum
          isValidCertificate: function (value) {
            const allowedCertificates = [
              "NABL",
              "NABCB",
              "COC",
              "FOFSE",
              "GAFTA",
              "ISO",
              "Other",
            ];
            if (value && value.length > 0) {
              const invalidCert = value.find(
                (cert) => !allowedCertificates.includes(cert)
              );
              if (invalidCert) {
                throw new Error(
                  `Invalid certificate type: ${invalidCert}. Allowed types are ${allowedCertificates.join(
                    ", "
                  )}.`
                );
              }
            }
          },
        },
      },

      // NEW RICE PARAMETERS (as percentages)
      broken: {
        type: DataTypes.FLOAT,
        allowNull: true, // Correct as it's conditionally saved by controller
        validate: {
          isFloat: { msg: "Broken percentage must be a number." },
          min: { args: [0], msg: "Broken percentage cannot be negative." },
          max: { args: [100], msg: "Broken percentage cannot exceed 100." },
        },
      },
      purity: {
        type: DataTypes.FLOAT,
        allowNull: true, // Correct
        validate: {
          isFloat: { msg: "Purity percentage must be a number." },
          min: { args: [0], msg: "Purity percentage cannot be negative." },
          max: { args: [100], msg: "Purity percentage cannot exceed 100." },
        },
      },
      yellowKernel: {
        type: DataTypes.FLOAT,
        allowNull: true, // Correct
        validate: {
          isFloat: { msg: "Yellow Kernel percentage must be a number." },
          min: {
            args: [0],
            msg: "Yellow Kernel percentage cannot be negative.",
          },
          max: {
            args: [100],
            msg: "Yellow Kernel percentage cannot exceed 100.",
          },
        },
      },
      damageKernel: {
        type: DataTypes.FLOAT,
        allowNull: true, // Correct
        validate: {
          isFloat: { msg: "Damage Kernel percentage must be a number." },
          min: {
            args: [0],
            msg: "Damage Kernel percentage cannot be negative.",
          },
          max: {
            args: [100],
            msg: "Damage Kernel percentage cannot exceed 100.",
          },
        },
      },
      redKernel: {
        type: DataTypes.FLOAT,
        allowNull: true, // Correct
        validate: {
          isFloat: { msg: "Red Kernel percentage must be a number." },
          min: { args: [0], msg: "Red Kernel percentage cannot be negative." },
          max: { args: [100], msg: "Red Kernel percentage cannot exceed 100." },
        },
      },
      paddyKernel: {
        type: DataTypes.FLOAT,
        allowNull: true, // Correct
        validate: {
          isFloat: { msg: "Paddy Kernel percentage must be a number." },
          min: {
            args: [0],
            msg: "Paddy Kernel percentage cannot be negative.",
          },
          max: {
            args: [100],
            msg: "Paddy Kernel percentage cannot exceed 100.",
          },
        },
      },
      chalkyRice: {
        type: DataTypes.FLOAT,
        allowNull: true, // Correct
        validate: {
          isFloat: { msg: "Chalky Rice percentage must be a number." },
          min: { args: [0], msg: "Chalky Rice percentage cannot be negative." },
          max: {
            args: [100],
            msg: "Chalky Rice percentage cannot exceed 100.",
          },
        },
      },
      liveInsects: {
        type: DataTypes.FLOAT,
        allowNull: true, // Correct
        validate: {
          isFloat: { msg: "Live Insects count/percentage must be a number." },
          min: {
            args: [0],
            msg: "Live Insects count/percentage cannot be negative.",
          },
        },
      },
      millingDegree: {
        type: DataTypes.FLOAT,
        allowNull: true, // Correct
        validate: {
          isFloat: { msg: "Milling Degree must be a number." },
          min: { args: [0], msg: "Milling Degree cannot be negative." },
          max: { args: [100], msg: "Milling Degree cannot exceed 100." }, // Assuming it could be a percentage
        },
      },
      averageGrainLength: {
        type: DataTypes.FLOAT,
        allowNull: true, // Correct
        validate: {
          isFloat: { msg: "Average Grain Length must be a number." },
          min: { args: [0], msg: "Average Grain Length cannot be negative." },
        },
      },

      // NEW CHEMICAL PARAMETERS (as text format)
      chemicalParameters: {
        type: DataTypes.TEXT, // Use TEXT to store a string that can contain various chemical parameters
        allowNull: true, // Correct as it's conditionally saved by controller
        validate: {
          len: {
            args: [0, 5000], // Allow up to 5000 characters for chemical parameters
            msg: "Chemical parameters cannot exceed 5000 characters.",
          },
        },
      },

      // Contact Information
      companyName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Company name is required.",
          },
          notEmpty: {
            msg: "Company name cannot be empty.",
          },
        },
      },
      contactPersonName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Contact person name is required.",
          },
          notEmpty: {
            msg: "Contact person name cannot be empty.",
          },
        },
      },
      emailAddress: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false, // Email might not be unique for inquiries
        validate: {
          notNull: {
            msg: "Email address is required.",
          },
          isEmail: {
            msg: "Please enter a valid email address.",
          },
        },
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Phone number is required.",
          },
          is: {
            args: [/^\+?\d{10,15}$/], // Basic phone number validation
            msg: "Please enter a valid phone number (10-15 digits, optional +).",
          },
        },
      },
      // Additional Requirements
      specialRequirements: {
        type: DataTypes.TEXT, // Use TEXT for potentially long strings
        allowNull: true,
        validate: {
          len: {
            args: [0, 1000],
            msg: "Special requirements cannot exceed 1000 characters.",
          },
        },
      },
    },
    {
      // Model options
      tableName: "raise_enquiries", // Explicitly define table name
      timestamps: true, // Enable createdAt and updatedAt fields
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    }
  );

  // You can define associations here if needed later
  // Raiseenquiry.associate = (models) => {
  //     // associations can be defined here
  // };

  return Raiseenquiry;
};
