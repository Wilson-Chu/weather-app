// const tempOfLocation = document.querySelector(".temp");
// const unitSystem = document.querySelector(".unit-system");
// const city = document.querySelector(".city");
// const country = document.querySelector(".country");
let tempOfLocation = document.querySelector(".weather-now");
let location = document.querySelector(".location");

const form = document.querySelector(".form");
const search = document.getElementById("search");
let searchTerm;
let units = "&units=metric"; // &units=metric OR &units=imperial
let unitCF = "°C"; // Unit system being used: Celsius or Fahrenheit

form.addEventListener("submit", loadLocation);

// Made this for generic searches...
async function fetchLocation(location) {
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
    // tempOfLocation.textContent = json.main.temp;
    // city.textContent = json.name;
    // country.textContent = json.sys.country;
    // unitSystem.textContent = unitCF;
    tempOfLocation.textContent = `${json.main.temp} ${unitCF}`;
    location.textContent = `${json.name}, ${json.sys.country}`;
  } catch {
    console.log("You done messed up!");
  }
}

async function loadLocation(e) {
  searchTerm = search.value;
  if (!searchTerm) {
    searchTerm = "London, UK"; // If the location is empty, we default to London, UK
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
    // tempOfLocation.textContent = json.main.temp;
    // city.textContent = json.name;
    // country.textContent = json.sys.country;
    // unitSystem.textContent = unitCF;
    tempOfLocation.textContent = `${json.main.temp} ${unitCF}`;
    location.textContent = `${json.name}, ${json.sys.country}`;
  } catch {
    console.log("Unable to find location, will default to London, UK");
    fetchLocation("London, UK");
  }
}

document.addEventListener("DOMContentLoaded", loadLocation);
