import User from "../models/UserModel.js";

// getUserById
export const getUserById = async (req, res) => {
  try {
    const userId = req.userId;  //

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({success: false, message: "User not found" });

    user.password = undefined;
    res.status(200).json({success: true, message: "Fetched user successfully", user });
  } catch (error) {
    console.log(error, "Error in getUserById Controller");
    res.status(500).json({success: false, message: "Something went wrong" });
  };
};