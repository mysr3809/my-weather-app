import { useState } from "react";
import SearchBar from "./components/SearchBar/SearchBar";
import TemperatureDisplay from "./components/TemperatureDisplay/TemperatureDisplay";
import WeeklyForecast from "./components/WeeklyForecast/WeeklyForecast";
import "./App.css";
import { QueryClient, QueryClientProvider } from "react-query";
import setGradient from "./utils/setGradient";
const App = () => {
  const queryClient = new QueryClient();

  const [weatherData, setWeatherData] = useState({
    averageTemperature: null,
    dailyForecasts: [],
  });

  const fetchWeatherData = async (city, countryCode) => {
    try {
      const apiKey = "8df9669ef0604996b6939d497c1862a9";
      const url = `https://api.weatherbit.io/v2.0/forecast/daily?&city=${city}&key=${apiKey}`;
      const response = await fetch(url);
      const data = await response.json();
      if (data.country_code !== countryCode) {
        throw new Error("There is no city with that name or country");
      }

      if (data && data.data) {
        const forecasts = data.data.slice(0, 7);
        const averageTemperatureDays = data.data.slice(0, 10);
        const averageTemperature =
          averageTemperatureDays.reduce((acc, cur) => acc + cur.temp, 0) /
          averageTemperatureDays.length;

        setWeatherData({
          averageTemperature: averageTemperature,
          dailyForecasts: forecasts.map((forecast) => ({
            day: new Date(forecast.valid_date).toLocaleDateString("en-US", {
              weekday: "long",
            }),
            temperature: forecast.temp,
          })),
        });
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setWeatherData({ averageTemperature: null, dailyForecasts: [] });
    }
  };

  const dynamicGradient = setGradient(
    parseFloat(weatherData.averageTemperature)
  );

  return (
    <QueryClientProvider client={queryClient}>
      <div className="App" style={{ background: dynamicGradient }}>
        <div className="app-container">
          <SearchBar onSearch={fetchWeatherData} />
          {weatherData.averageTemperature && (
            <TemperatureDisplay
              averageTemperature={weatherData.averageTemperature}
            />
          )}
          {weatherData.dailyForecasts.length > 0 && (
            <WeeklyForecast dailyForecasts={weatherData.dailyForecasts} />
          )}
        </div>
      </div>
    </QueryClientProvider>
  );
};

export default App;
