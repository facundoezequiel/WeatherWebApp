import React, { useState } from "react";
import Axios from "axios";
import GoogleMapReact from "google-map-react";

function App() {
  const [city, setCity] = useState("");

  const [weatherData, setWeatherData] = useState({
    description: "",
    lon: 0,
    lat: 0,
    temp: 0,
    temp_min: 0,
    temp_max: 0,
    humidity: 0,
    sunrise: 0,
    sunset: 0,
    country: "",
  });

  const searchWeather = () => {
    Axios.get(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=df7342994e55aa49a5d0268241b039b7&lang=sp`
    ).then((response) => {
      setWeatherData({
        description: response.data.weather[0].description,
        lon: response.data.coord.lon,
        lat: response.data.coord.lat,
        temp: response.data.main.temp,
        temp_min: response.data.main.temp_min,
        temp_max: response.data.main.temp_max,
        humidity: response.data.main.humidity,
        sunrise: response.data.sys.sunrise,
        sunset: response.data.sys.sunset,
        country: response.data.sys.country,
      });
    });
  };

  const defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33,
    },
    zoom: 11,
  };

  const AnyReactComponent = ({ text }) => <div>{text}</div>;

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
        <h3>Lat: {weatherData.lat}</h3>
      </div>
      <div style={{ height: "400px", width: "100%" }}>
        <GoogleMapReact
          defaultCenter={defaultProps.center}
          defaultZoom={defaultProps.zoom}
          bootstrapURLKeys={{ key: "AIzaSyAuALk7UhI_Kdfe1FbGk-QnBCZEzeOy_1o" }}
        >
          <AnyReactComponent
            lat={weatherData.lat}
            lng={weatherData.lon}
            text="My Marker"
          />
        </GoogleMapReact>
      </div>
    </div>
  );
}

export default App;
