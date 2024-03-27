import { useState } from "react";
import SearchBar from "./components/SearchBar/SearchBar";
import TemperatureDisplay from "./components/TemperatureDisplay/TemperatureDisplay";
import WeeklyForecast from "./components/WeeklyForecast/WeeklyForecast";
import "./App.css";
import { QueryClient, QueryClientProvider } from "react-query";

const App = () => {
  const queryClient = new QueryClient();

  const [weatherData, setWeatherData] = useState({
    averageTemperature: null,
    dailyForecasts: [],
  });

  const fetchWeatherData = async (city, countryCode) => {
    try {
      const apiKey = "";
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

  const getGradientColors = (temperature) => {
    let startColor = "#a1c4fd";
    let endColor;

    if (temperature <= -30) {
      endColor = "#173070";
    } else if (temperature <= -20) {
      endColor = "#347cbb";
    } else if (temperature <= -10) {
      endColor = "#3a8bc6";
    } else if (temperature <= 0) {
      endColor = "#7ab3d3";
    } else if (temperature <= 10) {
      endColor = "#87b5c5";
    } else if (temperature <= 20) {
      endColor = "#b2b487";
    } else if (temperature <= 30) {
      endColor = "#cc9e62";
    } else if (temperature <= 40) {
      endColor = "##ca7e48";
    }
    return `linear-gradient(to bottom right, ${startColor}, ${endColor})`;
  };

  const dynamicGradient = getGradientColors(
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
