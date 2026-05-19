"use client";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

type SalesChartProps = {
  data: { month: string; sales: number }[];
  title: string;
};

export function SalesChart({ data, title }: SalesChartProps) {
  return (
    <div className="bg-gray-800 rounded-2xl p-5 border border-gray-700 shadow-lg">
      <p className="text-gray-300 font-semibold mb-4">{title}</p>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis dataKey="month" stroke="#9ca3af" fontSize={12} />
          <YAxis stroke="#9ca3af" fontSize={12} />
          <Tooltip contentStyle={{ backgroundColor: "#1f2937", border: "none", borderRadius: "8px" }} labelStyle={{ color: "#f9fafb" }} />
          <Bar dataKey="sales" fill="#6366f1" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
