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
  const countries = useCountries();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState({
    code: "NL",
    flag: "https://flagcdn.com/w320/nl.png",
  });

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
  };

  return (
    <div className="search-bar">
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
          placeholder="Enter city name..."
        />
        <button type="button" className="search-button">
          <FontAwesomeIcon icon={faSearch} className="search" />
        </button>
      </div>
    </div>
  );
};

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default SearchBar;
