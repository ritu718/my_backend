import User from "../user/user.model.js";

import bcrypt from "bcryptjs";

import jwt from "jsonwebtoken";


// REGISTER
export const registerUser = async (req, res) => {
    console.log("🔥 NEW AUTH CONTROLLER");
  try {

    const { name, email, password, confirmPassword } = req.body;

if (!name || !email || !password || !confirmPassword) {
  return res.status(400).json({
    success: false,
    message: "All fields are required",
  });
}

if (password !== confirmPassword) {
  return res.status(400).json({
    success: false,
    message: "Password and Confirm Password do not match",
  });
}

const existingUser = await User.findOne({ email });

if (existingUser) {
  return res.status(400).json({
    success: false,
    message: "User already exists",
  });
}

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};


// LOGIN
export const loginUser = async (req, res) => {
  try {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};