import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Generative UI Dashboard",
  description: "AI-powered dashboard using Vercel AI SDK + Groq",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-950 text-white min-h-screen">{children}</body>
    </html>
  );
}