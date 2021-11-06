import { useState, useEffect } from "react";
import axios from "axios";
require("dotenv").config();

function IpGet() {
  const [cityName, setCityName] = useState("");
  const [countryStateName, setCountryStateName] = useState("");
  const [cityTemp, setCityTemp] = useState("");
  const [iconCode, setIconCode] = useState("");
  const [currentHour, setCurrentHour] = useState("");
  const [currentMinute, setCurrentMinute] = useState("");
  const [currentSecond, setCurrentSecond] = useState("");

  const weatherKey = process.env.REACT_APP_WEATHERKEY;

  const getData = async () => {
    const res = await axios.get("https://geolocation-db.com/json/");
    setCityName(res.data.city);
    setCountryStateName(res.data.state);
  };

  function ChckeTime() {
    const currentTime = new Date();
    if (currentTime.getSeconds() < 10) {
      setCurrentSecond("0" + currentTime.getSeconds());
    } else {
      setCurrentSecond(currentTime.getSeconds());
    }
    if (currentTime.getMinutes() < 10) {
      setCurrentMinute("0" + currentTime.getMinutes());
    } else {
      setCurrentMinute(currentTime.getMinutes());
    }
    setCurrentHour(currentTime.getHours());
  }
  setInterval(ChckeTime, 1000);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getWeather = async () => {
    if (!cityName || !countryStateName || !weatherKey) return;
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName},${countryStateName}&appid=${weatherKey}`;
    const weatherData = await axios.get(weatherUrl);
    setIconCode(weatherData.data.weather[0].icon);
    setCityTemp(Math.ceil(weatherData.data.main.temp - 273.15));
  };

  useEffect(() => {
    getData();
  });

  useEffect(() => {
    getWeather();
  }, [cityName, countryStateName, getWeather]);

  return (
    <div className="IpGet">
      <div className="TopBar">
        <div className="Weatherbar">
          <img
            src={`http://openweathermap.org/img/wn/${iconCode}@2x.png`}
            alt="Weather"
          />
          <h1>
            {cityTemp}
            <span> °C</span>
          </h1>
        </div>

        <div className="CityBar">
          <h4>
            {cityName}, {countryStateName}
          </h4>
        </div>
      </div>
      <div className="TimeBar">
        <h1>
          {currentHour}:{currentMinute}:{currentSecond}
        </h1>
      </div>
    </div>
  );
}

export default IpGet;
