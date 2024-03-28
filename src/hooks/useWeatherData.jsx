import { useQuery } from "react-query";

const fetchWeatherData = async ({ queryKey }) => {
  const [, { city, countryCode }] = queryKey;
  const url = `https://api.weatherbit.io/v2.0/forecast/daily?&city=${city}&key=${
    import.meta.env.VITE_WEATHER_API_KEY
  }`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  if (data.country_code !== countryCode) {
    throw new Error("There is no city with that name or country");
  }
  return data;
};

export const useWeatherData = (city, countryCode) => {
  return useQuery(["weatherData", { city, countryCode }], fetchWeatherData, {
    enabled: !!city && !!countryCode,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
