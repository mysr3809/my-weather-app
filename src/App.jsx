import { useState } from "react";
import SearchBar from "./components/SearchBar/SearchBar";
import TemperatureDisplay from "./components/TemperatureDisplay/TemperatureDisplay";
import WeeklyForecast from "./components/WeeklyForecast/WeeklyForecast";
import "./App.css";
import { City } from "country-state-city";

const App = () => {
  // Updated state to hold real weather data
  const [weatherData, setWeatherData] = useState({
    averageTemperature: null,
    dailyForecasts: [],
  });

  const fetchWeatherData = async (city, countryCode) => {
    const cityList = City.getCitiesOfCountry(countryCode);
    const capitalize = (city) =>
      (city && city[0].toUpperCase() + city.slice(1)) || "";

    if (!cityList.find((c) => c.name === capitalize(city))) {
      console.error("City not found.");
      setWeatherData({ averageTemperature: null, dailyForecasts: [] });
    } else {
      try {
        const apiKey = "8df9669ef0604996b6939d497c1862a9"; // Use environment variable here instead
        const url = `https://api.weatherbit.io/v2.0/forecast/daily?&country=${countryCode}&city=${city}&key=${apiKey}`;
        const response = await fetch(url);
        const data = await response.json();

        if (data && data.data) {
          // Assuming 'data.data' contains the forecast data
          const forecasts = data.data.slice(0, 7); // Get the first 7 days for the weekly forecast
          const averageTemperature =
            forecasts.reduce((acc, cur) => acc + cur.temp, 0) /
            forecasts.length;

          setWeatherData({
            averageTemperature: averageTemperature.toFixed(1), // Adjust as needed
            dailyForecasts: forecasts.map((forecast) => ({
              day: new Date(forecast.valid_date).toLocaleDateString("en-US", {
                weekday: "long",
              }), // Adjust locale as needed
              temperature: forecast.temp,
            })),
          });
        }
      } catch (error) {
        console.error("Error fetching weather data:", error);
        setWeatherData({ averageTemperature: null, dailyForecasts: [] });
      }
    }
  };

  return (
    <div className="App">
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
  );
};

export default App;
