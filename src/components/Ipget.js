import { useState, useEffect } from "react";
import axios from "axios";
require("dotenv").config();

function IpGet() {
  // IP in state
  const [ip, setIP] = useState("");
  const [countryName, setcountryName] = useState("");
  const [cityName, setcityName] = useState("");
  const [countryCode, setcountryCode] = useState("");
  const [countryStateName, setcountryStateName] = useState("");

  const WeatherKey = process.env.REACT_APP_WEATHERKEY;

  const getData = async () => {
    const res = await axios.get("https://geolocation-db.com/json/");
    setIP(res.data.IPv4);
    setcountryName(res.data.country_name);
    setcityName(res.data.city);
    setcountryCode(res.data.country_code);
    setcountryStateName(res.data.state);
    const getWeather = async () => {
      const WeatherUrl = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName},${countryStateName}&appid=${WeatherKey}`
      );
      console.log(WeatherUrl);
    };
    getWeather();
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="IpGet">
      <h4>{ip}</h4>
      <h4>{countryName}</h4>
      <h4>{countryCode}</h4>
      <h4>{countryStateName}</h4>
      <h4>{cityName}</h4>
    </div>
  );
}

export default IpGet;
