import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectToDB from './db/db.js';
import authRoutes from "./routes/AuthRoute.js";

// database connection
await connectToDB();

const app = express();
const PORT = process.env.PORT || 3000;

// middlewares
app.use(express.json());
app.use(cors());

// routes
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
})