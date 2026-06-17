import { Router } from "express";
import { askAI } from "../services/ai.js";

const router = Router();

router.get("/query", async (req, res) => {
    try {
        console.log()
        const { question } = req.query;
        if (!question) return res.status(400).json({ error: "question is required" });

        const answer = await askAI(question);
        res.json({ answer });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
