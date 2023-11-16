class TMDB {
  constructor() {
    this.url = 'https://api.themoviedb.org/3';
    this.api_key = 'adb4b5a39f679f472783e1c997236339';
    this.page = 1;
    this.sort_by = 'popularity.desc';
  }

  async fetchMovies() {
    const response = await fetch(`${this.url}/discover/movie?api_key=${this.api_key}&sort_by=${this.sort_by}&page=${this.page}`);
    return await response.json();
  }

  async movieDetails(id) {
    const response = await fetch(`${this.url}/movie/${id}?api_key=${this.api_key}&language=en-US`);
    return await response.json();
  }

  async getCredits(id) {
    const response = await fetch(`${this.url}/movie/${id}/credits?api_key=${this.api_key}&language=en-US`);
    return await response.json();
  }

  async getImages(id) {
    const response = await fetch(`${this.url}/movie/${id}/images?api_key=${this.api_key}&language=en-US&include_image_language=en,null`);
    return await response.json();
  }


  async searchForMovies(query) {
    const response = await fetch(`${this.url}/search/movie?api_key=${this.api_key}&language=en-US&query=${query}&include_adult=false`);
    return await response.json();
  }

  async setNextPageOfMovies() {
    this.page += 1;
  }
}