import express from "express";
import cors from "cors";
import tenderRoutes from "./routes/tenderRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/tenders", tenderRoutes);

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
