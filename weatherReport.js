const tempOfLocation = document.querySelector(".weather-now");
const cityCountry = document.querySelector(".location");

const form = document.querySelector(".form");
const search = document.getElementById("search");
let searchTerm;
let units = "&units=metric"; // &units=metric OR &units=imperial
let unitCF = "°C"; // Unit system being used: Celsius or Fahrenheit

form.addEventListener("submit", loadData);

async function fetchData(location) {
  try {
    const response = await fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        location +
        units +
        "&APPID=e8f6188ad8df3a7a1f3a0003183aebed",
      {
        mode: "cors",
      }
    );
    const json = await response.json();
    tempOfLocation.textContent = `${Math.round(json.main.temp)} ${unitCF}`;
    cityCountry.textContent = `${json.name}, ${json.sys.country}`;
  } catch {
    console.log("You done messed up!");
  }
}

async function loadData(e) {
  searchTerm = search.value;
  if (!searchTerm) {
    searchTerm = "London, UK"; // If the location is empty, default to London, UK
  }
  e.preventDefault();

  try {
    const response = await fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        searchTerm +
        units +
        "&APPID=e8f6188ad8df3a7a1f3a0003183aebed",
      {
        mode: "cors",
      }
    );
    const json = await response.json();
    tempOfLocation.textContent = `${Math.round(json.main.temp)} ${unitCF}`;
    cityCountry.textContent = `${json.name}, ${json.sys.country}`;
  } catch {
    console.log("Unable to find location, will default to London, UK");
    fetchData("London, UK");
  }
}

document.addEventListener("DOMContentLoaded", loadData);
