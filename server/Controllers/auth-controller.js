// server/controllers/auth-controller.js
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../models");
const User = db.users;

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  console.error("FATAL ERROR: JWT_SECRET environment variable is not defined!");
  process.exit(1);
}

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required." });
    }

    const user = await User.findOne({ where: { email: email } });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const tokenPayload = {
      userId: user.id,
      email: user.email,
      role: user.role,
    };

    const token = jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: "12h" });

    res.status(200).json({
      message: "Login successful!",
      token: token,
      userId: user.id,
      email: user.email,
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName,
    });
  } catch (error) {
    console.error("Login process error:", error);
    next(error);
  }
};

exports.register = async (req, res, next) => {
  const { email, password, firstName, lastName } = req.body;

  try {
    if (!email || !password || !firstName || !lastName) {
      return res
        .status(400)
        .json({ message: "All fields are required for registration." });
    }

    const existingUser = await User.findOne({ where: { email: email } });
    if (existingUser) {
      return res.status(409).json({ message: "Email already registered." });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

    const newUser = await User.create({
      email: email,
      password: hashedPassword, // Store the hashed password
      firstName: firstName,
      lastName: lastName,
      role: "customer",
    });

    const tokenPayload = {
      userId: newUser.id,
      email: newUser.email,
      role: newUser.role,
    };
    const token = jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: "12h" });

    res.status(201).json({
      message: "User registered successfully!",
      token: token,
      userId: newUser.id,
      email: newUser.email,
      role: newUser.role,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
    });
  } catch (error) {
    console.error("Registration error:", error);
    next(error);
  }
};
