import React from 'react';
import WeatherCard from './WeatherCard.jsx';

const MultipleWeatherCards = ({ weatherDataList }) => {
  return (
    <div className="weather-cards-container">
      {weatherDataList.map((weatherData, index) => (
        <WeatherCard key={`${weatherData.name}-${index}`} weatherData={weatherData} />
      ))}
    </div>
  );
};

export default MultipleWeatherCards; 