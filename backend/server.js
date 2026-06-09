import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import dbCon from "./config/db.js";
import authRoute from "./routes/authRoute.js";
import leadRoute from "./routes/leadRoutes.js";
import noteRoute from "./routes/noteRoutes.js";

dotenv.config();

const app = express();

app.use(express.json());

const allowedOrigins = process.env.CLIENT_URL
  ? process.env.CLIENT_URL.split(",").map((o) => o.trim())
  : [
      "http://localhost:5173",
      "http://localhost:5174",
      "https://minicrmfront-git-main-aayush-s-projects13.vercel.app",
    ];

app.use(
  cors({
    origin: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    optionsSuccessStatus: 200,
  })
);

app.use(async (req, res, next) => {
  try {
    await dbCon();
    next();
  } catch (error) {
    res.status(500).json({ message: "Database connection failed" });
  }
});

app.use("/api/auth", authRoute);
app.use("/api/leads", leadRoute);
app.use("/api/notes", noteRoute);

export default app;
