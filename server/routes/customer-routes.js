// --- routes/customers.js ---
// This file defines the API routes for customer management.
const express = require("express");
const router = express.Router();
const db = require("../models"); // Import the database connection and models
const Customer = db.Customer; // Get the Customer model

// --- CRUD Operations for Customers ---

// POST /api/customers - Create a new customer
router.post("/", async (req, res) => {
  try {
    const {
      country_code,
      full_name,
      email_address,
      mobile_number,
      trade_license_or_legal_document_photo_url,
      certificate_photo_url,
    } = req.body;

    // Basic validation: Ensure required fields are present
    if (!country_code || !full_name || !email_address || !mobile_number) {
      return res.status(400).json({
        message:
          "Required fields missing: country_code, full_name, email_address, mobile_number",
      });
    }

    // Create the new customer record in the database
    const newCustomer = await Customer.create({
      country_code,
      full_name,
      email_address,
      mobile_number,
      trade_license_or_legal_document_photo_url,
      certificate_photo_url,
    });
    // Respond with the newly created customer object and a 201 Created status
    res.status(201).json(newCustomer);
  } catch (error) {
    console.error("Error creating customer:", error);
    // Handle specific Sequelize unique constraint errors (e.g., duplicate email/mobile)
    if (error.name === "SequelizeUniqueConstraintError") {
      return res
        .status(409)
        .json({ message: "Email address or mobile number already exists." });
    }
    // Generic internal server error for other issues
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

// GET /api/customers - Get all customers
router.get("/", async (req, res) => {
  try {
    // Retrieve all customer records from the database
    const customers = await Customer.findAll();
    // Respond with the list of customers
    res.status(200).json(customers);
  } catch (error) {
    console.error("Error fetching customers:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

// GET /api/customers/:id - Get a single customer by customer_id
router.get("/:id", async (req, res) => {
  try {
    // Find a customer by their primary key (customer_id)
    const customer = await Customer.findByPk(req.params.id);
    // If no customer is found, return a 404 Not Found error
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    // Respond with the found customer object
    res.status(200).json(customer);
  } catch (error) {
    console.error("Error fetching customer by ID:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

// PUT /api/customers/:id - Update a customer by customer_id
router.put("/:id", async (req, res) => {
  try {
    const {
      country_code,
      full_name,
      email_address,
      mobile_number,
      trade_license_or_legal_document_photo_url,
      certificate_photo_url,
    } = req.body;

    // Update the customer record based on the provided ID
    const [updatedRowsCount, updatedCustomers] = await Customer.update(
      {
        country_code,
        full_name,
        email_address,
        mobile_number,
        trade_license_or_legal_document_photo_url,
        certificate_photo_url,
      },
      {
        where: { customer_id: req.params.id }, // Specify the customer to update by their customer_id
        returning: true, // Return the updated object (PostgreSQL specific)
      }
    );

    // If no rows were updated, it means the customer was not found
    if (updatedRowsCount === 0) {
      return res
        .status(404)
        .json({ message: "Customer not found or no changes made" });
    }
    // Respond with the updated customer object
    res.status(200).json(updatedCustomers[0]);
  } catch (error) {
    console.error("Error updating customer:", error);
    // Handle specific Sequelize unique constraint errors during update
    if (error.name === "SequelizeUniqueConstraintError") {
      return res
        .status(409)
        .json({ message: "Email address or mobile number already exists." });
    }
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

// DELETE /api/customers/:id - Delete a customer by customer_id
router.delete("/:id", async (req, res) => {
  try {
    // Delete the customer record based on the provided ID
    const deletedRowCount = await Customer.destroy({
      where: { customer_id: req.params.id }, // Specify the customer to delete by their customer_id
    });

    // If no rows were deleted, it means the customer was not found
    if (deletedRowCount === 0) {
      return res.status(404).json({ message: "Customer not found" });
    }
    // Respond with a 204 No Content status for successful deletion
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting customer:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

module.exports = router;
