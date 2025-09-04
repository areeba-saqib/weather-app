import React, { useState, useEffect } from 'react';
import './App.css';
import WeatherCard from './components/WeatherCard.jsx';
import SearchBar from './components/SearchBar.jsx';
import MultipleWeatherCards from './components/MultipleWeatherCards.jsx';

function App() {
  const [weatherDataList, setWeatherDataList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_KEY = 'a3f1ce9df7342e1c3f02c72bc7c5afbf'; // User's real OpenWeatherMap API key

  const fetchWeather = async (city) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();
      
      if (response.ok) {
        return data;
      } else {
        throw new Error(`Failed to fetch weather for ${city}`);
      }
    } catch (err) {
      console.error(`Error fetching weather for ${city}:`, err);
      return null;
    }
  };

  const handleSearch = async (searchCity) => {
    setLoading(true);
    setError(null);
    
    try {
      const newWeatherData = await fetchWeather(searchCity);
      if (newWeatherData) {
        setWeatherDataList([newWeatherData]);
      } else {
        setError('City not found. Please try again.');
      }
    } catch (err) {
      setError('Failed to fetch weather data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const removeCity = (cityName) => {
    setWeatherDataList(prevList => 
      prevList.filter(data => data.name !== cityName)
    );
  };

  return (
    <div className="app">
      <div className="container">
        <h1>Global Weather Forecast</h1>
        <SearchBar onSearch={handleSearch} />
        
        {loading && <div className="loading">Loading...</div>}
        {error && <div className="error">{error}</div>}
        
        {weatherDataList.length > 0 && !loading && !error && (
          <MultipleWeatherCards 
            weatherDataList={weatherDataList} 
            onRemoveCity={removeCity}
          />
        )}
      </div>
    </div>
  );
}

export default App; 