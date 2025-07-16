// server/middleware/auth.js
const jwt = require("jsonwebtoken");

// Load JWT_SECRET from environment variables
const JWT_SECRET = process.env.JWT_SECRET;

// Critical check: Ensure JWT_SECRET is defined at application startup
if (!JWT_SECRET) {
  console.error("FATAL ERROR: JWT_SECRET environment variable is not defined!");
  // In a production environment, you might want a more robust error handling
  // or simply let the process crash if this critical dependency is missing.
  process.exit(1);
}

/**
 * Middleware to verify JWT token from the Authorization header.
 * Attaches decoded user information to `req.user` if the token is valid.
 *
 * Expected Authorization header format: "Bearer YOUR_JWT_TOKEN"
 */
module.exports = (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    return res.status(401).json({ message: "No token, authorization denied." });
  }

  // Extract the token part (after "Bearer ")
  const token = authHeader.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Token format invalid, authorization denied." });
  }

  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, JWT_SECRET);

    // Attach decoded user data to the request object.
    // This makes user info (e.g., userId, email, role) accessible in subsequent route handlers.
    req.user = decoded;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    // Handle specific JWT verification errors
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired." });
    }
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Token is not valid." });
    }

    // Catch any other unexpected errors during token verification
    console.error("Authentication middleware error:", error);
    res
      .status(500)
      .json({ message: "Server error during token verification." });
  }
};
