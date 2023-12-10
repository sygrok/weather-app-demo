import { useEffect, useState } from "react";
import Description from "./components/Description";
import { getFormattedWeatherData } from "./WeatherService";
import { FaSearch } from "react-icons/fa";
import gif from "./assets/loading.gif";

function App() {
  const [city, setCity] = useState("istanbul");
  const [weather, setWeather] = useState(null);
  const [units, setUnits] = useState("metric");
  const [cityInput, setCityInput] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const fetchWeatherData = async () => {
      const data = await getFormattedWeatherData(city, units);
      setWeather(data);
      setLoading(false);
    };

    fetchWeatherData();
  }, [city, units]);

  const handleUnitsClick = (x) => {
    const button = x.currentTarget;
    const currentUnit = button.innerText.slice(1);
    const isC = currentUnit === "C";
    button.innerText = isC ? "°F" : "°C";
    setUnits(isC ? "metric" : "imperial");
  };

  const searchHandler = (x) => {
    x.preventDefault();

    if (!cityInput || cityInput.trim() === "") {
      setCity("istanbul");
    } else if (cityInput !== weather.name) {
      alert("City not found?");
    } else {
      setCity(cityInput);
    }
  };

  const getSeasonFromTimestamp = (unixTimestamp) => {
    const date = new Date(unixTimestamp * 1000);
    const month = date.getMonth() + 1;

    if (month >= 3 && month <= 5) {
      return "spring";
    } else if (month >= 6 && month <= 8) {
      return "summer";
    } else if (month >= 9 && month <= 11) {
      return "autumn";
    } else {
      return "winter";
    }
  };

  return (
    <>
      <div className={`app ${getSeasonFromTimestamp(weather?.dt)}`}>
        <div className="overlay">
          {loading && (
            <div className="loading">
              <img src={gif} />
            </div>
          )}

          {weather && !loading && (
            <div className="container">
              <div className="section section__inputs">
                {/* input */}
                <div className="input-div">
                  <input
                    type="text"
                    name="city"
                    placeholder="Enter City"
                    value={cityInput}
                    onChange={(x) => setCityInput(x.target.value)}
                  />
                  <button
                    className="input__button"
                    onClick={searchHandler}
                    type="submit"
                  >
                    <FaSearch />
                  </button>
                </div>
                <button
                  className="metric__button"
                  onClick={(x) => handleUnitsClick(x)}
                >
                  °F
                </button>
              </div>

              <div className="section section__temperature">
                <div className="icon">
                  <h3>
                    {weather?.name} {weather?.country}
                  </h3>
                  <img src={weather?.iconURL} alt="weatherIcon" />
                  <h3>{weather?.description}</h3>
                </div>
                <div className="temperature">
                  <h1>
                    {weather?.temp.toFixed()}°{units === "metric" ? "C" : "F"}
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
