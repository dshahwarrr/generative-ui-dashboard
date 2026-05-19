type WeatherWidgetProps = {
  city: string;
  temp: string;
  condition: string;
  humidity: string;
};

export function WeatherWidget({ city, temp, condition, humidity }: WeatherWidgetProps) {
  const emoji =
    condition.toLowerCase().includes("sun") ? "☀️" :
    condition.toLowerCase().includes("cloud") ? "☁️" :
    condition.toLowerCase().includes("rain") ? "🌧️" : "🌤️";

  return (
    <div className="bg-gradient-to-br from-indigo-900 to-blue-800 rounded-2xl p-5 border border-indigo-700 shadow-lg">
      <p className="text-indigo-300 font-medium">{city}</p>
      <div className="flex items-center gap-3 mt-2">
        <span className="text-5xl">{emoji}</span>
        <div>
          <p className="text-4xl font-bold text-white">{temp}</p>
          <p className="text-indigo-200 text-sm">{condition}</p>
        </div>
      </div>
      <p className="text-indigo-300 text-sm mt-3">💧 Humidity: {humidity}</p>
    </div>
  );
}
