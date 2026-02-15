import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export const register = async (req, res) => {
  try {
    const { fullname, username, password, confirmPassword, gender } = req.body;
    if (!fullname || !username || !password || !confirmPassword || !gender) {
      return res
        .status(400)
        .json({ Success: false, message: "Please fill required data" });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({
        Success: false,
        message: "Password not matched please fill correct password",
      });
    }
    const user = await User.findOne({ username });
    if (user) {
      return res
        .status(400)
        .json({ Success: false, message: "User already exists !" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const maleProfilePhoto = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const femaleProfilePhoto = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const newUser = await User.create({
      fullname,
      username,
      password: hashedPassword,
      profilePhoto: gender === "MALE" ? maleProfilePhoto : femaleProfilePhoto,
      gender,
    });
    return res
      .status(200)
      .json({ Success: true, message: "User created successfully" });
  } catch (error) {
    return res
      .status(400)
      .json({ Success: false, message: `Error is ${error}` });
  }
};
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res
        .status(400)
        .json({ Success: false, message: "Please fill all fields" });
    }
    const existUser = await User.findOne({ username });
    if (!existUser) {
      return res.status(400).json({
        Success: false,
        message: "User not fount with this user name please make account",
      });
    }
    const verifyPassword = await bcrypt.compare(password, existUser.password);
    if (!verifyPassword) {
      return res.status(400).json({
        Success: false,
        message: "Wrong password !",
      });
    }
    const tokenData = {
      userId: existUser._id,
    };
    const token = await jwt.sign(tokenData, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });
    //Now store this token in to cookies
    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
      })
      .json({
        Success: true,
        message: "Login successfully",
        _id: existUser._id,
        username: existUser.username,
        fullname: existUser.fullname,
        profilePhoto: existUser.profilePhoto,
      });
  } catch (error) {
    console.log(`Error is ${error}`);
  }
};
export const logout = async (req, res) => {
  try {
    return res
      .status(200)
      .cookie("token", "", { maxAge: 0 })
      .json({ Success: true, message: "Logged Out Successfully !" });
  } catch (error) {
    console.log(`Error is : ${error}`);
  }
};
