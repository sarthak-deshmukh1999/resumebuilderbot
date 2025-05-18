import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';import { getRandomStudentProfile, expandedCourseData } from './courseData.js';
import generateAdvancedRecommendationPrompt from './recommendationPrompt.js';
import { GoogleGenerativeAI } from "@google/generative-ai";
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
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post('/api/chat', async (req, res) => {
  const userInput = req.body.userInput;
  const studentProfile = getRandomStudentProfile();
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
