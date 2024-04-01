import { useQuery } from "react-query";

const fetchCountries = async () => {
  try {
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
      .sort((a, b) => a.code.localeCompare(b.code)); // sort by country code
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const useCountries = () => {
  return useQuery("countries", fetchCountries, {
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
    retry: false, // Do not retry on failure
  });
};

export default useCountries;
