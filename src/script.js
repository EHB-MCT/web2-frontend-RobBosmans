// https://www.strava.com/oauth/token?client_id=41469&client_secret=0743f07f60f0eca5e78db28f88f78032a10067b8&code=306f962434700f1503a4478f7971af0f0f54e1f7&grant_type=authorization_code

refreshToken = "c6d059e946455c72bfdaa2a4f78e8172c7a200a5";

let stravaId = "";
let randomRoute = [];
let routeId = "";
let time = "";
let userId = localStorage.getItem('id');
let username = localStorage.getItem('username');
let password = localStorage.getItem('username');

window.onload = function(){
    document.getElementById('map').style.display = "none";
    inputs();
};

async function getRoutes(data){
    //fetch routes
    let response = await fetch(`https://www.strava.com/api/v3/athletes/${stravaId}/routes?access_token=${data.access_token}`);
    return await response.json()
    .then(data => {
        getRandomRoute(data);
    });
};

function getNewAccessToken(){
    //Access Token expires so needs to be refreched by using the refresh token. 
    //code from postman
    var myHeaders = new Headers();
    myHeaders.append("Cookie", "_strava4_session=mp0pj628d3j9937dl8jpvfh0lrnbg0b1");

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    redirect: 'follow'
    };

    temp = "";

    fetch("https://www.strava.com/oauth/token?client_id=41469&client_secret=0743f07f60f0eca5e78db28f88f78032a10067b8&refresh_token=c6d059e946455c72bfdaa2a4f78e8172c7a200a5 &grant_type=refresh_token", requestOptions)
    .then(response => response.json())
    .then(data => getRoutes(data))
    .catch(error => console.log('error', error));
};

function leafletMap(){
    
    document.getElementById('map').style.display = "block";
    document.getElementById('pageDiv').style.display = "none";

    //code from leafletjs.com
    //creates map
    let map = L.map('map').setView([50.7889886,4.168973,11], 10);
    //uses mapbox
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/dark-v10',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1Ijoicm9iYm9zbWFucyIsImEiOiJja3dnampsMnkwcDluMm9wbWp6YW94M2dmIn0.YNnModWsj0A6qUNYPPUj9Q'
    }).addTo(map);

    let coordinates = L.Polyline.fromEncoded(randomRoute.map.summary_polyline).getLatLngs()
    //draws line on map
    L.polyline(coordinates,
        {
            color: "#FC5200",
            weight: 2,
            lineJoin: "round"
        }).addTo(map);
    //Save route id
    routeId = randomRoute.id_str;
    window.localStorage.setItem("routeId", routeId);
    //Seconds to hours and minutes
    time = randomRoute.estimated_moving_time;
    //route info
    document.getElementById('map').insertAdjacentHTML('beforebegin', 
        `
        <div id="column1">
            <div id="routeInfo">
                <h1>Route:</h1>
                <ul>
                    <li>${randomRoute.name}</li>
                    <li id="inlineLi"><i class="fas fa-ruler-horizontal"></i> ${Math.round((randomRoute.distance)/1000)}km</li>
                    <li id="inlineLi"><i class="fas fa-mountain"></i> ${Math.round(randomRoute.elevation_gain)}m</li>
                    <li id="inlineLi"><i class="fas fa-clock"></i> ${secondsToHms()}</li>
                </ul>
                <div id="selectRoute">
                    <button class="button">Select route</button>
                </div>
                <button class="button" id="anotherRouteButton"><i class="fas fa-random"></i></button>
            </div>
        </div>
        `
    );
    //get another random route
    document.getElementById('routeInfo').addEventListener('click', e =>{
        e.preventDefault();
        map.remove();
        document.getElementById('selectRoute').remove();
        document.getElementById('routeInfo').remove();
        document.getElementById('column1').remove();
        getNewAccessToken();
    });
    //save route
    document.getElementById('selectRoute').addEventListener('click', e =>{
        e.preventDefault();
        saveRoute();
    });
};

function inputs(){
    document.getElementById('mainForm').addEventListener('submit', e => {
        e.preventDefault();

        stravaId = document.getElementById('stravaId').value;
        if(stravaId == 0){
            document.getElementById('message').insertAdjacentHTML("beforebegin",
                "<p>Wrong strava ID</p>"
            );
        }else{
            getNewAccessToken();
        }
    });
}

function getRandomRoute(data){
    randomRoute = data[Math.floor(Math.random() * 30)];
    leafletMap();
}

function anotherRandomRoute(){
    document.getElementById('routeInfo').addEventListener('click', e =>{
        e.preventDefault();
        location.reload();
    });
}

async function saveRoute(){
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
    "name": username,
    "password": password,
    "routes": routeId
    });

    var requestOptions = {
    method: 'PUT',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    fetch(`https://stravaroutesapp.herokuapp.com/login/${userId}`, requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error))
    .then(document.location.href = "http://127.0.0.1:5500/src/end.html");
}

function secondsToHms() {
    var h = Math.floor(time / 3600);
    var m = Math.floor(time % 3600 / 60);

    var hDisplay = h + "h ";
    var mDisplay = m + "m ";
    return hDisplay + mDisplay; 
}