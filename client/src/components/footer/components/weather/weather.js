import { useEffect, useState } from "react";
import styled from "styled-components";

const WeatherContainer = ({ className }) => {
  const WEATHER_URL =
    "http://api.openweathermap.org/data/2.5/weather?q=nizhniy%20novgorod&lang=ru&units=metric&appid=5026c784c208fc4bfd0572ba3d2ab2c2";
  const [weather, setWeather] = useState("");
  const [city, setCity] = useState("");
  const [temp, setTemp] = useState("") || null;
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      fetch(WEATHER_URL)
        .then((res) => {
          if (res.status !== 200) {
            throw new Error("Ошибка загрузки погоды");
          }
          return res.json();
        })
        .then(({ weather, main, name }) => {
          setTemp(Math.round(main?.temp));
          setCity(name);
          setWeather([weather[0].description, weather[0].icon]);
        });
    } catch (e) {
      setError(e);
      return;
    }
  }, [setTemp]);

  return error ? (
    <div>{error}</div>
  ) : (
    <div className={className}>
      <div className="city">{city}</div>
      <div className="weather-info">
        {temp}º {weather[0]}
      </div>
    </div>
  );
};

export const Weather = styled(WeatherContainer)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
