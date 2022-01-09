import React, { useState } from "react";
import Axios from "axios";
import GoogleMaps from "./components/map";

function App() {
  const [map, setMap] = useState(false);
  const [city, setCity] = useState("");

  const [weatherData, setWeatherData] = useState({
    description: "",
    center: {
      lat: 0,
      lng: 0,
    },
    temp: 0,
    temp_min: 0,
    temp_max: 0,
    humidity: 0,
    sunrise: 0,
    sunset: 0,
    country: "",
  });

  const searchWeather = () => {
    setMap(false);
    Axios.get(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=df7342994e55aa49a5d0268241b039b7&lang=sp`
    ).then((response) => {
      setWeatherData({
        description: response.data.weather[0].description,
        center: { lat: response.data.coord.lat, lng: response.data.coord.lon },
        temp: response.data.main.temp,
        temp_min: response.data.main.temp_min,
        temp_max: response.data.main.temp_max,
        humidity: response.data.main.humidity,
        sunrise: response.data.sys.sunrise,
        sunset: response.data.sys.sunset,
        country: response.data.sys.country,
      });
    });
    setTimeout(() => {
      setMap(true);
    }, 1500);
  };

  return (
    <div className="App">
      <h1>Current Weather</h1>
      <div className="inputs">
        <input
          type="text"
          onChange={(e) => {
            setCity(e.target.value);
          }}
        ></input>
        <button onClick={searchWeather}>Search</button>
      </div>
      <div className="displayData">
        <h3>Descripcion: {weatherData.description}</h3>
        <h3>Temperatura {weatherData.temp.toFixed(1)}</h3>
        <h3>Minima: {weatherData.temp_min.toFixed(1)}</h3>
        <h3>Maxima: {weatherData.temp_max.toFixed(1)}</h3>
        <h3>Humedad: {weatherData.humidity}%</h3>
        <h3>Amanecer: {weatherData.sunrise}</h3>
        <h3>Atardecer: {weatherData.sunset}</h3>
        <h3>Pais: {weatherData.country}</h3>
        <h3>Lat: {weatherData.center.lat}</h3>
        <h3>Lon: {weatherData.center.lng}</h3>
      </div>
      {map == false ? (
        <></>
      ) : (
        <GoogleMaps
          center={weatherData.center}
          lat={weatherData.center.lat}
          lng={weatherData.center.lng}
        ></GoogleMaps>
      )}
    </div>
  );
}

export default App;
