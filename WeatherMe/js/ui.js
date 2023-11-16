class UI {
  constructor() {
    this.showcase = document.querySelector(".showcase");
    this.UIwLocation = document.querySelector("#w-location");
    this.UItime = document.querySelector("#time");
    this.UIwString = document.querySelector("#w-string");
    this.UIwDesc = document.querySelector("#w-desc");
    this.UIminTemp = document.querySelector("#w-min");
    this.UImaxTemp = document.querySelector("#w-max");
    this.UIHumidity = document.querySelector("#w-humidiy");
    this.UIhumidity = document.querySelector("#w-humidity");
    this.UIpressure = document.querySelector("#w-pressure");
    this.UIfeelLike = document.querySelector("#w-feels-like");
    this.UIwindSpeed = document.querySelector("#w-wind");
    this.UIsunrise = document.querySelector("#w-sunrise");
    this.UIsunset = document.querySelector("#w-sunset");
  }

  displayBgImage(data) {
    this.showcase.style.backgroundImage = `url("${data}")`;
  }

  displayDefultBgImage() {
    this.showcase.style.backgroundImage = `url("https://source.unsplash.com/q4TfWtnz_xw")`;
  }

  paint(weather) {
    this.UIwLocation.innerText = `${weather.name}, ${weather.sys.country}`;
    this.UItime.innerHTML = `${getTime(weather.dt).hours}:${
      getTime(weather.dt).minutes
    }`;
    this.UIwString.innerHTML = `${(weather.main.temp - 273.15).toFixed(
      0
    )} &deg;C | ${(((weather.main.temp - 273.15) * 9) / 5 + 32).toFixed(
      0
    )} &deg;F`;
    this.UIwDesc.innerHTML = weather.weather[0].description;
    this.UIminTemp.innerHTML = `Min: ${(weather.main.temp_min - 273.15).toFixed(
      0
    )} &deg;C &nbsp; &nbsp;<i class="fas fa-temperature-low"></i>`;
    this.UImaxTemp.innerHTML = `Max: ${(weather.main.temp_max - 273.15).toFixed(
      0
    )} &deg;C &nbsp; &nbsp;<i class="fas fa-temperature-high"></i>`;
    this.UIhumidity.innerHTML = `Humidity: ${weather.main.humidity}% &nbsp; <i class="fas fa-water"></i>`;
    this.UIpressure.innerHTML = `Pressure: ${weather.main.pressure} hPa`;
    this.UIfeelLike.innerHTML = `Feels Like: ${(
      weather.main.feels_like - 273.15
    ).toFixed(0)} &deg;C`;
    this.UIwindSpeed.innerHTML = `Wind: ${(weather.wind.speed * 3.6).toFixed(
      0
    )} km/h  &nbsp;<i class="fas fa-wind"></i>`;
    this.UIsunrise.innerHTML = `Sunrise: 0${
      getTime(weather.sys.sunrise).hours
    }:${getTime(weather.sys.sunrise).minutes} &nbsp <i class="fas fa-sun"></i>`;
    this.UIsunset.innerHTML = `Sunset: ${getTime(weather.sys.sunset).hours}:${
      getTime(weather.sys.sunset).minutes
    } &nbsp <i class="fas fa-moon"></i>`;
  }
}

function getTime(time) {
  const date = new Date(time * 1000);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return {
    hours,
    minutes,
  };
}
