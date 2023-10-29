import React, { useEffect, useState } from "react";
import axios from "axios";
const Weather = ({ capital, lat, lon }) => {
  const [weather, setWeather] = useState([]);
  const apiKey = import.meta.env.VITE_OPENWEATHERMAP_API_KEY;
  const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
  useEffect(() => {
    axios.get(weatherApiUrl).then((response) => {
      setWeather(response.data);
    });
  }, []);
  if (weather.length === 0) return null;
  return (
    <div>
      <h2>Weather in {capital} </h2>
      <p>temperature {(weather.main.temp - 273.15).toFixed(2)} Celcius</p>
      <img alt="weather icon" src={``} />
      <p>wind {weather.wind.speed} m/s</p>
    </div>
  );
};

export default Weather;
