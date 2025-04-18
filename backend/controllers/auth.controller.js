import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
// import ExpressError from "../utils/ExpressError.js";

// Signup
// export const signup = async (req, res) => {
//   const { name, email, password } = req.body;
//   console.log("Signup request received:", req.body); // Debugging line
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       throw new ExpressError("User already exists", 400);
//     }
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = new User({ name, email, password: hashedPassword });
//     await user.save();
//     res.status(201).json({ message: "User Created" });
// };
export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }


    //check whether length is >= 6
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters"
      });
    }
 
    //check if user already exist
    //use find one it gives an single object
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      // console.log("User already exists");
      // console.log(existingUser);
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }



    //secure the password

    //optimal round jaida heavy hoga //if kam then can be hacked------------>
    // AES ke bre mein padhoo //worth it very interesting
    //Retry startegy to hash password for atleast three times
    let tryy = 0;
    let hashedPassword;
    while (tryy < 3) {
      try {
        hashedPassword = await bcrypt.hash(password, 10);
        if (hashedPassword) break;
      } catch (e) {
        tryy++;
        if (tryy == 3) {
          return res.status(500).json({
            success: false,
            data: "Error in hashing passwrord",
          });
        }
      }
    }

    //entry in db

    const user = await User.create({
      name, email, password: hashedPassword
    })
    
    return res.status(200).json({
      success: true,
      message: "Account created successfully",
      user
    });
  } catch (error) {
    console.log(error);
    res.json({
      message: "User cannot be registed, Please try again later",
    }).status(500);
  }
};
// Login
// export const login = async (req, res) => {
//   const { email, password } = req.body;
//   console.log("Login request received:", req.body); // Debugging line
//   if (!email || !password) {
//     throw new ExpressError("Email and password are required", 400);
//   }

//   const user = await User.findOne({ email });
//   if (!user || !(await bcrypt.compare(password, user.password))) {
//     throw new ExpressError("Invalid credentials", 401);
//   }

//   const options = {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === "production",
//     //STRICT IF HOSTED TOGETHER
//      //Allow cross-site cookies
//     sameSite: process.env.NODE_ENV === "production" ? "None" : "strict",
//     maxAge: 24 * 60 * 60 * 1000, // 1 day
//   }
//   const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
//   res.cookie("token" , token,options).status(200).json({ token, userId: user._id, name: user.name });

// };

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if both fields are provided
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Compare password with hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }


    const payload = {
      id: user._id,
      email: user.email,
    };

    // Generate JWT token
    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    const options = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      //STRICT IF HOSTED TOGETHER
      //Allow cross-site cookies
      sameSite: process.env.NODE_ENV === "production" ? "None" : "strict",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    }

    const responseUser = user;
    responseUser.password = ""; // Remove password from response


    // Send token in HTTP-only cookie
    res.cookie("token", token, options).status(200).json({
      success: true,
      message: "Login successful",
      token,
      responseUser,
      // location
    });

  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};


export const checkAuth = (req, res) => {
  try {
    console.log("Checking authentication status...");
    console.log(req.user)
    res.status(200).json(req.user);
  } catch (error) {
    console.log("Error in checkAuth controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};