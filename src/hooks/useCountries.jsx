import { useState, useEffect } from "react";

const useCountries = () => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data = await response.json();
        const formattedCountries = data
          .map((country) => ({
            name: country.name.common,
            code: country.cca2,
            flag: country.flags.png,
          }))
          .sort((a, b) => a.code.localeCompare(b.code));
        setCountries(formattedCountries);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  return countries;
};

export default useCountries;
