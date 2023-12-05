import { useEffect, useState } from "react";
import Description from "./components/Description";
import { getFormattedWeatherData } from "./WeatherService";

function App() {
  const [weather, setWeather] = useState("paris");
  const [units, setUnits] = useState("metric");

  useEffect(() => {
    const fetchWeatherData = async () => {
      const data = await getFormattedWeatherData(weather, units);
      setWeather(data);
    };

    fetchWeatherData();
  }, []);
  return (
    <>
      <div className="app">
        <div className="overlay">
          <div className="container">
            <div className="section section__inputs">
              <input type="text" name="city" placeholder="Enter City" />
              <button
                onClick={() => {
                  if (units === "metric") {
                    setUnits("imperial");
                  } else {
                    setUnits("metric");
                  }
                }}
              >
                °{units === "metric" ? "C" : "F"}
              </button>
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
                  {weather.temp?.toFixed()}°{units === "metric" ? "C" : "F"}
                </h1>
              </div>
            </div>
            <Description weather={weather} units={units} />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
