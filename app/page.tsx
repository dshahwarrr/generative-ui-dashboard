"use client";
import { useChat } from "@ai-sdk/react";
import { useState } from "react";
import { MetricCard } from "@/components/MetricCard";
import { SalesChart } from "@/components/SalesChart";
import { DataTable } from "@/components/DataTable";
import { WeatherWidget } from "@/components/WeatherWidget";

function LoadingSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="grid grid-cols-2 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-gray-800 rounded-2xl p-5 h-28 border border-gray-700" />
        ))}
      </div>
    </div>
  );
}

function ErrorCard({ message }: { message: string }) {
  return (
    <div className="bg-red-950/40 border border-red-800 rounded-2xl px-4 py-3 text-red-300 text-sm max-w-md">
      ⚠️ {message}
    </div>
  );
}

function renderToolResult(toolName: string, result: any) {
  if (!result) return <ErrorCard message="No data returned. Please try again." />;

  if (result.component === "metrics") {
    if (!result.metrics?.length) return <ErrorCard message="No metrics found." />;
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {result.metrics.map((m: any, i: number) => (
          <MetricCard key={i} {...m} />
        ))}
      </div>
    );
  }

  if (result.component === "salesChart") {
    if (!result.data?.length) return <ErrorCard message="No sales data found." />;
    return <SalesChart title={result.title} data={result.data} />;
  }

  if (result.component === "table") {
    if (!result.rows?.length) return <ErrorCard message="No data found." />;
    return <DataTable title={result.title} headers={result.headers} rows={result.rows} />;
  }

  if (result.component === "weather") {
    return <div className="max-w-xs"><WeatherWidget city={result.city} temp={result.temp} condition={result.condition} humidity={result.humidity} /></div>;
  }

  return null;
}

const SUGGESTIONS = [
  "Show me this month's revenue metrics",
  "Show a sales chart for H1 2025",
  "Show me our top customers",
  "How is our product performance?",
];

export default function Home() {
  const { messages, sendMessage, status } = useChat();
  const [input, setInput] = useState("");
  const isLoading = status === "streaming" || status === "submitted";

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;
    sendMessage({ text: input });
    setInput("");
  }

  function handleSuggestion(text: string) {
    sendMessage({ text });
  }

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col">
      {/* Header */}
      <div className="border-b border-gray-800 px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white">⚡VantageAI Dashboard</h1>
          <p className="text-gray-400 text-sm">Ask anything about your business data</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-green-400 text-xs font-medium">AI Online</span>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6 max-w-4xl mx-auto w-full">
        {messages.length === 0 && (
          <div className="mt-16 text-center">
            <p className="text-4xl mb-3">📊</p>
            <h2 className="text-white font-semibold text-lg mb-1">Your AI-Powered Dashboard</h2>
            <p className="text-gray-400 text-sm mb-8">Ask a question and watch the UI generate itself.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl mx-auto">
              {SUGGESTIONS.map((s) => (
                <button key={s} onClick={() => handleSuggestion(s)}
                  className="text-left bg-gray-800 hover:bg-gray-700 border border-gray-700 hover:border-indigo-500 text-gray-300 text-sm px-4 py-3 rounded-xl transition-all">
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((message, idx) => {
          const isLastMessage = idx === messages.length - 1;

          if (message.role === "user") {
            const text = message.parts?.find((p: any) => p.type === "text")?.text ?? "";
            return (
              <div key={message.id} className="flex justify-end">
                <div className="bg-indigo-600 text-white px-4 py-2 rounded-2xl rounded-tr-sm max-w-md text-sm">{text}</div>
              </div>
            );
          }

          if (message.role === "assistant") {
            console.log("ASSISTANT PARTS:", JSON.stringify(message.parts));
            if (isLoading && isLastMessage) return <div key={message.id}><LoadingSkeleton /></div>;

            // Find tool result parts
            const toolParts = message.parts?.filter((p: any) =>
              p.type?.startsWith("tool-") && p.state === "output-available"
            ) ?? [];

            if (toolParts.length === 0) {
              // Fallback: plain text response
              const text = message.parts?.find((p: any) => p.type === "text")?.text ?? "";
              if (!text) return null;
              return (
                <div key={message.id} className="flex justify-start">
                  <div className="bg-gray-800 text-gray-200 px-4 py-3 rounded-2xl rounded-tl-sm max-w-md text-sm">{text}</div>
                </div>
              );
            }

            return (
              <div key={message.id} className="space-y-4">
                {toolParts.map((part: any, i: number) => {
                  const toolName = part.type?.replace("tool-", "");
                  return <div key={i}>{renderToolResult(toolName, part.output)}</div>;
                })}
              </div>
            );
          }

          return null;
        })}

        {isLoading && messages[messages.length - 1]?.role === "user" && <LoadingSkeleton />}
      </div>

      {/* Input */}
      <div className="border-t border-gray-800 px-6 py-4">
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto flex gap-3">
          <input value={input} onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about your sales, customers, metrics..."
            className="flex-1 bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-indigo-500 transition-colors" />
          <button type="submit" disabled={isLoading || !input.trim()}
            className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white px-5 py-3 rounded-xl text-sm font-medium transition-colors">
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
