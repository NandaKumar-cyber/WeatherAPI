import React, { useState } from 'react'
import './App.css'

function App() {

  const apiKey = process.env.REACT_APP_WEATHER_API_KEY
  const [weatherData, setWeatherData] = useState([{}])
  const [city, setCity] = useState("")

  const getWeather = (event) => {
    if (event.key === "Enter") {
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&APPID=${apiKey}`).then(
        response => response.json()
      ).then(
        data => {
          setWeatherData(data)
          setCity("")
        }
      )
    }
  }

  return (
    <div className='container'>
      <input
        className='input'
        placeholder='Enter city name'
        onChange={e => setCity(e.target.value)}
        value={city}
        onKeyDown={getWeather} />

      {typeof weatherData.main === 'undefined' ? (
        <div>
          <p className='search'>Search for City name</p>
        </div>
      ) : (
        <div className='weather-data'>
          <p className='cityname'>{weatherData.name}</p>
          <p className='temp'>{Math.round(weatherData.main.temp)}°F</p>
          <p className='weatherData'>{weatherData.weather[0].description}</p>
        </div>
      )}

      {weatherData.cod === "404" ?(
        <p>City not Found</p>
      ):(
        <></>
      )}
    </div>
  )
}

export default App
