import { generateToken } from "../lib/generateToken.js";
import User from "../models/UserModel.js";
import bcrypt from "bcrypt";

// regsiterUser
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ sucess: false, message: "All fields are required" });
    }

    if (password.length < 6) {
      return res.status(400).json({
        sucess: false,
        message: "Password should be at least 6 characters",
      });
    }

    // check if emailis valid: regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ sucess: false, message: "Invalid email format" });
    }

    // check for existing User
    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ sucess: false, message: "Email already exists" });

    // hashpassowrd
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create newUser
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    // token
    const token = generateToken(newUser._id, res);
    newUser.password = undefined;

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
      user: newUser,
    });
  } catch (error) {
    console.log(error, "Error in registerUser controller");
    res.status(500).send({ success: false, message: "Something went wrong" });
  }
};

// loginUser
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({success: false, message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({success: false, message: "Invalid credentials" });

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) return res.status(400).json({success: false, message: "Invalid credentials" });

    // token
    const token = generateToken(newUser._id, res);
    newUser.password = undefined;

    res.status(200).json({
      success: true,
      message: "Login was successful",
      token,
      user: newUser,
    });
  } catch (error) {
    console.log(error, "Error in loginUser Controller");
    res.status(500).json({success: false, message: "Something went wrong" });
  }
};

// logOut
export const logOut = async (req, res) => {
  try {
    res.cookie("token", "", { maxAge: 0 });
    res.status(200).json({success: true, message: "Logged out successfully" });
  } catch (error) {
    console.log(error, "Error in logOut Controller");
    res.status(500).json({success: false, message: "Something went wrong" });
  }
};

// forgotPassword
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email }).exec();
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Generate 6-digit code
    const code = crypto.randomInt(100000, 999999).toString();

    // Hash code before saving
    const hashedCode = await bcrypt.hash(code, 10);

    // Save hashed code & expiry on user
    user.resetPasswordCode = hashedCode;
    user.resetPasswordExpiry = new Date(Date.now() + 15 * 60 * 1000); // 15 min
    await user.save();

    // Send code via email
    await sendResetCodeEmail(user.email, "Password Reset Code", `Your reset code is: ${code}`);

    return res.status(200).json({ success: true, message: "Reset code sent to email" });
  } catch (error) {
    console.error("Error in forgotPassword:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// resetPassword
export const resetPassword = async (req, res) => {
  try {
    const { email, code, password } = req.body;

    const user = await User.findOne({ email }).exec();
    if (!user || !user.resetPasswordCode) {
      return res.status(400).json({ success: false, message: "Invalid" });
    }

    // Check expiry
    if (user.resetPasswordExpiry && user.resetPasswordExpiry < new Date()) {
      return res.status(400).json({ success: false, message: "Code expired" });
    }

    // Compare codes
    const isValidCode = await bcrypt.compare(code, user.resetPasswordCode);
    if (!isValidCode) {
      return res.status(400).json({ success: false, message: "Invalid code" });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update password and clear reset fields
    user.password = hashedPassword;
    user.resetPasswordCode = undefined;
    user.resetPasswordExpiry = undefined;
    await user.save();

    return res.status(200).json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    console.error("Error in resetPassword:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};