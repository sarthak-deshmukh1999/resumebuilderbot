import express from 'express';
import cors from 'cors';
import generateAdvancedRecommendationPrompt from './recommendationPrompt.js';
import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from 'fs';
import path from 'path';
import { GEMINI_API_KEY } from './config.js';
import { fileURLToPath } from 'url';
import latex from 'node-latex';
import { Readable } from 'stream';
import dotenv from 'dotenv';
dotenv.config();

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const mainTexPath = path.join(dirname, 'main.txt');
const mainTex = fs.readFileSync(mainTexPath, 'utf8');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: ['http://localhost:9002','http://localhost:3000'],
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || GEMINI_API_KEY);

app.post('/api/chat', async (req, res) => {
  //console.log('Received request:', req.body);
  const conversation = req.body.conversation;
  let userInput = "";
  if (conversation && conversation.length > 0) {
    const latestMessage = conversation[conversation.length - 1];
    if (latestMessage.role === 'user' && latestMessage.content && Array.isArray(latestMessage.content) && latestMessage.content.length > 0 && latestMessage.content[0].type === 'text') {
      userInput = latestMessage.content[0].content;
    }
  }
  //console.log('Extracted userInput:', userInput);
  //const userInput = req.body.content;
  const recommendationPrompt = generateAdvancedRecommendationPrompt(
    mainTex,
    userInput
  );
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContentStream([recommendationPrompt],
      {
        temperature: 0.2,
        topP: 0.8,
        topK: 40,
        maxOutputTokens: 2048,
      }
    );
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    for await (const chunk of result.stream) {
      const content = chunk.text();
      if (content) {
        res.write(`data: ${JSON.stringify({ content })}\n\n`);
        // console.log(content+"\n\n");
      }
    }
    
    res.write('data: [DONE]\n\n');
    res.end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

app.post('/api/latextopdf', async (req, res) => {
  const { latexCode } = req.body;
  if (!latexCode) {
    return res.status(400).json({ error: 'Missing latexCode in request body' });
  }

  // If you see "pdflatex is not installed or not in PATH." in your logs,
  // you must install a TeX distribution (TeX Live or MikTeX) and ensure pdflatex is in your PATH.
  // This is a server environment requirement, not a code issue.
  // Example for Ubuntu: sudo apt-get install texlive-latex-base

  const { exec } = await import('child_process');
  exec('pdflatex --version', (error) => {
    if (error) {
      console.error('pdflatex is not installed or not in PATH.');
      return res.status(500).json({ error: 'pdflatex is not installed on the server. Please install a TeX distribution (e.g., TeX Live or MikTeX) and ensure pdflatex is in your PATH.' });
    }

    try {
      // Convert string to readable stream
      const input = Readable.from([latexCode]);
      const pdfStream = latex(input);

      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename="resume.pdf"');

      pdfStream.on('error', (err) => {
        console.error('LaTeX compile error:', err);
        res.status(500).end('Failed to generate PDF');
      });

      pdfStream.pipe(res);
    } catch (err) {
      console.error('PDF generation error:', err);
      res.status(500).json({ error: 'Failed to generate PDF' });
    }
  });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
