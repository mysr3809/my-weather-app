/* eslint-disable no-unused-vars */
import React from "react";
import PropTypes from "prop-types";
import "./TemperatureDisplay.css";

const TemperatureDisplay = ({ averageTemperature }) => {
  const currentDate = new Date();
  const tenDays = 10 * 24 * 60 * 60 * 1000;
  const endDate = new Date(currentDate.getTime() + tenDays); // Add 10 days to the current date

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
    });
  };

  const dateString = `${formatDate(currentDate)} - ${formatDate(
    endDate
  )} ${currentDate.getFullYear()}`;

  return (
    <div className="temperature-display">
      <span className="date">{dateString.toUpperCase()}</span>
      <div className="average-temperature">
        <span className="temperature-value">
          {Math.round(averageTemperature)}
        </span>
        <span className="degree-symbol">°C</span>
      </div>
    </div>
  );
};

TemperatureDisplay.propTypes = {
  averageTemperature: PropTypes.number.isRequired,
};

export default TemperatureDisplay;
