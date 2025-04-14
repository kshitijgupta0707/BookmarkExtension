import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import ExpressError from "../utils/ExpressError.js";

// Signup
export const signup = async (req, res) => {
  const { name, email, password } = req.body;
  console.log("Signup request received:", req.body); // Debugging line
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new ExpressError("User already exists", 400);
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: "User Created" });
};

// Login
export const login = async (req, res) => {
  const { email, password } = req.body;
  console.log("Login request received:", req.body); // Debugging line
  if (!email || !password) {
    throw new ExpressError("Email and password are required", 400);
  }

  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new ExpressError("Invalid credentials", 401);
  }
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
  res.json({ token, userId: user._id, name: user.name });
  
};


