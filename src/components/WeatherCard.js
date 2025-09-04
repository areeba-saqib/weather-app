import React from 'react';

const WeatherCard = ({ weatherData }) => {
  const {
    main: { temp, humidity, feels_like },
    weather: [weather],
    wind: { speed },
    name,
    sys: { country },
  } = weatherData;

  const getWeatherIcon = (weatherMain) => {
    switch (weatherMain.toLowerCase()) {
      case 'clear':
        return '☀️';
      case 'clouds':
        return '☁️';
      case 'rain':
        return '🌧️';
      case 'snow':
        return '❄️';
      case 'thunderstorm':
        return '⛈️';
      case 'drizzle':
        return '🌦️';
      case 'mist':
      case 'fog':
        return '🌫️';
      default:
        return '🌈';
    }
  };

  return (
    <div className="weather-card">
      <div className="weather-header">
        <h2>{name}, {country}</h2>
        <div className="weather-icon">
          {getWeatherIcon(weather.main)}
        </div>
      </div>
      
      <div className="weather-main">
        <div className="temperature">
          <span className="temp-value">{Math.round(temp)}°C</span>
          <span className="feels-like">Feels like: {Math.round(feels_like)}°C</span>
        </div>
        <div className="weather-description">
          {weather.description.charAt(0).toUpperCase() + weather.description.slice(1)}
        </div>
      </div>

      <div className="weather-details">
        <div className="detail-item">
          <span className="detail-label">Humidity</span>
          <span className="detail-value">{humidity}%</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Wind Speed</span>
          <span className="detail-value">{speed} m/s</span>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard; 