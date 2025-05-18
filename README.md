# Resume Builder Bot (React, Node, Next.js, shadcn/ui, gemini-2.5-flash)
# Author: [Sarthak Deshmukh]

Steps to run the project:

0. npm install (in root directory)
1. cd client
2. npm install
3. cd ..
4. cd server
5. npm install
6. cd ..
7. npm run start

Instructions to generate apikey:
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Enable Gemini API
3. Generate new api key
4. Create config.js file in server directory and paste apikey with key as 
   - export const GEMINI_API_KEY = "your-api-key";