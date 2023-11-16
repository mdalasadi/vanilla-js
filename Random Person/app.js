"use strict";
// Elements
const btnRandom = document.getElementById("random");

const btnName = document.getElementById("name");
const btnEmail = document.getElementById("email");
const btnAge = document.getElementById("age");
const btnLocation = document.getElementById("address");
const btnPhone = document.getElementById("phone");
const btnPassword = document.getElementById("password");

const ImgPerson = document.getElementById("avatar");
const labelInfoDesc = document.getElementById("info-decs");
const labelInfo = document.getElementById("info");

let personData;
let btnActive = btnName;

// Display the picture of the person
function displayPicture({ picture: { large } }) {
  ImgPerson.src = large;
}

function displayName({ name: { first, last } }) {
  labelInfoDesc.textContent = "My name is";
  labelInfo.textContent = `${first} ${last}`;
}

function displayEmail({ email }) {
  labelInfoDesc.textContent = "My Email";
  labelInfo.textContent = email;
}

function displayAge({ dob: { age } }) {
  labelInfoDesc.textContent = "My Age";
  labelInfo.textContent = age;
}

function displayLocation({ location: { country, city } }) {
  labelInfoDesc.textContent = "My Address";
  labelInfo.textContent = `${country}, ${city}`;
}

function displayPhone({ phone }) {
  labelInfoDesc.textContent = "My Phone Number";
  labelInfo.textContent = phone;
}

function displayPassword({ login: { password } }) {
  labelInfoDesc.textContent = "My Password";
  labelInfo.textContent = password;
}

// Fetch the data of the person
async function fetchData() {
  btnActive.classList.remove("active");
  btnName.classList.add("active");
  btnActive = btnName;

  const res = await fetch("https://randomuser.me/api/");
  const data = await res.json();
  personData = data.results[0];
  displayPicture(personData);
  displayName(personData);
}

// Events
btnRandom.addEventListener("click", fetchData);
document.addEventListener("DOMContentLoaded", fetchData);

btnName.addEventListener("click", function () {
  if (btnActive.classList.contains("active"))
    btnActive.classList.remove("active");
  this.classList.add("active");
  btnActive = this;
  displayName(personData);
});

btnEmail.addEventListener("click", function () {
  if (btnActive.classList.contains("active"))
    btnActive.classList.remove("active");
  this.classList.add("active");
  btnActive = this;
  displayEmail(personData);
});

btnAge.addEventListener("click", function () {
  if (btnActive.classList.contains("active"))
    btnActive.classList.remove("active");
  this.classList.add("active");
  btnActive = this;
  displayAge(personData);
});

btnLocation.addEventListener("click", function () {
  if (btnActive.classList.contains("active"))
    btnActive.classList.remove("active");
  this.classList.add("active");
  btnActive = this;
  displayLocation(personData);
});

btnPhone.addEventListener("click", function () {
  if (btnActive.classList.contains("active"))
    btnActive.classList.remove("active");
  this.classList.add("active");
  btnActive = this;
  displayPhone(personData);
});

btnPassword.addEventListener("click", function () {
  if (btnActive.classList.contains("active"))
    btnActive.classList.remove("active");
  this.classList.add("active");
  btnActive = this;
  displayPassword(personData);
});
