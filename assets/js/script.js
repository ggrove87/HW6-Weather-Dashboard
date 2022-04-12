let apiKey = "ed6c43b0f4986d5644abce6786e4511f";
let searchBtn = document.querySelector("#searchBtn");
let selectedCity = document.querySelector("#cityInput");
let cityName = document.querySelector("#cityName");
let currentTemp = document.querySelector("#tempurature");
let currentWind = document.querySelector("#windSpeed");
let currentHumidity = document.querySelector("#humidity");
let ultraVioletIndex = document.querySelector("#ultraVioletIndex");
let fiveDayCondition = document.querySelectorAll("img");
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
        localStorage.setItem(cityData.city.id, selectedCity)
        displayWeatherData(cityData.list)
        console.log(cityData.city.id);
    });
}

function displayWeatherData(city){
    let j = 0;
    let fiveDayDateEl = [];
    let fiveDayTempEl = [];
    let fiveDayWindEl = [];
    let fiveDayHumidityEl = [];
    let fiveDayConditionEl = [];

    for (let i = 4; i < 37; i+=8) {
        fiveDayDateEl[j] = city[i].dt_txt;
        fiveDayTempEl[j] = city[i].main.temp;
        fiveDayWindEl[j] = city[i].wind.speed;
        fiveDayHumidityEl[j] = city[i].main.humidity;
        fiveDayConditionEl[j]=city[i].weather[0].main;
        fiveDayDate[j].innerText = fiveDayDateEl[j];
        fiveDayTemp[j].innerText = "Temp: " +fiveDayTempEl[j];
        fiveDayWind[j].innerText = "Wind: "+fiveDayWindEl[j]+" mph";
        fiveDayHumidity[j].innerText = "Humidity: "+fiveDayHumidityEl[j];
        if (fiveDayConditionEl[j] == "Clear") {
            fiveDayCondition[j].src = "http://openweathermap.org/img/wn/01d@2x.png";
        } else if (fiveDayConditionEl[j] ==="Clouds"){
            fiveDayCondition[j].src = "http://openweathermap.org/img/wn/03d@2x.png";
        } else if (fiveDayConditionEl[j] == "Rain") {
            fiveDayCondition[j].src = "http://openweathermap.org/img/wn/10d@2x.png";
        }

        
        j++
        console.log(fiveDayConditionEl);
    }
}

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
            currentTemp.innerText = "Temp: " +cityData.main.temp;
            currentWind.innerText = "Wind: "+cityData.wind.speed+" mph";
            currentHumidity.innerText = "Humidity: "+cityData.main.humidity;
            console.log(cityData);
        });
}

searchBtn.addEventListener("click", function (event) {
  event.preventDefault();
  let currentCity = selectedCity.value;
  pullWeatherData(currentCity);
  displayCurrentWeather(currentCity);
});
