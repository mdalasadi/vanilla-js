class Weather {
  constructor(city, lat, lon) {
    this.apiKey = "11b900e25f0fbe00be74f247a5702cd4";
    this.city = city;
    this.lat = lat;
    this.lon = lon;
  }

  async getWeatherByCityName() {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${this.apiKey}`
    );

    if (!response.ok) {
      return Promise.reject(new Eorr(response.status));
    }

    const responseData = await response.json();

    return responseData;
  }

  async getWeatherByGeoLocation() {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${this.lat}&lon=${this.lon}&appid=${this.apiKey}`
    );

    if (!response.ok) {
      return Promise.reject(new Eorr(response.status));
    }

    const responseData = await response.json();

    return responseData;
  }

  setCity(city) {
    this.city = city;
  }

  setLatLon(lat, lon) {
    this.lat = lat;
    this.lon = lon;
  }
}
