import jwt from "jsonwebtoken";

// protectedRoute
export const protectedRoute = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if(!token){
      return  res.status(401).json({success: false, message: "Unauthorized" });
    };

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;

    next();
  } catch (error) {
    console.log(error, "Error in protectRoute Controller");
    res.status(500).json({success: false, message: "Unauthorized" });
  };
};