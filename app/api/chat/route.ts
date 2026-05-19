import { createGroq } from "@ai-sdk/groq";
import { streamText, tool } from "ai";
import { z } from "zod";
import { getMetrics, getSalesData, getCustomers, getProducts, getWeather } from "@/lib/db";

const groq = createGroq({ apiKey: process.env.GROQ_API_KEY });

function toModelMessages(messages: any[]) {
  return messages.map((msg) => {
    if (typeof msg.content === "string" || Array.isArray(msg.content)) return msg;
    if (Array.isArray(msg.parts)) {
      const text = msg.parts.filter((p: any) => p.type === "text").map((p: any) => p.text).join("");
      return { role: msg.role, content: text || " " };
    }
    return { role: msg.role, content: " " };
  });
}

export async function POST(req: Request) {
  const body = await req.json();
  const messages = Array.isArray(body.messages) ? body.messages : [];

  const result = streamText({
    model: groq("llama-3.3-70b-versatile"),
    // Inside the streamText call in route.ts
    system: `You are a Senior Sales Strategy Analyst for VantageAI. 
    Your goal is to provide data-driven insights. When a user asks for metrics or customers:
    1. Always call the relevant tool.
    2. If the data shows a negative trend (like high churn or At Risk customers), the 'execute' function will provide an 'insight'. 
    3. You must act as the bridge between raw data and business decisions.`,
    messages: toModelMessages(messages),
    toolChoice: "required",
    tools: {
      showMetrics: tool({
        description: "Show KPI metric cards for revenue, users, and performance.",
        parameters: z.object({}),
        execute: async () => {
          const metrics = getMetrics(["monthly_revenue", "active_users", "churn_rate", "new_signups"]);
          return { component: "metrics", metrics };
        },
      }),
      showSalesChart: tool({
        description: "Show a bar chart of sales revenue over the past 6 months.",
        parameters: z.object({}),
        execute: async () => {
          const data = getSalesData(6);
          return { component: "salesChart", title: "Sales Revenue — H1 2025", data };
        },
      }),
      showCustomers: tool({
        description: "Show customer list with risk analysis.",
        parameters: z.object({}),
        execute: async () => {
          const rows = getCustomers();
          return {
            component: "table",
            title: "Strategic Customer Overview",
            headers: ["Name", "Industry", "Revenue", "Risk Level", "Recommended Action"],
            rows: rows.map((r) => [
              r.name, 
              r.industry, 
              r.revenue, 
              r.risk,
              r.risk === "High" ? "Schedule QBR" : "No Action"
            ]),
          };
        },
      }),
      showProducts: tool({
        description: "Show product performance breakdown in a table.",
        parameters: z.object({}),
        execute: async () => {
          const rows = getProducts();
          return {
            component: "table",
            title: "Product Performance — May 2025",
            headers: ["Product", "Revenue", "Growth", "Users", "Satisfaction"],
            rows: rows.map((r) => Object.values(r)),
          };
        },
      }),
      showWeather: tool({
        description: "Show weather widget for a city. Use this when user mentions any city or weather.",
        parameters: z.object({
          city: z.string(),
        }),
        execute: async ({ city }) => {
          const weather = getWeather(city ?? "Karachi");
          return { component: "weather", ...weather };
        },
      }),
    },
    maxSteps: 5,
  });

  return result.toUIMessageStreamResponse();
}
