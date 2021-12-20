// https://www.strava.com/oauth/token?client_id=41469&client_secret=0743f07f60f0eca5e78db28f88f78032a10067b8&code=306f962434700f1503a4478f7971af0f0f54e1f7&grant_type=authorization_code

refreshToken = "c6d059e946455c72bfdaa2a4f78e8172c7a200a5";

let stravaId = "";
let randomRoute = [];

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
    
    document.getElementById('form').style.display = "none";
    document.getElementById('map').style.display = "block";

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

    //uses openstreetmap (backup)
    /* L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map); */

    let coordinates = L.Polyline.fromEncoded(randomRoute.map.summary_polyline).getLatLngs()
    //console.log(coordinates);

    L.polyline(coordinates,
        {
            color: "#FC5200",
            weight: 2,
            lineJoin: "round"
        }).addTo(map);

    document.getElementById('map').insertAdjacentHTML('afterend', 
        `<div id="routeInfo">
            <ul>
                <li>${randomRoute.name}</li>
                <li>${Math.round((randomRoute.distance)/1000)}km</li>
                <li>${Math.round(randomRoute.elevation_gain)}m</li>
            </ul>
            <button class="button" id="anotherRouteButton">Give me another one!</button>
        </div>`
    );
    document.getElementById('routeInfo').addEventListener('click', e =>{
        e.preventDefault();
        console.log("dddd")
        map.remove();
        document.getElementById('routeInfo').remove();
        getNewAccessToken();
    });
};

function getRandomRoute(data){
    randomRoute = data[Math.floor(Math.random() * 30)];
    console.log("random",randomRoute);
    leafletMap();
}

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

function anotherRandomRoute(){
    document.getElementById('routeInfo').addEventListener('click', e =>{
        e.preventDefault();
        console.log("dddd")
        location.reload();
    });
}