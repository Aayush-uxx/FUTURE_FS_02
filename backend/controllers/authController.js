import bcrypt from "bcryptjs";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const emailRegex = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/;

    if (!email || !emailRegex.test(email)) {
      return res
        .status(400)
        .json({ message: "Please provide a valid email address" });
    }
    if (!name || name.trim() === "") {
      return res.status(400).json({ message: "Name is required" });
    }
    if (!password || password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }
    const userExist = await userModel.findOne({ email });
    if (userExist)
      return res.status(400).json({ message: "User already exits !" });
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET);
    res.status(201).json({
      message: "User created successfully",
      token,
      user: { name, email },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error " });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const emailRegex = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/;

    if (!email || !emailRegex.test(email)) {
      return res
        .status(400)
        .json({ message: "Please provide a valid email address" });
    }
    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }
    const user = await userModel.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credential" });
    const passwordCheck = await bcrypt.compare(password, user.password);
    if (!passwordCheck)
      return res.status(400).json({ message: "Invalid credential" });
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    res.status(200).json({
      message: "Login successfull",
      token,
      user: { name: user.name, email: user.email },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
export { register, login };
