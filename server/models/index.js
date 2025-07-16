// --- models/index.js ---
// This file sets up the Sequelize connection and loads all models.
const { Sequelize } = require("sequelize");
const config = require("../config/config.json"); // Load your config file

// Determine the environment (e.g., 'local', 'development', 'production')
const env = process.env.NODE_ENV || "local";
const dbConfig = config[env];

// Create a new Sequelize instance
const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    port: dbConfig.port, // Only needed for PostgreSQL
    logging: dbConfig.logging, // Set to true to see SQL queries in console
    define: dbConfig.define || {}, // Apply global model definitions
  }
);

const db = {};

// Load models
db.sequelize = sequelize;
db.Sequelize = Sequelize;

// NEW: Import and initialize the Customer model
db.Customer = require("./customer")(sequelize);
db.internationalInspector = require("./Internationalinspector")(sequelize);
db.indianInspector = require("./Indianinspector")(sequelize);
db.internationalcompany = require("./Internationalcompany")(sequelize);
db.Indiancompany = require("./indiancompany")(sequelize);
db.Raiseenquiry = require("./Raiseenquiry")(sequelize);
db.Phyinspectionparam = require("./Phyinspectionparam")(sequelize);
db.Chemicalinsparameter = require("./Cheminsparam")(sequelize);
// Define associations if you have multiple models (e.g., User hasMany Posts)
// Object.keys(db).forEach(modelName => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

module.exports = db;
