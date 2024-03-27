import "./WeeklyForecast.css";
import PropTypes from "prop-types";

const WeeklyForecast = ({ dailyForecasts }) => {
  return (
    <div className="weekly-forecast">
      {dailyForecasts.map((forecast) => (
        <div key={forecast.day} className="day-forecast">
          <div className="day">{forecast.day}</div>
          <div className="average-temperature">
            <div className="temperature-value">
              {Math.round(forecast.temperature)}
            </div>
            <div className="degree-symbol">°C</div>
          </div>
        </div>
      ))}
    </div>
  );
};

WeeklyForecast.propTypes = {
  dailyForecasts: PropTypes.array.isRequired,
};

export default WeeklyForecast;
