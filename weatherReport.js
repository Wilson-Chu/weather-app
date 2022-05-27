const form = document.querySelector(".form");
const search = document.getElementById("search");
const toggleUnit = document.querySelector(".toggle-unit");
const tempOfLocation = document.querySelector(".weather-now");
const cityCountry = document.querySelector(".location");
const condition = document.querySelector(".condition");
const feelsLike = document.querySelector(".weather-feel");
const humidity = document.querySelector(".humidity");
const windSpeed = document.querySelector(".wind-speed");
let searchTerm;
let units = "&units=metric"; // &units=metric OR &units=imperial
let unitCF = "°C"; // Unit system being used: Celsius or Fahrenheit
let unitSpeed = "KPH"; // Unit changes depending on unitCF: m/s or MPH

form.addEventListener("submit", loadData);
toggleUnit.addEventListener("click", switchUnit);

async function fetchData(location) {
  try {
    const response = await fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        location +
        units +
        "&APPID=28fe7b5f9a78838c639143fc517e4343",
      {
        mode: "cors",
      }
    );
    const json = await response.json();
    cityCountry.textContent = `${json.name}, ${json.sys.country}`;
    tempOfLocation.textContent = `${Math.round(json.main.temp)} ${unitCF}`;
    condition.textContent = `${json.weather[0].description}`;
    feelsLike.textContent = `Feels like: ${Math.round(
      json.main.feels_like
    )} ${unitCF}`;
    humidity.textContent = `Humidity: ${json.main.humidity}%`;

    if (unitSpeed === "KPH") {
      json.wind.speed *= 3.6; // Converting default metric unit of m/s to KPH
    }
    windSpeed.textContent = `Wind Speed: ${Math.round(
      json.wind.speed
    )} ${unitSpeed}`;
  } catch {
    alert(
      `Unable to find location "${searchTerm}". Please check spelling carefully.`
    );
  }
}

// .active means units are in °F
function switchUnit(e) {
  if (toggleUnit.classList.contains(".active")) {
    toggleUnit.classList.remove(".active");
    toggleUnit.textContent = "Switch To °F";
    units = "&units=metric";
    unitCF = "°C";
    unitSpeed = "KPH";
    loadData(e);
  } else {
    toggleUnit.classList.add(".active");
    toggleUnit.textContent = "Switch To °C";
    units = "&units=imperial";
    unitCF = "°F";
    unitSpeed = "MPH";
    loadData(e);
  }
}

function loadData(e) {
  searchTerm = search.value;
  if (!searchTerm) {
    searchTerm = "London, UK"; // If the location is empty, default to London, UK
  }
  e.preventDefault();
  fetchData(searchTerm);
}

document.addEventListener("DOMContentLoaded", loadData);
