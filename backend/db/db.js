import mongoose from "mongoose";

const connectToDB = async () => {
  try {
    let mongodbURL = process.env.MONGODB_URL;
    const projectName = "create-resume";

    if (!mongodbURL) {
      throw new Error("MONGODB_URL environment variable not set");
    }

    if (mongodbURL.endsWith("/")) {
      mongodbURL = mongodbURL.slice(0, -1);
    }

    const fullURL = `${mongodbURL}/${projectName}`;

    await mongoose.connect(fullURL);

    console.log("✅ Database connected successfully");
  } catch (error) {
    console.error("❌ Error connecting to MongoDB:", error);
    process.exit(1); // stop the app if DB fails
  }
};

export default connectToDB;
