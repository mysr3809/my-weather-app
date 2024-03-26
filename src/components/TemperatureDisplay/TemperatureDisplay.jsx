import PropTypes from "prop-types";
import "./TemperatureDisplay.css";
const TemperatureDisplay = ({ averageTemperature }) => {
  return (
    <div className="temperature-display">
      <div className="average-temperature">{averageTemperature}°C</div>
    </div>
  );
};

TemperatureDisplay.propTypes = {
  averageTemperature: PropTypes.number.isRequired,
};

export default TemperatureDisplay;
