// import {makeItRain} from './raining.js';

//--------------------GET GEOLOCATION--------------------//
let temp;
const rainFront = document.getElementById('front-row');
const rainBack = document.getElementById('back-row');
const rainDiv = document.querySelector('.rain');
let isItRain;
const temperatureDescription = document.querySelector('.temperature-description');
const temperatureDegree = document.querySelector('.temperature-degree');
const locationTimezone = document.querySelector('.location-timezone');
const weatherDescription = document.querySelector('.weather-description');
const weatherIcon = document.querySelector('.weather-icon');
const apiKey = "4366c8c25dd4327d86508518112f4880";

window.addEventListener("load", () => {
    let lat;
    let lon;
    
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position =>{
            lat = position.coords.latitude;
            lon = position.coords.longitude;
            
            // const proxy = 'https://cors-anywhere.herokuapp.com/';
            const apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=` + apiKey;
            
            fetchWeather(apiUrl, 'geo');
            
        });
    };
});

// const currentLocation = document.querySelector(".btnCurrent")

document.querySelector(".btn").addEventListener("click", function () {
    search();
})

document.querySelector(".search-bar").addEventListener('keyup', function (event) {
    if (event.key === "Enter") {
        search();
    }
})

document.querySelector('#btnCurrent').addEventListener('click', function() {
    window.location.reload();
})


//--------------------MAKE IT RAIN--------------------//

var makeItRain = function() {
    //clear out everything
    $('.rain').empty();
  
    var increment = 0;
    var drops = "";
    var backDrops = "";
  
    while (increment < 100) {

      var randoHundo = (Math.floor(Math.random() * (98 - 1 + 1) + 1));
      var randoFiver = (Math.floor(Math.random() * (5 - 2 + 1) + 2));
     
      increment += randoFiver;
      
      drops += '<div class="drop" style="left: ' + increment + '%; bottom: ' + (randoFiver + randoFiver - 1 + 100) + '%; animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"><div class="stem" style="animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"></div><div class="splat" style="animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"></div></div>';
      backDrops += '<div class="drop" style="right: ' + increment + '%; bottom: ' + (randoFiver + randoFiver - 1 + 100) + '%; animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"><div class="stem" style="animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"></div><div class="splat" style="animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"></div></div>';
    }
  
    $('.rain.front-row').append(drops);
    $('.rain.back-row').append(backDrops);
  }
  
  $('.splat-toggle.toggle').on('click', function() {
    $('body').toggleClass('splat-toggle');
    $('.splat-toggle.toggle').toggleClass('active');
    makeItRain();
  });
  
  $('.back-row-toggle.toggle').on('click', function() {
    $('body').toggleClass('back-row-toggle');
    $('.back-row-toggle.toggle').toggleClass('active');
    makeItRain();
  });
  
  $('.single-toggle.toggle').on('click', function() {
    $('body').toggleClass('single-toggle');
    $('.single-toggle.toggle').toggleClass('active');
    makeItRain();
  });
  makeItRain();
//   export default { makeItRain };

function updateWeatherVisuals(temp) {
    if(temp >= 70) {
        document.body.style.background = 'linear-gradient(rgb(255, 155, 74), rgb(255, 75, 31))';
        temperatureDescription.textContent = "It's hot out there!";
        
    } else if (temp >= 50 && temp < 70) {
        document.body.style.background = 'linear-gradient(rgb(255,215,0), rgb(218,165,32))';
        temperatureDescription.textContent = "Not too hot, not too cold.";
    }else if (temp >= 40 && temp < 50) {
        document.body.style.background = 'linear-gradient(rgb(108, 246, 101), rgb(43, 88, 42))';
        temperatureDescription.textContent = "You'll need a jacket.";
    }else{
        document.body.style.background = "linear-gradient(rgb(47,150,163), rgb(48,62,143))"
        temperatureDescription.textContent = "Golly it's cold."
    };
    if(isItRain === 'Rain' || isItRain === 'Thunderstorm') {
        console.log("BABABOOEY")
        document.body.style.background = 'linear-gradient(rgb(107, 107, 106), rgb(40, 40, 39))';
        temperatureDescription.textContent = "Don't forget an umbrella.";
        rainFront.style.display = 'block';
        rainBack.style.display = 'block';
    }else{
        rainFront.style.display = 'none';
        rainBack.style.display = 'none';
    };
}

function fetchWeather(apiUrl, locationType) {
    fetch(apiUrl).then(response => {
        return response.json();
    }).then(data=> {
        displayWeather(data, locationType);
    }).catch((error) => {
        console.log("ERROR", error);
        alert('City not found');
    });
}

function displayWeather(data, locationType) {
    console.log(data);
    let icon;
    if (locationType == "geo") {
        isItRain = data.current.weather[0].main;
        temp = data.current.temp;
        icon = data.current.weather[0].icon;
        weatherDescription.innerText = data.current.weather[0].description;
        locationTimezone.innerText = data.timezone;
    } else if (locationType == "city") {
        isItRain = data.weather[0].main;
        temp = data.main.temp;
        icon = data.weather[0].icon;
        weatherDescription.innerText = data.weather[0].description;
        locationTimezone.innerText = data.name;
    }
    

    
    temperatureDegree.innerText = Math.round(temp);
    weatherIcon.innerHTML = `<img src=icons/${icon}.png>`;
    
    updateWeatherVisuals(temp);
}

function search() {
    let city = document.querySelector('.search-bar').value;
    // const api = `http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=` + apiKey;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=`+ apiKey;
     console.log(apiUrl);
    fetchWeather(apiUrl, "city");
}
