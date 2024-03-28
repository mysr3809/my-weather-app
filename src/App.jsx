import { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar/SearchBar";
import TemperatureDisplay from "./components/TemperatureDisplay/TemperatureDisplay";
import WeeklyForecast from "./components/WeeklyForecast/WeeklyForecast";
import { useWeatherData } from "./hooks/useWeatherData";
import setGradient from "./utils/setGradient";
import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedCountryCode, setSelectedCountryCode] = useState(null);

  const { data, error, isLoading } = useWeatherData(
    selectedCity,
    selectedCountryCode
  );

  useEffect(() => {
    if (error) {
      toast.error(`Error: Check the country or city name.`, {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  }, [error]);

  // Extract the weather data or set defaults if data is loading or an error occurred
  const weatherData = data
    ? {
        averageTemperature:
          data.data.slice(0, 10).reduce((acc, cur) => acc + cur.temp, 0) / 10,
        dailyForecasts: data.data.slice(0, 7).map((forecast) => ({
          day: new Date(forecast.valid_date).toLocaleDateString("en-US", {
            weekday: "long",
          }),
          temperature: forecast.temp,
        })),
      }
    : { averageTemperature: null, dailyForecasts: [] };

  const dynamicGradient = setGradient(
    Math.round(weatherData.averageTemperature)
  );

  const handleSearch = (city, countryCode) => {
    setSelectedCity(city);
    setSelectedCountryCode(countryCode);
  };

  return (
    <div className="App" style={{ background: dynamicGradient }}>
      <ToastContainer />
      <div className="app-container">
        <SearchBar onSearch={handleSearch} />
        {isLoading && <div className="loader"></div>}
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
