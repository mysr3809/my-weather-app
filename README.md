# Weather App

## Description

The Weather Forecast App is a modern web application designed to provide real-time weather data for cities around the globe. Utilizing the Weatherbit.io API, the app offers daily forecasts, temperature averages, and weather conditions. Its responsive design ensures a seamless user experience across various devices.

## Code Structure

src
│ ├── App.css
│ ├── App.jsx
│ ├── App.test.js
│ ├── assets
│ │ ├── cloudy.png
│ │ └── react.svg
│ ├── components
│ │ ├── SearchBar
│ │ │ ├── SearchBar.css
│ │ │ ├── SearchBar.jsx
│ │ │ └── SearchBar.test.js
│ │ ├── TemperatureDisplay
│ │ │ ├── TemperatureDisplay.css
│ │ │ ├── TemperatureDisplay.jsx
│ │ │ └── TemperatureDisplay.test.js
│ │ └── WeeklyForecast
│ │ ├── WeeklyForecast.css
│ │ └── WeeklyForecast.jsx
│ ├── hooks
│ │ ├── useCountries.jsx
│ │ └── useWeatherData.jsx
│ ├── index.css
│ ├── main.jsx
│ ├── mockData.js
│ └── utils
│ ├── getGradientColors.test.js
│ └── setGradient.jsx

## Features

- City and Country Search: Users can search for weather data by city and country.
- Daily Forecasts: Displays daily weather forecasts including temperature, humidity, and weather conditions.
- Temperature Display: Shows the average temperature for the selected location.
- Dynamic Background: The background gradient changes dynamically based on the current temperature.
- Error Handling: Provides user-friendly error messages for invalid searches or when data is unavailable.

## Requirements

- React 18
- React Query
- A valid API key from Weatherbit.io

To get started, clone this repository and install the project dependencies with `npm install`.

Set up the environment variables:

Create a .env file in the root directory and add the following line `VITE_WEATHER_API_KEY=api_key`

## Run the Project

To run the script and import data from the Excel file use this command `npm run dev`

## Run the Test

To run the tests for the application, use `npm test`
