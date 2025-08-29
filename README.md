Gemini Chatbot API + Minimal Web UI

A tiny Express server that proxies requests to Google Gemini (via @google/genai) and serves a minimal chat UI (HTML/JS/CSS). Safe by default: the API key lives only on the server.

Features

🧠 Chat endpoint: POST /api/chat

🔐 Server-side API key with .env

🧩 ESM, Express 5, CORS, JSON body parsing

🖥️ Static frontend (in /public) with a simple chat box

📝 (Optional) Pretty Markdown rendering with sanitization & code highlighting

Quickstart

1. Requirements

Node.js v18+ (v20+ recommended)

A Gemini API key set as GEMINI_API_KEY

2. Install
   npm i

3. Environment variables

Create .env in the project root:

GEMINI_API_KEY=your_real_key_here
GEMINI_MODEL=gemini-2.0-flash # optional, defaults to gemini-2.0-flash in code
PORT=3000 # optional

Do not commit .env to source control.

4. Ensure dotenv loads before anything else

At the very top of your server entry file (e.g., server.js or index.js):

import "dotenv/config";

(This replaces any plain import "dotenv"; usage.)

5. Run

Add a start script (recommended) to package.json:

{
"scripts": {
"start": "node -r dotenv/config server.js"
}
}

Then:

npm start

Open: http://localhost:3000

Troubleshooting

GEMINI_API_KEY is undefined

Ensure .env exists at project root.

Ensure import "dotenv/config" is the first line of your server entry.

Or run with preload: node -r dotenv/config server.js

Node 20+: node --env-file=.env server.js

CORS / fetch errors

Confirm app.use(cors()) is enabled.

Check DevTools Network tab for 4xx/5xx and server logs.

Frontend stuck at “thinking…”

Check server logs for thrown errors.

Ensure /api/chat returns { result: "..." } JSON.

Security

Keep your API key server-side only.

Never expose .env or secrets from /public.

Consider adding:

Rate limiting (express-rate-limit)

Input size checks

Basic auth/session if deploying publicly

Deployment

Set environment variables on the host (Render, Railway, Fly.io, etc.).

Start commands:

With preload: node -r dotenv/config server.js

Or rely on host-provided env vars and simply: node server.js

License

MIT — do what you want, no warranty.

Acknowledgements

Express

@google/genai

marked
, DOMPurify
, highlight.js
(optional)
