// lib/db.ts
// This simulates a real database. In production, replace these functions
// with actual DB queries (e.g. Supabase, Prisma, PostgreSQL).

export const db = {
  metrics: {
    monthly_revenue: { title: "Monthly Revenue", value: "$54,219", change: "12%", positive: true, insight: "Revenue is up, but expansion from existing accounts slowed by 3%." },
    active_users: { title: "Active Users", value: "3,842", change: "8%", positive: true, insight: "Highest growth seen in the EMEA region." },
    churn_rate: { title: "Churn Rate", value: "2.4%", change: "0.3%", positive: false, insight: "Churn spiked in 'VantageAI Lite' tier users after the last billing update." },
  },

  sales: [
    { month: "January 2025", sales: 38000 },
    { month: "February 2025", sales: 45000 },
    { month: "March 2025", sales: 46500 },
    { month: "April 2025", sales: 51200 },
    { month: "May 2025", sales: 54219 },
    { month: "June 2025", sales: 59800 },
    { month: "Q3 2024", sales: 41000 },
    { month: "Q4 2024", sales: 49500 },
  ],

  customers: [
    { name: "Acme Inc.", industry: "Tech", revenue: "$120k", status: "Active", risk: "Low" },
    { name: "Global Corp", industry: "Finance", revenue: "$90k", status: "At Risk", risk: "High" },
    { name: "SaaS Labs", industry: "Tech", revenue: "$45k", status: "Active", risk: "Medium" },
  ],

  products: [
    { "Product": "VantageAI Enterprise", "Revenue": "$300,000", "Growth": "20%", "Users": "320", "Satisfaction": "95%" },
    { "Product": "VantageAI Pro", "Revenue": "$200,000", "Growth": "15%", "Users": "890", "Satisfaction": "90%" },
    { "Product": "VantageAI Lite", "Revenue": "$150,000", "Growth": "10%", "Users": "1,240", "Satisfaction": "85%" },
    { "Product": "VantageAI Premium", "Revenue": "$100,000", "Growth": "5%", "Users": "210", "Satisfaction": "80%" },
    { "Product": "VantageAI Basic", "Revenue": "$50,000", "Growth": "0%", "Users": "380", "Satisfaction": "75%" },
  ],

  weather: {
    karachi: { city: "Karachi", temp: "32°C", condition: "Partly Cloudy", humidity: "60%" },
    london: { city: "London", temp: "14°C", condition: "Rainy", humidity: "82%" },
    dubai: { city: "Dubai", temp: "41°C", condition: "Sunny", humidity: "45%" },
    newyork: { city: "New York", temp: "22°C", condition: "Sunny", humidity: "55%" },
    singapore: { city: "Singapore", temp: "30°C", condition: "Cloudy", humidity: "78%" },
    tokyo: { city: "Tokyo", temp: "18°C", condition: "Cloudy", humidity: "70%" },
  },
};

// --- Query functions (replace with real DB calls in production) ---

export function getMetrics(keys: string[]) {
  return keys.map(k => db.metrics[k as keyof typeof db.metrics]).filter(Boolean);
}

export function getSalesData(months?: number) {
  return db.sales.slice(0, months ?? db.sales.length);
}

export function getCustomers() {
  return db.customers;
}

export function getProducts() {
  return db.products;
}

export function getWeather(city: string) {
  const key = city.toLowerCase().replace(/\s/g, "");
  return db.weather[key as keyof typeof db.weather] ?? {
    city,
    temp: "28°C",
    condition: "Sunny",
    humidity: "55%",
  };
}
