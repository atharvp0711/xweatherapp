import React, { useState } from "react";
import WeatherCard from "./Components/WeatherCard";
import "./App.css";

const App = () => {
  const API_KEY = "2b88f2830d3647da8ac135549250401";

  const [cityName, setCityName] = useState("");
  const [weatherInfo, setWeatherInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchWeatherData = async () => {
    if (cityName === "") {
      alert("Please enter city name");
      return;
    } else {
      setLoading(true);
      setWeatherInfo(null);
      try {
        const response = await fetch(
          `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${cityName}`
        );
        if (!response.ok) {
          throw new Error("City not found");
        } else {
          const data = await response.json();
          setWeatherInfo(data);
        }
      } catch (error) {
        alert("Failed to fetch wather data");
      } finally {
        setLoading(false);
      }
    }
  };
  return (
    <div>
      <div
        className="inputFields"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "35px",
        }}
      >
        <div>
          <input
            type="text"
            placeholder="Enter city name"
            value={cityName}
            onChange={(e) => setCityName(e.target.value)}
            autoFocus
            required
            style={{ marginRight: "5px", padding: "5px" }}
          />
        </div>
        <div>
          <button
            cursor="pointer"
            onClick={fetchWeatherData}
            style={{
              color: "white",
              backgroundColor: "green",
              padding: "5px",
            }}
          >
            Search
          </button>
        </div>
      </div>
      {loading && <p> Loading data... </p>}
      {weatherInfo && (
        <div
          className="weather-cards"
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <WeatherCard
            title="Temperature"
            value={weatherInfo.current.temp_c}
            unit="°C"
          />
          <WeatherCard
            title="Humidity"
            value={weatherInfo.current.humidity}
            unit="%"
          />
          <WeatherCard
            title="Condition"
            value={weatherInfo.current.condition.text}
            // unit="°C"
            icon={weatherInfo.current.condition.icon}
          />
          <WeatherCard
            title="Wind Speed"
            value={weatherInfo.current.wind_kph}
            unit="kph"
          />
        </div>
      )}
    </div>
  );
};

export default App;
