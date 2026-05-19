"use client";
import { useState } from "react";

type MetricCardProps = {
  title: string;
  value: string;
  change: string;
  positive: boolean;
  insight?: string;
};

export function MetricCard({ title, value, change, positive, insight }: MetricCardProps) {
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [showStrategy, setShowStrategy] = useState(false);

  // Mock recommendations based on the title
  const getRecommendations = () => {
    if (title.includes("Revenue")) return ["Upsell 'VantageAI Pro' to top 10 users", "Launch H2 referral program", "Review enterprise contract renewals"];
    if (title.includes("Users")) return ["Optimize onboarding funnel", "Run re-engagement email campaign", "Analyze EMEA drop-off points"];
    if (title.includes("Churn")) return ["Automate discount for 'At Risk' users", "Conduct exit surveys", "Update billing grace periods"];
    return ["Review data integrity", "Benchmark against competitors", "Identify growth levers"];
  };

  const handleOptimize = () => {
    setIsOptimizing(true);
    // Simulate AI "Thinking"
    setTimeout(() => {
      setIsOptimizing(false);
      setShowStrategy(true);
    }, 1500);
  };

  return (
    <div className={`bg-gray-800 rounded-2xl p-5 border transition-all duration-500 ${showStrategy ? 'border-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.2)]' : 'border-gray-700 shadow-lg'}`}>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-400 text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold mt-1 text-white">{value}</p>
          <p className={`text-sm mt-2 font-medium ${positive ? "text-green-400" : "text-red-400"}`}>
            {positive ? "▲" : "▼"} {change} vs last month
          </p>
        </div>
        {showStrategy && <span className="bg-indigo-500 text-white text-[10px] px-2 py-1 rounded-full uppercase animate-pulse">Strategy Active</span>}
      </div>
      
      {insight && !showStrategy && (
        <div className="mt-4 pt-4 border-t border-gray-700">
          <p className="text-xs text-indigo-300 italic mb-3">AI Insight: {insight}</p>
          <button 
            onClick={handleOptimize}
            disabled={isOptimizing}
            className="w-full text-xs bg-indigo-600 hover:bg-indigo-500 disabled:bg-gray-700 text-white py-2 px-3 rounded-lg transition-all font-medium"
          >
            {isOptimizing ? "🤖 AI Analyzing..." : "Optimize Strategy"}
          </button>
        </div>
      )}

      {showStrategy && (
        <div className="mt-4 pt-4 border-t border-indigo-500/50 animate-in fade-in slide-in-from-top-2">
          <p className="text-xs font-bold text-indigo-300 uppercase mb-2">Recommended Actions:</p>
          <ul className="space-y-2">
            {getRecommendations().map((rec, i) => (
              <li key={i} className="text-[11px] text-gray-300 flex items-center gap-2">
                <span className="w-1 h-1 bg-indigo-400 rounded-full" />
                {rec}
              </li>
            ))}
          </ul>
          <button 
             onClick={() => setShowStrategy(false)}
             className="mt-3 w-full text-[10px] text-gray-500 hover:text-gray-300 underline"
          >
            Reset Analysis
          </button>
        </div>
      )}
    </div>
  );
}