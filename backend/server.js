import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import dbCon from "./config/db.js";
import authRoute from "./routes/authRoute.js";
import leadRoute from "./routes/leadRoutes.js";
import noteRoute from "./routes/noteRoutes.js";

dotenv.config();

const app = express();

// Standard CORS middleware
app.use(cors());

// Body Parser
app.use(express.json());

// Health Check
app.get("/ping", (req, res) => res.status(200).json({ message: "API is alive" }));

// Database Middleware (Wait for DB)
app.use(async (req, res, next) => {
  try {
    await dbCon();
    next();
  } catch (error) {
    res.status(500).json({ message: "Database connection failed" });
  }
});

// Routes
app.use("/auth", authRoute);
app.use("/leads", leadRoute);
app.use("/notes", noteRoute);

// 6. 404 Handler
app.use((req, res) => {
  res.status(404).json({ message: `Route ${req.originalUrl} not found` });
});

export default app;
