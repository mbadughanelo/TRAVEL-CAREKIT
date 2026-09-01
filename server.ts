import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json({ limit: '500kb' }));

// Simple in-memory sliding window rate limiter for API endpoints
interface RateLimitRecord {
  timestamps: number[];
}
const ipRequestMap = new Map<string, RateLimitRecord>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 30; // Max 30 requests / minute

// Rate limiting middleware
const rateLimiter = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const clientIp = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || 'unknown-ip';
  const now = Date.now();

  let record = ipRequestMap.get(clientIp);
  if (!record) {
    record = { timestamps: [] };
    ipRequestMap.set(clientIp, record);
  }

  // Filter timestamps within the current window
  record.timestamps = record.timestamps.filter(t => now - t < RATE_LIMIT_WINDOW_MS);

  if (record.timestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    return res.status(429).json({
      error: 'Too many requests. Please slow down and try again in a minute.',
      retryAfterSeconds: Math.ceil((record.timestamps[0] + RATE_LIMIT_WINDOW_MS - now) / 1000)
    });
  }

  record.timestamps.push(now);
  next();
};

// Periodic garbage collection for rate limiter map
setInterval(() => {
  const now = Date.now();
  for (const [ip, record] of ipRequestMap.entries()) {
    record.timestamps = record.timestamps.filter(t => now - t < RATE_LIMIT_WINDOW_MS);
    if (record.timestamps.length === 0) {
      ipRequestMap.delete(ip);
    }
  }
}, 5 * 60 * 1000);

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
  res.json({ status: 'ok', timestamp: new Date().toISOString(), app: 'NursePath', port: PORT });
});

// Ask NursePath AI Assistant API endpoint with rate limiting & security hardening
app.post('/api/gemini/ask', rateLimiter, async (req, res) => {
  try {
    const { message, history, context } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message text is required.' });
    }

    if (message.length > 3000) {
      return res.status(400).json({ error: 'Message exceeds maximum length limit of 3,000 characters.' });
    }

    const systemInstruction = `
You are "Ask NursePath", an expert international nurse career navigator and regulatory roadmap explanation assistant.
Your mission is to help internationally educated nurses understand their personalized roadmap, requirements, documents, and costs.

MANDATORY REGULATORY SAFETY & CITATION RULES:
1. NursePath NEVER presents itself as an official regulator, immigration adviser, recruitment agency, or legal authority.
2. NEVER fabricate, guess, or hallucinate regulatory requirements, fees, exams, or timelines.
3. CITATION ENFORCEMENT: Whenever stating a requirement, fee, exam, or timeline, YOU MUST explicitly cite the specific official governing body or standard (e.g. "[Source: NMC Guidance]", "[Source: Ahpra / NMBA IQNM Standard]", "[Source: Florida Board of Nursing MQA]", "[Source: Texas Board of Nursing]", "[Source: CRNA Alberta]").
4. Australia PTE standard: Remind nurses that the NMBA standard requires PTE Academic Overall 65 with minimum 66 in Listening, 66 in Reading, 66 in Speaking, and 56 in Writing (updated NMBA standard).
5. Australia Streamlined pathway: The NMBA streamlined assessment route requires at least 1,800 RN clinical practice hours in an approved comparable jurisdiction (UK, Ireland, USA, Canada-BC/ON, Singapore, Spain, NZ) since January 2017.
6. US States: Emphasize that each US State Board of Nursing has distinct rules (e.g., Texas requires NJE open-book exam; Florida requires FDLE Livescan with ORI EDOH4420Z; California requires detailed clinical hours breakdown). Passing NCLEX-RN is licensing, NOT a work visa.
7. If specific regulatory information is not verified or not in the user's provided context, explicitly state: "This detail should be verified directly with the official regulator before payment."
8. Format responses cleanly using structured bullet points, clear headings, and bold key terms.

CURRENT USER CONTEXT:
${context ? JSON.stringify(context, null, 2) : 'No user context provided.'}
`;

    // Format chat contents if history is provided, sanitizing input
    const contents: any[] = [];
    if (Array.isArray(history) && history.length > 0) {
      // Limit to last 10 messages to prevent token bloat
      const recentHistory = history.slice(-10);
      for (const item of recentHistory) {
        if ((item.role === 'user' || item.role === 'model') && typeof item.text === 'string') {
          contents.push({
            role: item.role,
            parts: [{ text: item.text.slice(0, 3000) }]
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
        temperature: 0.2
      }
    });

    const reply = response.text || "I'm sorry, I couldn't generate a verified response at this moment. Please verify with the official regulator.";
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

