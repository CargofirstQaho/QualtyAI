// server/Controllers/RaiseEnquiryController.js

const { Op } = require("sequelize");
const db = require("../models"); // Assuming your models are indexed in a db folder

const Raiseenquiry = db.Raiseenquiry;
const Phyinspectionparam = db.Phyinspectionparam; // Import the Phyinspectionparam model
const CheminsParam = db.CheminsParam; // Import the CheminsParam model

exports.createRaiseEnquiry = async (req, res) => {
  let transaction; // Declare transaction here for proper scope
  try {
    transaction = await db.sequelize.transaction(); // Start a Sequelize transaction

    const {
      inspectionLocation,
      country,
      urgencyLevel,
      commodityCategory,
      subCommodity,
      riceType,
      volume,
      siUnits,
      expectedBudgetUSD,
      inspectionType,
      singleDayInspectionDate,
      multiDayInspectionStartDate,
      multiDayInspectionEndDate,
      physicalInspection,
      chemicalTesting,
      certificates,
      companyName,
      contactPersonName,
      emailAddress,
      phoneNumber,
      specialRequirements,
      // New: IDs for fetching parameter data from their respective tables
      selectedPhyParamId,
      selectedChemParamId,
      // IMPORTANT: `broken`, `purity`, etc., and `chemicalParameters` are NOT destructured from req.body here.
      // They will be populated from the fetched parameter records.
    } = req.body;

    // Declare variables for physical and chemical parameters, initialized to null.
    // These will be populated from fetched data if applicable.
    let broken = null;
    let purity = null;
    let yellowKernel = null;
    let damageKernel = null;
    let redKernel = null;
    let paddyKernel = null;
    let chalkyRice = null;
    let liveInsects = null;
    let millingDegree = null;
    let averageGrainLength = null;
    let chemicalParameters = null;

    // --- Backend Validation Logic (Your original validation code) ---

    // Define valid options for dropdowns (case-insensitive for comparison)
    const validCommodityCategories = [
      "food & beverages",
      "textiles & garments",
      "electronics & electrical",
      "pharmaceuticals",
      "chemicals",
      "automotive",
      "other",
    ].map((c) => c.toLowerCase());

    const validSubCommoditiesMap = {
      "food & beverages": [
        "rice",
        "wheat",
        "pulses",
        "spices",
        "tea&coffee",
        "oil and seeds",
      ].map((s) => s.toLowerCase()),
      "textiles & garments": ["cotton", "silk", "wool", "synthetic"].map((s) =>
        s.toLowerCase()
      ),
      "electronics & electrical": [
        "components",
        "devices",
        "home appliances",
      ].map((s) => s.toLowerCase()),
      pharmaceuticals: ["apis", "finished products", "medical devices"].map(
        (s) => s.toLowerCase()
      ),
      chemicals: ["industrial", "organic", "specialty"].map((s) =>
        s.toLowerCase()
      ),
      automotive: ["parts", "accessories"].map((s) => s.toLowerCase()),
      // 'other' is intentionally NOT in this map because its sub-commodity is free-text
    };

    const validRiceTypes = [
      "basmati rice",
      "jasmine rice",
      "brown rice",
      "white rice",
      "wild rice",
      "arborio rice",
      "black rice",
      "red rice",
      "sticky rice",
      "parboiled rice",
      "long grain rice",
      "medium grain rice",
      "short grain rice",
      "organic rice",
      "non-gmo rice",
      "broken rice",
      "rice bran",
      "rice flour",
    ].map((r) => r.toLowerCase());

    // Define valid inspection types (case-insensitive for comparison)
    const validInspectionTypes = ["single_day", "multi_day"].map((t) =>
      t.toLowerCase()
    );

    // Normalize inputs for validation (always convert to lowercase for comparison)
    const lowerCaseCommodityCategory = commodityCategory
      ? commodityCategory.toLowerCase()
      : "";
    const lowerCaseSubCommodity = subCommodity
      ? subCommodity.toLowerCase()
      : "";
    const lowerCaseRiceType = riceType ? riceType.toLowerCase() : "";
    const lowerCaseInspectionType = inspectionType
      ? inspectionType.toLowerCase()
      : "";

    // Validate main commodity category first
    if (!validCommodityCategories.includes(lowerCaseCommodityCategory)) {
      await transaction.rollback(); // Rollback on validation error
      return res.status(400).json({
        message: `Invalid commodity category. Allowed: ${validCommodityCategories.join(
          ", "
        )}.`,
      });
    }

    // Determine key flags for conditional logic
    const isFoodBeverages = lowerCaseCommodityCategory === "food & beverages";
    const isRiceSubCommodity =
      isFoodBeverages && lowerCaseSubCommodity === "rice";
    const isSpecificRiceTypeSelected =
      isRiceSubCommodity && validRiceTypes.includes(lowerCaseRiceType);
    const isOtherCommodityCategory = lowerCaseCommodityCategory === "other";

    // --- Conditional Validation for subCommodity ---
    const expectsPredefinedSubCommodity = Object.keys(
      validSubCommoditiesMap
    ).includes(lowerCaseCommodityCategory);

    if (expectsPredefinedSubCommodity) {
      if (!subCommodity) {
        await transaction.rollback();
        return res.status(400).json({
          message: `Sub-commodity is required for ${commodityCategory}.`,
        });
      }
      const allowedSubCommoditiesForCategory =
        validSubCommoditiesMap[lowerCaseCommodityCategory];
      if (
        allowedSubCommoditiesForCategory &&
        !allowedSubCommoditiesForCategory.includes(lowerCaseSubCommodity)
      ) {
        await transaction.rollback();
        return res.status(400).json({
          message: `Invalid sub-commodity '${subCommodity}'. Allowed for ${commodityCategory}: ${allowedSubCommoditiesForCategory.join(
            ", "
          )}.`,
        });
      }
    } else if (isOtherCommodityCategory) {
      if (!subCommodity || subCommodity.trim() === "") {
        await transaction.rollback();
        return res.status(400).json({
          message:
            "Sub-commodity is required when 'Other' is selected as commodity category.",
        });
      }
    } else {
      if (subCommodity) {
        await transaction.rollback();
        return res.status(400).json({
          message:
            "Sub-commodity should only be provided for specific commodity categories that require it (e.g., Food & Beverages, Textiles & Garments, etc.) or if 'Other' is selected.",
        });
      }
    }

    // --- Conditional Validation for riceType ---
    if (isRiceSubCommodity) {
      if (!riceType) {
        await transaction.rollback();
        return res.status(400).json({
          message:
            "Rice Type is required when 'Rice' is selected as sub-commodity.",
        });
      }
      if (!validRiceTypes.includes(lowerCaseRiceType)) {
        await transaction.rollback();
        return res.status(400).json({
          message: `Invalid Rice Type '${riceType}'. Allowed for Rice sub-commodity: ${validRiceTypes.join(
            ", "
          )}.`,
        });
      }
    } else {
      if (riceType) {
        await transaction.rollback();
        return res.status(400).json({
          message:
            "Rice Type should only be provided when 'Food & Beverages' -> 'Rice' is selected as sub-commodity.",
        });
      }
    }

    // --- LOGIC TO FETCH AND POPULATE PARAMETER DATA ---

    // Fetch and populate physical parameters if physicalInspection is true and an ID is provided
    if (physicalInspection) {
      if (!selectedPhyParamId) {
        await transaction.rollback();
        return res.status(400).json({
          message:
            "Physical Inspection is selected but no Physical Parameter ID was provided.",
        });
      }
      const phyParam = await Phyinspectionparam.findByPk(selectedPhyParamId, {
        transaction,
      });
      if (!phyParam) {
        await transaction.rollback();
        return res.status(404).json({
          message: `Physical Inspection Parameter with ID ${selectedPhyParamId} not found.`,
        });
      }

      // Populate the `let` declared variables with data from the fetched record
      broken = phyParam.broken;
      purity = phyParam.purity;
      yellowKernel = phyParam.yellowKernel;
      damageKernel = phyParam.damageKernel;
      redKernel = phyParam.redKernel;
      paddyKernel = phyParam.paddyKernel;
      chalkyRice = phyParam.chalkyRice;
      liveInsects = phyParam.liveInsects;
      // Ensure type consistency for millingDegree (from string in Phyinspectionparam to float in Raiseenquiry)
      millingDegree = parseFloat(phyParam.millingDegree) || 0.0;
      averageGrainLength = phyParam.averageGrainLength;
    }

    // Fetch and populate chemical parameters if chemicalTesting is true and an ID is provided
    if (chemicalTesting) {
      if (!selectedChemParamId) {
        await transaction.rollback();
        return res.status(400).json({
          message:
            "Chemical Testing is selected but no Chemical Parameter ID was provided.",
        });
      }
      const chemParam = await CheminsParam.findByPk(selectedChemParamId, {
        transaction,
      });
      if (!chemParam) {
        await transaction.rollback();
        return res.status(404).json({
          message: `Chemical Inspection Parameter with ID ${selectedChemParamId} not found.`,
        });
      }
      chemicalParameters = chemParam.parameter_name; // Assuming 'parameter_name' holds the text string
    }

    // --- Conditional Validation for Physical Inspection Rice Parameters ---
    // These parameters are ONLY required/expected if physicalInspection is true AND it's a specific rice type
    const shouldValidateDetailedRicePhysicalParams =
      physicalInspection && isSpecificRiceTypeSelected;

    if (shouldValidateDetailedRicePhysicalParams) {
      const ricePhysicalParams = {
        broken,
        purity,
        yellowKernel,
        damageKernel,
        redKernel,
        // purity is listed twice in your original code, keeping it for consistency
        purity,
        paddyKernel,
        chalkyRice,
        liveInsects,
        millingDegree,
        averageGrainLength,
      };

      for (const [key, value] of Object.entries(ricePhysicalParams)) {
        const readableKey = key.replace(/([A-Z])/g, " $1").toLowerCase();

        // This validation now checks the values fetched from the database
        if (value === undefined || value === null) {
          await transaction.rollback(); // Rollback on validation error
          return res.status(400).json({
            message: `${readableKey} is required for rice physical inspection when a specific rice type is selected, but was not found in the selected physical parameter record (${key}).`,
          });
        }

        // Validate percentage fields (0-100)
        if (
          [
            "broken",
            "purity",
            "yellowKernel",
            "damageKernel",
            "redKernel",
            "paddyKernel",
            "chalkyRice",
            "millingDegree",
          ].includes(key)
        ) {
          if (typeof value !== "number" || value < 0 || value > 100) {
            await transaction.rollback(); // Rollback on validation error
            return res.status(400).json({
              message: `${readableKey} must be a number between 0 and 100%.`,
            });
          }
        }
        // Validate non-percentage numeric fields (non-negative)
        else if (["liveInsects", "averageGrainLength"].includes(key)) {
          if (typeof value !== "number" || value < 0) {
            await transaction.rollback(); // Rollback on validation error
            return res.status(400).json({
              message: `${readableKey} must be a non-negative number.`,
            });
          }
        }
      }
    } else if (physicalInspection) {
      // If physical inspection is requested, but it's NOT a specific rice type,
      // ensure no rice-specific physical parameters were sent.
      // This implicitly handles the `let` declared variables being null.
      const ricePhysicalParamValues = [
        broken,
        purity,
        yellowKernel,
        damageKernel,
        redKernel,
        paddyKernel,
        chalkyRice,
        liveInsects,
        millingDegree,
        averageGrainLength,
      ];
      if (
        ricePhysicalParamValues.some(
          (param) => param !== undefined && param !== null
        )
      ) {
        await transaction.rollback(); // Rollback on validation error
        return res.status(400).json({
          message:
            "Rice-specific physical inspection parameters should only be provided when 'Food & Beverages' -> 'Rice' and a specific Rice Type are selected for physical inspection.",
        });
      }
    }

    // --- Conditional Validation for Chemical Parameters ---
    // Chemical parameters are required if chemicalTesting is true, regardless of commodity.
    if (chemicalTesting) {
      // This validation now checks the value fetched from the database
      if (!chemicalParameters || chemicalParameters.trim() === "") {
        await transaction.rollback(); // Rollback on validation error
        return res.status(400).json({
          message:
            "Chemical parameters (text format) are required if chemical testing is selected, but were not found in the selected chemical parameter record.",
        });
      }
    } else {
      // If chemicalTesting is false, ensure chemicalParameters are null in the final object
      chemicalParameters = null;
    }

    // --- Conditional Validation for Inspection Dates ---
    if (!validInspectionTypes.includes(lowerCaseInspectionType)) {
      await transaction.rollback(); // Rollback on validation error
      return res.status(400).json({
        message: `Invalid inspection type. Allowed: ${validInspectionTypes.join(
          ", "
        )}.`,
      });
    }

    if (lowerCaseInspectionType === "single_day") {
      if (!singleDayInspectionDate) {
        await transaction.rollback(); // Rollback on validation error
        return res.status(400).json({
          message:
            "Single day inspection date is required for 'Single Day' inspection type.",
        });
      }
      // Ensure multi-day dates are not provided
      if (multiDayInspectionStartDate || multiDayInspectionEndDate) {
        await transaction.rollback(); // Rollback on validation error
        return res.status(400).json({
          message:
            "Multi-day inspection dates should not be provided for 'Single Day' inspection type.",
        });
      }
    } else if (lowerCaseInspectionType === "multi_day") {
      if (!multiDayInspectionStartDate || !multiDayInspectionEndDate) {
        await transaction.rollback(); // Rollback on validation error
        return res.status(400).json({
          message:
            "Multi-day inspection start and end dates are required for 'Multi Day' inspection type.",
        });
      }
      // Optional: Add date format or logical validation (e.g., start date <= end date) if dates are strings
      // For example, if dates are expected in 'YYYY-MM-DD' format:
      // if (!/^\d{4}-\d{2}-\d{2}$/.test(multiDayInspectionStartDate) || !/^\d{4}-\d{2}-\d{2}$/.test(multiDayInspectionEndDate)) {
      //      await transaction.rollback(); // Rollback on validation error
      //     return res.status(400).json({ message: "Multi-day dates must be in YYYY-MM-DD format." });
      // }
      // if (new Date(multiDayInspectionStartDate) > new Date(multiDayInspectionEndDate)) {
      //      await transaction.rollback(); // Rollback on validation error
      //     return res.status(400).json({ message: "Multi-day inspection start date cannot be after end date." });
      // }

      // Ensure single-day date is not provided
      if (singleDayInspectionDate) {
        await transaction.rollback(); // Rollback on validation error
        return res.status(400).json({
          message:
            "Single day inspection date should not be provided for 'Multi Day' inspection type.",
        });
      }
    }

    // Create the inquiry
    const newEnquiry = await Raiseenquiry.create(
      {
        inspectionLocation,
        country,
        urgencyLevel,
        commodityCategory,
        // Only save subCommodity if relevant: either it expects a predefined one, or it's 'other'
        subCommodity:
          expectsPredefinedSubCommodity || isOtherCommodityCategory
            ? subCommodity
            : null,
        // Only save riceType if relevant (Food & Beverages -> Rice)
        riceType: isRiceSubCommodity ? riceType : null,
        volume,
        siUnits,
        expectedBudgetUSD,
        // Save inspectionType
        inspectionType,
        // Conditionally save dates based on inspectionType
        singleDayInspectionDate:
          lowerCaseInspectionType === "single_day"
            ? singleDayInspectionDate
            : null,
        multiDayInspectionStartDate:
          lowerCaseInspectionType === "multi_day"
            ? multiDayInspectionStartDate
            : null,
        multiDayInspectionEndDate:
          lowerCaseInspectionType === "multi_day"
            ? multiDayInspectionEndDate
            : null,
        physicalInspection,
        chemicalTesting,
        certificates,
        companyName,
        contactPersonName,
        emailAddress,
        phoneNumber,
        specialRequirements,
        // Conditionally save rice-specific physical parameters (now using the `let` variables populated from fetch)
        broken: shouldValidateDetailedRicePhysicalParams ? broken : null,
        purity: shouldValidateDetailedRicePhysicalParams ? purity : null,
        yellowKernel: shouldValidateDetailedRicePhysicalParams
          ? yellowKernel
          : null,
        damageKernel: shouldValidateDetailedRicePhysicalParams
          ? damageKernel
          : null,
        redKernel: shouldValidateDetailedRicePhysicalParams ? redKernel : null,
        paddyKernel: shouldValidateDetailedRicePhysicalParams
          ? paddyKernel
          : null,
        chalkyRice: shouldValidateDetailedRicePhysicalParams
          ? chalkyRice
          : null,
        liveInsects: shouldValidateDetailedRicePhysicalParams
          ? liveInsects
          : null,
        millingDegree: shouldValidateDetailedRicePhysicalParams
          ? millingDegree
          : null,
        averageGrainLength: shouldValidateDetailedRicePhysicalParams
          ? averageGrainLength
          : null,
        // Conditionally save chemical parameters (now using the `let` variable populated from fetch)
        chemicalParameters: chemicalTesting ? chemicalParameters : null,
      },
      { transaction }
    ); // Pass the transaction here

    await transaction.commit(); // Commit the transaction on success

    res.status(201).json({
      message: "Enquiry created successfully!",
      enquiry: newEnquiry,
    });
  } catch (error) {
    if (transaction) {
      await transaction.rollback(); // Rollback the transaction on error
    }
    console.error("Error creating enquiry:", error);
    if (error.name === "SequelizeValidationError") {
      const errors = error.errors.map((err) => err.message);
      return res.status(400).json({ message: "Validation error", errors });
    }
    // Handle specific errors like unique constraints or database issues
    if (error.original && error.original.code === "23505") {
      // PostgreSQL unique violation error code
      return res.status(409).json({
        message: "A record with this unique identifier already exists.",
      });
    }
    res
      .status(500)
      .json({ message: "Failed to create enquiry", error: error.message });
  }
};
