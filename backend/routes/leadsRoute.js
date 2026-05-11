import express from "express"

const router = express.Router();

import { deleteLead, getLead, insertLead, updateLead } from "../controllers/leadsController.js"

// routes
router.post("/insertLead", insertLead);
router.get("/getLead", getLead);
router.put("/updateLead/:id", updateLead);
router.delete("/deleteLead/:id", deleteLead);

export default router;