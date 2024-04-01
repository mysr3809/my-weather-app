import { useQuery } from "react-query";
import { WEATHER_API_KEY } from "../../config";

const fetchWeatherData = async ({ queryKey }) => {
  const [, { city, countryCode }] = queryKey;
  const url = `https://api.weatherbit.io/v2.0/forecast/daily?&city=${city}&key=${WEATHER_API_KEY}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    if (data.country_code !== countryCode) {
      throw new Error("Check the country or city name.");
    }
    return data;
  } catch (error) {
    console.error("Failed to fetch weather data:", error.message);
    throw error;
  }
};

export const useWeatherData = (city, countryCode) => {
  return useQuery(["weatherData", { city, countryCode }], fetchWeatherData, {
    enabled: !!city && !!countryCode, // Only fetch data if city and countryCode are provided
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: false, // Do not retry on failure
  });
};
