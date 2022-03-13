let now = new Date();

let min = now.getMinutes();
let hour = now.getHours();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

let sentence = `${day} ${hour}:${min} minutes`;

let currentDay = document.querySelector("#current-day");
currentDay.innerHTML = `${sentence}`;

function showResult(response) {
  document.querySelector("#main-city").innerHTML = response.data.name;
  document.querySelector("#degree-id").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#hum-id").innerHTML = response.data.main.humidity;
  document.querySelector("#wind-id").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#descrip-id").innerHTML =
    response.data.weather[0].main;
  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
}

function search(city) {
  let apiKey = "50fb3754982e6e5aa21c3fc297db7f5d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showResult);
}

function changeCity(event) {
  event.preventDefault();
  let city = document.querySelector("#form-1").value;
  search(city);
}

let enterCity = document.querySelector("#search-box");
enterCity.addEventListener("click", changeCity);

// for current button
function currentCity(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchCurrentLocation);
}

function searchCurrentLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "50fb3754982e6e5aa21c3fc297db7f5d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showResult);
}

let currentButton = document.querySelector("#current-box");
currentButton.addEventListener("click", currentCity);

search("London");
