import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import dbCon from "./config/db.js";
import authRoute from "./routes/authRoute.js";
import leadRoute from "./routes/leadRoutes.js";
import noteRoute from "./routes/noteRoutes.js";

dotenv.config();

const app = express();

// 1. CORS MUST be first to handle preflight OPTIONS requests
app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    optionsSuccessStatus: 200,
  })
);

// 2. Body Parser
app.use(express.json());

// 3. Health Check (Ping)
app.get("/api/ping", (req, res) => res.status(200).json({ message: "API is alive" }));

// 4. Database Middleware (Wait for DB only for actual API calls)
app.use(async (req, res, next) => {
  if (req.method === "OPTIONS") return next();
  try {
    await dbCon();
    next();
  } catch (error) {
    console.error("DB Middleware Error:", error.message);
    res.status(500).json({ message: "Database connection failed" });
  }
});

// 5. Routes
app.use("/api/auth", authRoute);
app.use("/api/leads", leadRoute);
app.use("/api/notes", noteRoute);

// 6. 404 Handler
app.use((req, res) => {
  res.status(404).json({ message: `Route ${req.originalUrl} not found` });
});

export default app;
