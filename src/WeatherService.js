const API_KEY = "3c04a87e06beca598cf72ac306613a0f";

const makeIconUrl = (iconId) => {
  return `https://openweathermap.org/img/wn/${iconId}.png`;
};

export const getFormattedWeatherData = async (city, units) => {
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${units}`;

  const data = await fetch(URL)
    .then((res) => res.json())
    .then((data) => data);

  const {
    weather,
    main: { temp, feels_like, temp_min, temp_max, pressure, humidity },
    wind: { speed },
    sys: { country },
    name,
    dt,
  } = data;

  const { description, icon } = weather[0];
  console.log(data);

  return {
    dt,
    description,
    iconURL: makeIconUrl(icon),
    temp,
    feels_like,
    temp_min,
    temp_max,
    pressure,
    humidity,
    speed,
    country,
    name,
  };
};
