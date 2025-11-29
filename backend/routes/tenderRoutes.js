import express from "express";
import {
  getTenders,
  addTender,
  updateTender,
  deleteTender
} from "../controllers/tenderController.js";

const router = express.Router();

router.get("/", getTenders);
router.post("/", addTender);
router.put("/:id", updateTender);
router.delete("/:id", deleteTender);

export default router;
