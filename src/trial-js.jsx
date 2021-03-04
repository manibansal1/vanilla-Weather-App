let now = new Date(); 
let min = now.getMinutes();
if (min < 10) {
    min = `0${min}`;
}
    let hour = now.getHours();
if (hour < 10) {
    hour = `0${hour}`;
}
let AmOrPm = hour >= 12 ? "pm" : "am";
hour = hour % 12 || 12;
let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
];
let day = days[now.getDay()];
let dates = now.getDate();
if (dates < 10) {
    dates = `0${dates}`;
}
let months = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12"
];
let month = months[now.getMonth()];
if (month < 10) {
    month = `0${month}`;
}
let year = now.getFullYear();
let date = document.querySelector("#dateTime");
date.innerHTML = `${day}, ${hour}:${min} ${AmOrPm} <br/>${dates}-${month}-${year}`;

function forecastHours(timestamp){  
    let now = new Date(timestamp); 
let min = now.getMinutes();
if (min < 10) {
    min = `0${min}`;
}
    let hour = now.getHours();
if (hour < 10) {
    hour = `0${hour}`;
}
let AmOrPm = hour >= 12 ? "pm" : "am";
hour = hour % 12 || 12;
return `${hour}:${min} ${AmOrPm}`;
}

function weatherForcasti(response) {
    let forecastElement = document.querySelector("#forecastShow");
    forecastElement.innerHTML=null;
    let forecast = null;    
    for (let index = 0; index < 6; index++) {
        forecast = response.data.list[index];
        let iconShow = forecast.weather[0].icon;
       let timeShow = forecastHours(forecast.dt * 1000);
        forecastElement.innerHTML += ` <div class="col-lg-2 col-4 g-5">
             <p>${timeShow}</p>    
            <img src="http://openweathermap.org/img/wn/${iconShow}@2x.png" id="images";>   
       <p>${Math.round(forecast.main.temp_max)}°c</p>
    </div>`;
         }
}
function weatherForcast(response) {
    let imgElement = document.querySelector("#imgChange");
    let weatherDescp = response.data.weather[0].description;
    let temp = Math.round(response.data.main.temp);
  // console.log(response.data.weather[0].description);
    if(temp > 16 && temp <= 25){         
    imgElement.setAttribute("src",`media/sunny-weather.png`);
    }else if(temp < 0 ){
        imgElement.setAttribute("src",`media/snow.png`);    
    }else if(temp > 1 && temp <= 15){
                  imgElement.setAttribute("src",`media/cloudy.png`);
}else if(temp > 26){
    imgElement.setAttribute("src",`media/sunny-transparent.png`);
}
}
function weatherReport(response) {
    let Citytemp = Math.round(response.data.main.temp);
    let cuty = response.data.name;
    let weatherDescp = response.data.weather[0].description;
    let windValue = Math.round(response.data.wind.speed);
    let Showvisibility = response.data.visibility;
    let h = document.querySelector("h2");
    h.innerHTML = ` ${cuty}`;
    let temp = document.querySelector("#temperature");
    temp.innerHTML = ` ${Citytemp}°c`;
    let weatherDesc = document.querySelector("#weatherDes");
    weatherDesc.innerHTML = `${weatherDescp}`;
    let windVle = document.querySelector("#windSpeed");
    windVle.innerHTML = `Wind: ${windValue} Km/H`;
    let visibleShow = document.querySelector("#clearity");
    visibleShow.innerHTML = `Visibility: ${Showvisibility}`;
  }
function signUp(event) {
    event.preventDefault();
    let searchInput = document.querySelector("#search-input-value");
    let searchinputvalue = searchInput.value;
    let searchingCity = document.querySelector("b");
    searchingCity.innerHTML = `Searching for ${searchinputvalue}..`;

    let unit = "metric";
    let key = "13e2506a1c7afb0b57bd67ef7fa6b1ef";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchinputvalue}&appid=${key}&units=${unit}`;
    let ApiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${searchinputvalue}&appid=${key}&units=${unit}`;
    axios.get(apiUrl).then(weatherReport);    
    axios.get(ApiUrl).then(weatherForcasti);
    axios.get(apiUrl).then(weatherForcast);

}
let form = document.querySelector("#search-input-form");
form.addEventListener("submit", signUp);
//Current Location
function weather(response) {
    let temprature = Math.round(response.data.main.temp);
    let cityName = response.data.name;
    let weatherDescription = response.data.weather[0].description;
    let windSpeedValue = Math.round(response.data.wind.speed);
    let visibilityValue = response.data.visibility;

    let h1 = document.querySelector("h1");
    h1.innerHTML = `${temprature}°c`;
    let h = document.querySelector("#city");
    h.innerHTML = `${cityName}`;
    let weatherDescriptionShow = document.querySelector("#weatherDes");
    weatherDescriptionShow.innerHTML = `${weatherDescription}`;
    let wind = document.querySelector("#windSpeed");
    wind.innerHTML = `Wind: ${windSpeedValue} Km/H`;
    let visible = document.querySelector("#clearity");
    visible.innerHTML = `Visibility: ${visibilityValue}`;
}
function geo(position) {
    let longitude = position.coords.longitude;
    let latitude = position.coords.latitude;
    let key = "13e2506a1c7afb0b57bd67ef7fa6b1ef";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}&units=metric`;
    axios.get(apiUrl).then(weather);
}
function getcurrentLocation() {
    navigator.geolocation.getCurrentPosition(geo);
}
let curentlocation = document.querySelector("#currentLocationShow");
curentlocation.addEventListener("click", getcurrentLocation);
