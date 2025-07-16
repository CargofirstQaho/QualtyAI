// server.js
const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

// DB setup
const db = require(path.resolve("server/models")); // Adjust path if needed

// Only Customer Routes
const customerRoutes = require("./server/routes/customer-routes");
const indianInspectorsRoutes = require("./server/routes/Indianinspector-routes");
const internationalInspectorRoutes = require("./server/routes/internationalinspector-routes");
const authRoutes = require("./server/routes/auth-routes");
const internationalCompanyRoutes = require("./server/routes/internationalcompany-routes");
const indianCompanyRoutes = require("./server/routes/indiancompany-routes");
const raiseenquiryRoutes = require("./server/routes/raiseenquiry-routes");
const phyinspectionparamRoutes = require("./server/routes/Phyinspectionparam-routes");
const chemicalinsparameter = require("./server/routes/Cheminspparam-routes");
// Content Security Policy (Optional)
app.use(function (req, res, next) {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; font-src 'self'; img-src 'self'; script-src 'self'; style-src 'self'; frame-src 'self'"
  );
  next();
});

// Middleware
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true }));

// CORS
const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Other middleware
app.use(logger("dev"));
app.use(cookieParser());

// Register customer API routes
app.use("/v1/api/customers", customerRoutes);
app.use("/v1/api/indianinspector", indianInspectorsRoutes);
app.use("/v1/api/internationalinspector", internationalInspectorRoutes);
app.use("/v1/api/auth", authRoutes);
// FIX: Changed internationalcompanyRoutes to internationalcompany
app.use("/v1/api/internationalcompany", internationalCompanyRoutes);
app.use("/v1/api/indiancompany", indianCompanyRoutes);
app.use("/v1/api/raiseenquiry", raiseenquiryRoutes);
app.use("/v1/api/Phyinspectionparam", phyinspectionparamRoutes);
app.use("/v1/api/Cheminspparam", chemicalinsparameter);
// Not Found Handler
app.use(function (req, res, next) {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// Global Error Handler
app.use(function (err, req, res, next) {
  console.error("Global Error Handler:", err);
  res.status(err.status || 500).json({
    message: err.message,
    error: process.env.NODE_ENV === "development" ? err : undefined,
  });
});

// Database Sync and Start Server
db.sequelize
  .sync({ alter: true })
  .then(function () {
    const PORT = process.env.PORT || 3214;
    app.listen(PORT, function () {
      process.env.TZ = "UTC";
      console.log(`Node.js process timezone set to: ${process.env.TZ}`);
      console.log(`Current server time (UTC): ${new Date().toISOString()}`);
      console.log(`Backend server connected on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to database or sync models:", err);
    process.exit(1);
  });

module.exports = app;
