import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import todosRouter from "./routes/todos";

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Default route (for Render test)
app.get("/", (req, res) => {
  res.send("Backend is live on Render 🚀");
});

// API Route
app.use("/api/todos", todosRouter);

// Environment variables
const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 5000;

// Check Mongo URI
if (!MONGO_URI) {
  console.error("❌ ERROR: MONGO_URI not found in Render environment variables");
  process.exit(1);
}

// Connect DB then start server
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected Successfully");
    app.listen(PORT, () =>
      console.log(`🚀 Server running on port ${PORT}`)
    );
  })
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err.message);
  });
