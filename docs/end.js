/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/end.js":
/*!********************!*\
  !*** ./src/end.js ***!
  \********************/
/***/ (() => {

eval("let lat = \"\";\nlet lon = \"\";\nlet routeId = localStorage.getItem('routeId');\nlet deg = \"\";\n\nwindow.onload = function(){\n    document.getElementById('endscreen').style.display = \"none\";\n\n    getLocation();\n    logout();\n};\nfunction logout(){\n    document.getElementById('logout').addEventListener('click', event => {\n        event.preventDefault();\n        window.localStorage.clear();\n        document.location.href = \"index.html\";\n    });\n}\n\nasync function weather(){\n    let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=6ff6455d459b79d14f52d648b450aefa&units=metric\n    `);\n    return await response.json()\n    .then(data => {\n        displayWeather(data);\n    });\n};\n\nfunction displayWeather(data){\n    document.getElementById('endscreen').style.display = \"block\";\n    document.getElementById('loading').style.display = \"none\";\n    console.log(data);\n    deg = data.wind.deg\n    document.getElementById(\"weather\").insertAdjacentHTML(\"afterend\",\n        `<div id=\"weatherInfo\">\n                <h2>Weather:</h2>\n            <div id=\"inline\">\n                <img src=\"https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png\" alt=\"\" srcset=\"\">\n                <ul>\n                    <li>${data.weather[0].main}</li>\n                    <li><i class=\"fas fa-thermometer-half\"></i> ${Math.round(data.main.temp)}°C</li>\n                    <li><i class=\"fas fa-wind\"></i> ${Math.round((data.wind.speed)*3.6)}km/h ${degreeToText()}</li>\n                </ul>\n            </div>\n        </div>\n        <div id=\"download\">\n            <button class=\"button\" id=\"downloadButton\"><i class=\"fas fa-download\"></i> route.gpx</button>\n        </div>\n        `\n    );\n    document.getElementById('download').addEventListener('click', e =>{\n        e.preventDefault();\n        document.location.href = `https://www.strava.com/routes/${routeId}/export_gpx`;\n    });\n}\n\nfunction getLocation() {\n    navigator.geolocation.getCurrentPosition(showPosition);\n}\n\nfunction showPosition(position) {\n  lat = Math.round(position.coords.latitude);\n  lon = Math.round(position.coords.longitude);\n  weather();\n}\n\nfunction  degreeToText(degree){\n    if (degree>337.5) return 'North';\n    if (degree>292.5) return 'North West';\n    if(degree>247.5) return 'West';\n    if(degree>202.5) return 'South West';\n    if(degree>157.5) return 'South';\n    if(degree>122.5) return 'South East';\n    if(degree>67.5) return 'East';\n    if(degree>22.5){return 'North East';}\n    return 'North';\n}\n\n//https://www.strava.com/routes/2904695789570291470/export_gpx\n\n//# sourceURL=webpack://web2-frontend-robbosmans/./src/end.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/end.js"]();
/******/ 	
/******/ })()
;