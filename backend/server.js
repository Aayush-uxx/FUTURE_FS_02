import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import dbCon from "./config/db.js";
import authRoute from "./routes/authRoute.js";
import leadRoute from "./routes/leadRoutes.js";
import noteRoute from "./routes/noteRoutes.js";

dotenv.config();

const app = express();

// 1. Manual CORS - Direct Header injection (Must be first)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  
  // Handle Preflight (OPTIONS) immediately
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  next();
});

// 2. Body Parser
app.use(express.json());

// 3. Health Check
app.get("/ping", (req, res) => res.status(200).json({ message: "API is alive" }));

// 4. Database Middleware (Bypass for OPTIONS)
app.use(async (req, res, next) => {
  if (req.method === "OPTIONS") return next();
  try {
    await dbCon();
    next();
  } catch (error) {
    res.status(500).json({ message: "Database connection failed" });
  }
});

// 5. Routes (Removed /api prefix for stability)
app.use("/auth", authRoute);
app.use("/leads", leadRoute);
app.use("/notes", noteRoute);

// 6. 404 Handler
app.use((req, res) => {
  res.status(404).json({ message: `Route ${req.originalUrl} not found` });
});

export default app;
