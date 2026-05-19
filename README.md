# VantageAI Dashboard

An intent-driven sales dashboard built with Generative UI. Users ask natural 
language questions and the application renders live React components in response,
KPI cards, bar charts, and risk tables, with no navigation or pre-built reports.

## Tech Stack

- Next.js 15 (App Router)
- Vercel AI SDK v6
- Groq (Llama 3.3 70B)
- Tailwind CSS
- Recharts

## Getting Started

1. Clone the repo
2. Install dependencies: `npm install`
3. Add your Groq API key to `.env.local`: GROQ_API_KEY=your_key_here
4. Run the dev server: `npm run dev`
5. Open http://localhost:3000

Get a free Groq API key at https://console.groq.com

## What You Can Ask

- "Show me this month's revenue metrics"
- "Show a sales chart for H1 2025"
- "Which of our customers are at risk?"
- "How is our product performance?"

## Article

Built as part of this tutorial: [https://medium.com/vannguardai/beyond-the-chatbot-building-generative-ui-with-vercel-ai-sdk-f8b73cec6e2b]
