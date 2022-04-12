let apiKey = "ed6c43b0f4986d5644abce6786e4511f";
let searchBtn = document.querySelector("#searchBtn");
let selectedCity = document.querySelector("#cityInput");
let fiveDayDate = document.querySelectorAll(".card-title")
let fiveDayTemp = document.querySelectorAll(".card-temp");
let fiveDayWind = document.querySelectorAll(".card-wind");
let fiveDayHumidity = document.querySelectorAll(".card-humidity");

function pullWeatherData(city) {
  fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`
  )
    .then((response) => response.json())
    .then((geoData) => {
      return fetch(
        `http://api.openweathermap.org/data/2.5/forecast?lat=${geoData[0].lat}&lon=${geoData[0].lon}&units=imperial&appid=${apiKey}`
      );
    })
    .then((response) => response.json())
    .then((cityData) => {

        displayWeatherData(cityData.list)
        console.log(cityData.list);
        console.log(cityData.list[4].main.temp);
    });
}

function displayWeatherData(city){
    let j = 0;
    let fiveDayDateEl = [];
    let fiveDayTempEl = [];
    let fiveDayWindEl = [];
    let fiveDayHumidityEl = [];

    for (let i = 4; i < 37; i+=8) {
        
        fiveDayTempEl[j] = city[i].main.temp;
        fiveDayWindEl[j] = city[i].wind.speed;
        fiveDayHumidityEl[j] = city[i].main.humidity;
        fiveDayTemp[j].innerText = "Temp: " +fiveDayTempEl[j];
        fiveDayWind[j].innerText = "Wind: "+fiveDayWindEl[j];
        fiveDayHumidity[j].innerText = "Humidity: "+fiveDayHumidityEl[j];
        console.log(city[i].wind);
        j++
        console.log(j);
    }
    console.log(fiveDayTemp);
    console.log(fiveDayTempEl);
}

searchBtn.addEventListener("click", function (event) {
  event.preventDefault();
  let currentCity = selectedCity.value;
  pullWeatherData(currentCity);
});
