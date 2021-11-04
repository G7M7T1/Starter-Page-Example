import { useState, useEffect } from "react";
import axios from "axios";
require("dotenv").config();

function IpGet() {
  const [countryName, setCountryName] = useState("");
  const [cityName, setCityName] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [countryStateName, setCountryStateName] = useState("");
  const [cityTemp, setCityTemp] = useState("");
  const [cityFeelLike, setCityFeelLike] = useState("");

  const weatherKey = process.env.REACT_APP_WEATHERKEY;

  const getData = async () => {
    const res = await axios.get("https://geolocation-db.com/json/");
    setCountryName(res.data.country_name);
    setCityName(res.data.city);
    setCountryCode(res.data.country_code);
    setCountryStateName(res.data.state);
  };

  const getWeather = async () => {
    if (!cityName || !countryStateName || !weatherKey) return;
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName},${countryStateName}&appid=${weatherKey}`;
    const weatherData = await axios.get(weatherUrl);

    console.log(weatherData.data);

    setCityTemp(Math.ceil(weatherData.data.main.temp - 273.15));
    setCityFeelLike(Math.ceil(weatherData.data.main.feels_like - 273.15));
  };

  useEffect(() => {
    getData();
  });

  useEffect(() => {
    getWeather();
  }, [cityName, countryStateName]);

  return (
    <div className="IpGet">
      <h4>{countryName}</h4>
      <h4>{countryCode}</h4>
      <h4>{countryStateName}</h4>
      <h4>{cityName}</h4>
      <h4>{cityTemp}°C</h4>
      <h4>{cityFeelLike}°C</h4>
    </div>
  );
}

export default IpGet;
