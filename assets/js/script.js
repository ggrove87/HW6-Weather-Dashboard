let apiKey = "ed6c43b0f4986d5644abce6786e4511f";
let searchBtn = document.querySelector("searchBtn");
let selectedCity = document.querySelector("#cityInput").textContent;

function pullWeatherData() {
  fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${selectedCity}&appid=${apiKey}`
  )
    .then((response) => response.json())
    .then((geoData) => {
      console.log(geoData);
      return fetch(
        `http://api.openweathermap.org/data/2.5/forecast?lat=${geoData[0].lat}&lon=${geoData[0].lon}&appid=${apiKey}`
      );
    })
    .then((response) => response.json())
    .then((cityData) => {});
}
searchBtn.addEventListener("click", function (event) {
  event.preventDefault();
});
