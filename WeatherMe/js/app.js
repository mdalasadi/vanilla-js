// Init Storage object
const ls = new Storage();
// Init UI object
const ui = new UI();
// Init Images object
const image = new Image(ls.getItemFromLS());
// Init Weather object
const weather = new Weather(ls.getItemFromLS());

// Get Weather and Image on DOM loaded
document.addEventListener("DOMContentLoaded", getContent);

// Change the city
document.getElementById("w-change-loc").addEventListener("click", (e) => {
  const city = document.getElementById("city").value;

  if (city !== "") {
    weather.setCity(city);
    image.setCity(city);
    // Set the city to local stroga
    ls.setItemToLS(city);
    // Display the details
    getContent();

    // Clear the input
    document.getElementById("city").value = "";
    // Close the modal
    document.getElementById("w-modal").classList.remove("modal-active");
  } else {
    document.querySelector("label").innerText = "Enter the City please!";
    document.querySelector("label").style.color = "#ff0000";
    setTimeout(() => {
      document.querySelector("label").innerText = "City";
      document.querySelector("label").style.color = "#000000";
    }, 1500);
  }

  e.preventDefault();
});

// Get by current location
document.getElementById("w-current-loc").addEventListener("click", (e) => {
  if (window.navigator) {
    window.navigator.geolocation.getCurrentPosition((position) => {
      weather.setLatLon(position.coords.latitude, position.coords.longitude);
      weather
        .getWeatherByGeoLocation()
        .then((weatherData) => {
          ui.paint(weatherData);
        })
        .catch((err) => {
          console.log(err);
        });
      // Clear the input
      document.getElementById("city").value = "";
      // Close the modal
      document.getElementById("w-modal").classList.remove("modal-active");
    });
  }

  e.preventDefault();
});

function getContent() {
  // get weather data by city name
  weather
    .getWeatherByCityName()
    .then((weatherData) => {
      ui.paint(weatherData);
    })
    .catch((err) => {
      console.log(err);
    });

  // get image by city name
  image
    .getImage()
    .then((data) => {
      ui.displayBgImage(data);
    })
    .catch((err) => {
      ui.displayDefultBgImage();
      console.log(err);
    });
}

// // // Modal (open and close)
const UIshowModalBtn = document.getElementById("show-modal");
const UIcloseModalBtn = document.getElementById("close-btn");
const UIcloseModalSign = document.getElementById("close-modal-sign");
const UImodal = document.getElementById("w-modal");

// Open the modal
UIshowModalBtn.addEventListener("click", (e) => {
  UImodal.classList.add("modal-active");
  e.preventDefault();
});

// Close the modal
UIcloseModalBtn.addEventListener("click", closeModal);
UIcloseModalSign.addEventListener("click", closeModal);

function closeModal(e) {
  // Clear the input
  document.getElementById("city").value = "";
  // Close the modal
  UImodal.classList.remove("modal-active");
  e.preventDefault();
}
