import express from 'express';
import cors from 'cors';
import generateAdvancedRecommendationPrompt from './recommendationPrompt.js';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { GEMINI_API_KEY } from './config.js'; // <-- import API key from config.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const mainTexPath = path.join(dirname, 'main.txt');
const mainTex = fs.readFileSync(mainTexPath, 'utf8');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
const port = 3001;

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

app.post('/api/chat', async (req, res) => {
  const userInput = req.body.userInput;
  const recommendationPrompt = generateAdvancedRecommendationPrompt(
    mainTex,
    userInput
  );
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-preview-04-17" });
    const result = await model.generateContentStream([recommendationPrompt]);
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    for await (const chunk of result.stream) {
      const content = chunk.text();
      if (content) {
        res.write(`data: ${JSON.stringify({ content })}\n\n`);
      }
    }
    res.write('data: [DONE]\n\n');
    res.end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
