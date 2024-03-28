import { useQuery } from "react-query";

const fetchCountries = async () => {
  const response = await fetch("https://restcountries.com/v3.1/all");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return data
    .map((country) => ({
      name: country.name.common,
      code: country.cca2,
      flag: country.flags.png,
    }))
    .sort((a, b) => a.code.localeCompare(b.code));
};

const useCountries = () => {
  return useQuery("countries", fetchCountries, {
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
    retry: false,
  });
};

export default useCountries;
