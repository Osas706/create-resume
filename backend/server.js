import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import 'dotenv/config';
import connectToDB from './db/db.js';
import authRoutes from "./routes/AuthRoute.js";
import userRoutes from "./routes/UserRoute.js";
import resumeRoutes from "./routes/ResumeRoute.js";
import aiRoutes from "./routes/AiRoute.js";

// database connection
await connectToDB();

const app = express();
const PORT = process.env.PORT || 3000;

// middlewares
app.use(express.json());
app.use(cors({
  origin: [`http://localhost:${PORT}`, "https://create-this-resume.vercel.app/"],
  credentials: true
}));
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))

// routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/ai", aiRoutes);

app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
})