/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar/SearchBar";
import TemperatureDisplay from "./components/TemperatureDisplay/TemperatureDisplay";
import WeeklyForecast from "./components/WeeklyForecast/WeeklyForecast";
import { useWeatherData } from "./hooks/useWeatherData";
import setGradient from "./utils/setGradient";
import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AOS from "aos";
import "aos/dist/aos.css";

AOS.init();

const App = () => {
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedCountryCode, setSelectedCountryCode] = useState(null);
  const [background, setBackground] = useState(
    "linear-gradient(to bottom right, #87b5c55e, #87b5c55e)"
  );

  // Fetch weather data for the selected city
  const { data, error, isLoading } = useWeatherData(
    selectedCity,
    selectedCountryCode
  );

  // Display error message if an error occurred
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

  // Update the background only when new weather data is fetched
  useEffect(() => {
    if (data) {
      const averageTemperature =
        data.data.slice(0, 10).reduce((acc, cur) => acc + cur.temp, 0) / 10;
      setBackground(setGradient(Math.round(averageTemperature)));
    }
  }, [data]);

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

  // Set gradient based on temperature
  const dynamicGradient = setGradient(
    Math.round(weatherData.averageTemperature)
  );

  const handleSearch = (city, countryCode) => {
    setSelectedCity(city);
    setSelectedCountryCode(countryCode);
  };

  return (
    <div
      className="App"
      style={{
        background: background,
        transition: "background 0.5s ease-in-out",
      }}
    >
      <ToastContainer />
      <div className="app-container">
        <SearchBar onSearch={handleSearch} />
        {isLoading && <div className="loader" data-testid="app-loader"></div>}
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
