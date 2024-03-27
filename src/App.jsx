import SearchBar from "./components/SearchBar/SearchBar";
import TemperatureDisplay from "./components/TemperatureDisplay/TemperatureDisplay";
import WeeklyForecast from "./components/WeeklyForecast/WeeklyForecast";
import mockForecastData from "./mockData";
import "./App.css";

const App = () => {
  const { averageTemperature, dailyForecasts } = mockForecastData;

  const handleSearch = (event) => {
    event.preventDefault();
  };

  return (
    <div className="App">
      <div className="app-container">
        <SearchBar onSearch={handleSearch} />
        {/* <TemperatureDisplay averageTemperature={averageTemperature} />
      <WeeklyForecast dailyForecasts={dailyForecasts} /> */}
      </div>
    </div>
  );
};

export default App;
