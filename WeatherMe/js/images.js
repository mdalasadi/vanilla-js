class Image {
  constructor(city) {
    this.apiKey = {
      headers: {
        Authorization:
          "563492ad6f91700001000001434dd7076f88426986c3d04308c54bdd",
      },
    };
    this.city = city;
  }

  async getImage() {
    const response = await fetch(
      `https://api.pexels.com/v1/search?query=${this.city}&per_page=1`,
      this.apiKey
    );

    if (!response.ok) {
      return Promise.reject(new Eorr(response.status));
    }

    const responseData = await response.json();

    return responseData.photos[0].src.landscape;
  }

  setCity(city) {
    this.city = city;
  }
}
