let lat = "";
let lon = "";
let routeId = localStorage.getItem('routeId');
let deg = "";

window.onload = function(){
    document.getElementById('endscreen').style.display = "none";

    getLocation();
    logout();
};
function logout(){
    document.getElementById('logout').addEventListener('click', event => {
        event.preventDefault();
        window.localStorage.clear();
        document.location.href = "index.html";
    });
}

async function weather(){
    let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=6ff6455d459b79d14f52d648b450aefa&units=metric
    `);
    return await response.json()
    .then(data => {
        displayWeather(data);
    });
};

function displayWeather(data){
    document.getElementById('endscreen').style.display = "block";
    document.getElementById('loading').style.display = "none";
    console.log(data);
    deg = data.wind.deg
    document.getElementById("weather").insertAdjacentHTML("afterend",
        `<div id="weatherInfo">
                <h2>Weather:</h2>
            <div id="inline">
                <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="" srcset="">
                <ul>
                    <li>${data.weather[0].main}</li>
                    <li><i class="fas fa-thermometer-half"></i> ${Math.round(data.main.temp)}°C</li>
                    <li><i class="fas fa-wind"></i> ${Math.round((data.wind.speed)*3.6)}km/h ${degreeToText()}</li>
                </ul>
            </div>
        </div>
        <div id="download">
            <button class="button" id="downloadButton"><i class="fas fa-download"></i> route.gpx</button>
        </div>
        `
    );
    document.getElementById('download').addEventListener('click', e =>{
        e.preventDefault();
        document.location.href = `https://www.strava.com/routes/${routeId}/export_gpx`;
    });
}

function getLocation() {
    navigator.geolocation.getCurrentPosition(showPosition);
}

function showPosition(position) {
  lat = Math.round(position.coords.latitude);
  lon = Math.round(position.coords.longitude);
  weather();
}

function  degreeToText(degree){
    if (degree>337.5) return 'North';
    if (degree>292.5) return 'North West';
    if(degree>247.5) return 'West';
    if(degree>202.5) return 'South West';
    if(degree>157.5) return 'South';
    if(degree>122.5) return 'South East';
    if(degree>67.5) return 'East';
    if(degree>22.5){return 'North East';}
    return 'North';
}

//https://www.strava.com/routes/2904695789570291470/export_gpx