refreshToken="c6d059e946455c72bfdaa2a4f78e8172c7a200a5",window.onload=function(){document.getElementById("mainForm").addEventListener("submit",(e=>{e.preventDefault();let t=document.getElementById("stravaId").value,a=document.getElementById("distanceOptions").value,o=document.getElementById("elevationOptions").value;var n;console.log(t,a,o),(n=new Headers).append("Cookie","_strava4_session=mp0pj628d3j9937dl8jpvfh0lrnbg0b1"),temp="",fetch("https://www.strava.com/oauth/token?client_id=41469&client_secret=0743f07f60f0eca5e78db28f88f78032a10067b8&refresh_token=c6d059e946455c72bfdaa2a4f78e8172c7a200a5 &grant_type=refresh_token",{method:"POST",headers:n,redirect:"follow"}).then((e=>e.json())).then((e=>async function(e){let t=await fetch(`https://www.strava.com/api/v3/athletes/15412454/routes?access_token=${e.access_token}`);return await t.json().then((e=>{!function(e){let t=L.map("map").setView([50.7889886,4.168973,11],11);L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",{attribution:'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',maxZoom:18,id:"mapbox/dark-v10",tileSize:512,zoomOffset:-1,accessToken:"pk.eyJ1Ijoicm9iYm9zbWFucyIsImEiOiJja3dnampsMnkwcDluMm9wbWp6YW94M2dmIn0.YNnModWsj0A6qUNYPPUj9Q"}).addTo(t);for(let a=0;a<5;a++){let o=L.Polyline.fromEncoded(e[a].map.summary_polyline).getLatLngs();console.log(o),L.polyline(o,{color:"#FC5200",weight:2,lineJoin:"round"}).addTo(t)}}(e)}))}(e))).catch((e=>console.log("error",e)))}))};