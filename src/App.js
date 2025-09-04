import React, { useState, useEffect } from 'react';
import './App.css';
import WeatherCard from './components/WeatherCard.js';
import SearchBar from './components/SearchBar.js';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState('London');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_KEY = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key

  useEffect(() => {
    fetchWeather();
  }, [city]);

  const fetchWeather = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();
      
      if (response.ok) {
        setWeatherData(data);
      } else {
        setError('City not found. Please try again.');
      }
    } catch (err) {
      setError('Failed to fetch weather data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (searchCity) => {
    setCity(searchCity);
  };

  return (
    <div className="app">
      <div className="container">
        <h1>Weather Forecast</h1>
        <SearchBar onSearch={handleSearch} />
        
        {loading && <div className="loading">Loading...</div>}
        {error && <div className="error">{error}</div>}
        
        {weatherData && !loading && !error && (
          <WeatherCard weatherData={weatherData} />
        )}
      </div>
    </div>
  );
}

export default App; 