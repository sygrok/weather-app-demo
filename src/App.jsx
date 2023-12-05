import { useEffect, useState } from "react";
import Description from "./components/Description";
import { getFormattedWeatherData } from "./WeatherService";

function App() {
  const [city, setCity] = useState("istanbul");
  const [weather, setWeather] = useState(null);
  const [units, setUnits] = useState("metric");

  useEffect(() => {
    const fetchWeatherData = async () => {
      const data = await getFormattedWeatherData(city, units);
      setWeather(data);
    };

    fetchWeatherData();
  }, [units, city]);

  const handleUnitsClick = (x) => {
    const button = x.currentTarget;
    const currentUnit = button.innerText.slice(1);
    const isC = currentUnit === "C";
    button.innerText = isC ? "°F" : "°C";
    setUnits(isC ? "metric" : "imperial");
  };

  const enterKeyPressed = (x) => {
    if (x.keyCode === 13) {
      setCity(x.currentTarget.value);
      x.currentTarget.blur();
    }
  };

  return (
    <>
      <div className="app">
        <div className="overlay">
          {weather && (
            <div className="container">
              <div className="section section__inputs">
                <input
                  type="text"
                  name="city"
                  placeholder="Enter City"
                  onKeyDown={enterKeyPressed}
                />
                <button onClick={(x) => handleUnitsClick(x)}>°F</button>
              </div>

              <div className="section section__temperature">
                <div className="icon">
                  <h3>
                    {weather.name} {weather.country}
                  </h3>
                  <img src={weather.iconURL} alt="weatherIcon" />
                  <h3>{weather.description}</h3>
                </div>
                <div className="temperature">
                  <h1>
                    {weather.temp.toFixed()}°{units === "metric" ? "C" : "F"}
                  </h1>
                </div>
              </div>
              <Description weather={weather} units={units} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
