/* eslint-disable no-unused-vars */
import React from "react";
import { useState } from "react";
import PropTypes from "prop-types";
import useCountries from "../../hooks/useCountries";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import "./SearchBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import cloudyImg from "../../assets/cloudy.png";

const SearchBar = ({ onSearch }) => {
  const { data: countries, error, isLoading } = useCountries(); //fetch countries from API
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState({
    // default country to Netherlands
    code: "NL",
    flag: "https://flagcdn.com/w320/nl.png",
  });
  const [city, setCity] = useState("");
  if (isLoading) return <div className="loader" data-testid="loader"></div>; //show loader spinner
  if (error)
    return (
      <div className="country-error">
        An error occurred: {error.message} for the countries
      </div>
    );

  const toggle = () => setDropdownOpen((prevState) => !prevState); // toggle dropdown

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    setCity("");
    onSearch("", country.code);
  };

  const handleSubmit = (event) => {
    // handle form submit search by city
    event.preventDefault();
    onSearch(city, selectedCountry.code);
  };

  return (
    <form onSubmit={handleSubmit} className="search-bar">
      <img className="cloudy-img" src={cloudyImg} alt="" />
      <Dropdown isOpen={dropdownOpen} toggle={toggle}>
        <DropdownToggle caret>
          <img
            src={selectedCountry.flag}
            alt={selectedCountry.name}
            style={{ width: "20px", height: "auto", marginRight: "10px" }}
          />
          {selectedCountry.code}
        </DropdownToggle>
        <DropdownMenu>
          {countries.map((country) => (
            <DropdownItem
              key={country.code}
              onClick={() => handleCountrySelect(country)}
            >
              <img
                src={country.flag}
                alt={`${country.name} flag`}
                style={{ width: "20px", marginRight: "10px" }}
              />
              {country.code}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
      <div className="input-container">
        <input
          className="search-input"
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name..."
        />
        <button
          type="submit"
          className="search-button"
          data-testid="search-button"
        >
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>
    </form>
  );
};

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default SearchBar;
