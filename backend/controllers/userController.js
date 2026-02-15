import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";

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
