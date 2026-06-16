import { Router } from "express";

const api = Router();

api.get("/query", async (req, res) => {
  const { question } = req.query;

  console.log("Received query:", { question });

  if (!question || typeof question !== "string" || !question.trim()) {
    return res.status(400).json({ error: "question is required" });
  }

  try {
    res.status(200).json({
      answer:
        "This is a placeholder answer. The AI integration is currently disabled.",
    });
  } catch (err) {
    console.error("Query error:", err);
    res.status(500).json({ error: err.message });
  }
});

export default api;