import "dotenv/config";
import express from "express";
import cors from "cors";
import { fileURLToPath } from "url";
import path from "path";

import { geminiChatServices } from "./api/geminiChatServices.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.post("/api/chat", async (req, res) => {
  try {
    const { messages } = req.body;

    if (!Array.isArray(messages)) {
      throw new Error("Messages must be an array!");
    }

    const contents = messages.map((message) => ({
      role: message.role,
      parts: [{ text: message.content }],
    }));

    const geminiResponse = await geminiChatServices({ contents });

    res.json({
      result: geminiResponse || "Sorry, no response received.",
    });
  } catch (error) {
    console.error("Error handling request:", error);

    res.status(500).send({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`New server is running on http://localhost:${PORT}`);
});
