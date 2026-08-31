import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini client server-side
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build'
    }
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString(), app: 'NursePath' });
});

// Ask NursePath AI Assistant API endpoint
app.post('/api/gemini/ask', async (req, res) => {
  try {
    const { message, history, context } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required.' });
    }

    const systemInstruction = `
You are "Ask NursePath", an expert international nurse career navigator and roadmap explanation assistant.
Your mission is to help internationally educated nurses understand their personalized roadmap, requirements, documents, and costs.

CRITICAL REGULATORY SAFETY RULES (MANDATORY):
1. NursePath NEVER presents itself as an official regulator, immigration adviser, recruitment agency, or guarantee of registration/licensure.
2. NEVER invent, hallucinate, or fabricate regulatory requirements, fees, exams, or timelines.
3. If specific regulatory information is not verified or not in the user's provided context, explicitly state: "This information needs to be confirmed with the official regulator."
4. Whenever discussing regulatory requirements, mention the responsible official regulator (e.g. NMC in the UK, State Board of Nursing in the US, CRNA in Alberta, CNO in Ontario, BCCNM in BC, NMBA/Ahpra in Australia).
5. Always remind users to verify details directly with official sources before submitting applications or making non-refundable payments.
6. Clearly state that licensing/registration is separate from immigration/visas (especially for the US and other destinations).
7. Speak in an empathetic, professional, clear, and reassuring tone suitable for global healthcare professionals.
8. Format responses cleanly using markdown bullet points and bold highlights for readability.

CURRENT USER CONTEXT:
${context ? JSON.stringify(context, null, 2) : 'No user context provided.'}
`;

    // Format chat contents if history is provided
    const contents: any[] = [];
    if (Array.isArray(history) && history.length > 0) {
      for (const item of history) {
        if (item.role === 'user' || item.role === 'model') {
          contents.push({
            role: item.role,
            parts: [{ text: item.text }]
          });
        }
      }
    }

    // Add current user prompt
    contents.push({
      role: 'user',
      parts: [{ text: message }]
    });

    const response = await ai.models.generateContent({
      model: 'gemini-3.7-flash',
      contents: contents,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.3
      }
    });

    const reply = response.text || "I'm sorry, I couldn't generate a response at this moment. Please verify with the official regulator.";
    return res.json({ reply });
  } catch (error: any) {
    console.error('Gemini API Error in /api/gemini/ask:', error);
    return res.status(500).json({ 
      error: 'Failed to process request with AI assistant.', 
      details: error?.message || 'Unknown error' 
    });
  }
});

// Vite middleware configuration
async function setupServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`NursePath Server running on http://0.0.0.0:${PORT}`);
  });
}

setupServer();
