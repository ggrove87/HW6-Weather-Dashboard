let apiKey = "ed6c43b0f4986d5644abce6786e4511f";
let searchBtn = document.querySelector("#searchBtn");
let selectedCity = document.querySelector("#cityInput");
let cityList = document.querySelector("#cityList");
let cityName = document.querySelector("#cityName");
let currentTemp = document.querySelector("#tempurature");
let currentWind = document.querySelector("#windSpeed");
let currentHumidity = document.querySelector("#humidity");
let ultraVioletIndex = document.querySelector("#ultraVioletIndex");
let fiveDayCondition = document.querySelectorAll("img");
let fiveDayDate = document.querySelectorAll(".card-title");
let fiveDayTemp = document.querySelectorAll(".card-temp");
let fiveDayWind = document.querySelectorAll(".card-wind");
let fiveDayHumidity = document.querySelectorAll(".card-humidity");

// pulls in weather data from the openweathermap.org api and pulls the location data based on the name of the city to generate the weather data
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
      localStorage.setItem(cityData.city.id, selectedCity.value);
      displayWeatherData(cityData.list);
      displayCity(cityData.city.id);
    });
}
// displays the 5 day forecast and determines which icon to used based on the weather conditions
function displayWeatherData(city) {
  let j = 0;
  let fiveDayDateEl = [];
  let fiveDayTempEl = [];
  let fiveDayWindEl = [];
  let fiveDayHumidityEl = [];
  let fiveDayConditionEl = [];

  for (let i = 4; i < 37; i += 8) {
    fiveDayDateEl[j] = city[i].dt_txt;
    fiveDayTempEl[j] = city[i].main.temp;
    fiveDayWindEl[j] = city[i].wind.speed;
    fiveDayHumidityEl[j] = city[i].main.humidity;
    fiveDayConditionEl[j] = city[i].weather[0].main;
    fiveDayDate[j].innerText = fiveDayDateEl[j];
    fiveDayTemp[j].innerText = "Temp: " + fiveDayTempEl[j];
    fiveDayWind[j].innerText = "Wind: " + fiveDayWindEl[j] + " mph";
    fiveDayHumidity[j].innerText = "Humidity: " + fiveDayHumidityEl[j];
    if (fiveDayConditionEl[j] == "Clear") {
      fiveDayCondition[j].src = "http://openweathermap.org/img/wn/01d@2x.png";
    } else if (fiveDayConditionEl[j] === "Clouds") {
      fiveDayCondition[j].src = "http://openweathermap.org/img/wn/03d@2x.png";
    } else if (fiveDayConditionEl[j] == "Rain") {
      fiveDayCondition[j].src = "http://openweathermap.org/img/wn/09d@2x.png";
    }
    j++;
  }
}
// displays the current weather data based on the entered city and displays it at the top of the page
function displayCurrentWeather(city) {
  fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`
  )
    .then((response) => response.json())
    .then((geoData) => {
      return fetch(
        `http://api.openweathermap.org/data/2.5/weather?lat=${geoData[0].lat}&lon=${geoData[0].lon}&units=imperial&appid=${apiKey}`
      );
    })
    .then((response) => response.json())
    .then((cityData) => {
      cityName.innerText = cityData.name;
      currentTemp.innerText = "Temp: " + cityData.main.temp;
      currentWind.innerText = "Wind: " + cityData.wind.speed + " mph";
      currentHumidity.innerText = "Humidity: " + cityData.main.humidity;
    });
}

function displayUVIndex(city) {
  fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`
  )
    .then((response) => response.json())
    .then((geoData) => {
      return fetch(
        `http://api.openweathermap.org/data/2.5/onecall?lat=${geoData[0].lat}&lon=${geoData[0].lon}&units=imperial&appid=${apiKey}`
      );
    })
    .then((response) => response.json())
    .then((cityData) => {
      ultraVioletIndex.innerText = "UV Index " + cityData.current.uvi;
      if (cityData.current.uvi <= 2) {
        ultraVioletIndex.classList.add("lowUV");
      } else if (cityData.current.uvi <= 7) {
        ultraVioletIndex.classList.add("mediumUV");
      } else {
        ultraVioletIndex.classList.add("highUV");
      }
    });
}

function displayCity(city) {
  let enteredCity = localStorage.getItem(city);
  let lineEl = document.createElement("li");
  lineEl.innerText = enteredCity;
  cityList.appendChild(lineEl);
  console.log(enteredCity);
}

cityList.addEventListener("click", function (event) {
  event.preventDefault();
  let selectedBtn = event.target;

  if (selectedBtn.matches("li") === true) {
    let currentCity = selectedBtn.textContent;
    pullWeatherData(currentCity);
    displayCurrentWeather(currentCity);
    displayUVIndex(currentCity);
  }
});

// triggers the weather functions to display the data
searchBtn.addEventListener("click", function (event) {
  event.preventDefault();
  let currentCity = selectedCity.value;
  pullWeatherData(currentCity);
  displayCurrentWeather(currentCity);
  displayUVIndex(currentCity);
});
