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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForcast(response) {
  let forcast = response.data.daily;
  let forcastElement = document.querySelector(`#forcast`);
  let forcastHTML = `<div class="row">`;

  forcast.forEach(function (forcastDay, index) {
    if (index < 6) {
      forcastHTML =
        forcastHTML +
        `
        <div class="col-1 day_one">
          <div class="galax_one">${formatDay(forcastDay.dt)}</div>
        <img
          src="http://openweathermap.org/img/wn/${
            forcastDay.weather[0].icon
          }@2x.png" width="40px"/>
          
          <div>${Math.round(forcastDay.temp.max)}° <span>${Math.round(
          forcastDay.temp.min
        )}°</span></div>
        </div>`;
    }
  });

  forcastHTML = forcastHTML + `</div>`;
  forcastElement.innerHTML = forcastHTML;
}

function getForcast(coordinates) {
  let apiKey = "50fb3754982e6e5aa21c3fc297db7f5d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForcast);
}

function showResult(response) {
  celTemp = response.data.main.temp;

  document.querySelector("#main-city").innerHTML = response.data.name;
  document.querySelector("#degree-id").innerHTML = Math.round(celTemp);
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

  getForcast(response.data.coord);
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

function showFah(event) {
  event.preventDefault();
  let fahTemp = (celTemp * 9) / 5 + 32;
  let tempElement = document.querySelector("#degree-id");
  tempElement.innerHTML = Math.round(fahTemp);
  cellink.classList.remove("active");
  fahlink.classList.add("active");
}

function showCel(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#degree-id");
  tempElement.innerHTML = Math.round(celTemp);
  cellink.classList.add("active");
  fahlink.classList.remove("active");
}

let fahlink = document.querySelector("#fah");
fahlink.addEventListener("click", showFah);

let cellink = document.querySelector("#cel");
cellink.addEventListener("click", showCel);

let celTemp = null;
search("London");
