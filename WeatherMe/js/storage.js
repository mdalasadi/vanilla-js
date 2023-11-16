class Storage {
  constructor() {
    this.city;
    this.defaultCiyt = "london";
  }

  getItemFromLS() {
    if (localStorage.getItem("city") === null) {
      this.city = this.defaultCiyt;
    } else {
      this.city = localStorage.getItem("city");
    }

    return this.city;
  }

  setItemToLS(city) {
    localStorage.setItem("city", city)
  }
}
