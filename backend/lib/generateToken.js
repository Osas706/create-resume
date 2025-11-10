import jwt from "jsonwebtoken";

// generateToken
export const generateToken = async (userId, res) => {
  try {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    
    if (!token) return res.status(401).json({ success: false, message: "Unauthorized - No token provided" });

    res.cookie("token", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000, //7d
      httpOnly: true, //prevent XSS attacks : cross-site scripting
      sameSite: "strict", // CSRF attacks
      secure: process.env.NODE_ENV === "development" ? false : true,
    });

    return token;
  } catch (error) {
    console.log("Error in generateToken middleware:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
