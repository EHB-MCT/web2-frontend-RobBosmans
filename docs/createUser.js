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

/***/ "./src/createUser.js":
/*!***************************!*\
  !*** ./src/createUser.js ***!
  \***************************/
/***/ (() => {

eval("let username = \"\";\nlet password = \"\";\n\nwindow.onload = function(){\n    loginInputs();\n};\n\nfunction loginInputs(){\n    document.getElementById('createUserForm').addEventListener('submit', event => {\n        event.preventDefault();\n\n        username = document.getElementById('username').value;\n        password = document.getElementById('password').value;\n\n        saveUser();\n    });\n}\n\nasync function saveUser(){\n    let myHeaders = new Headers();\n    myHeaders.append(\"Content-Type\", \"application/json\");\n\n    let raw = JSON.stringify({\n    \"name\": username,\n    \"password\": password\n    });\n\n    let requestOptions = {\n    method: 'POST',\n    headers: myHeaders,\n    body: raw,\n    redirect: 'follow'\n    };\n\n    fetch(\"https://stravaroutesapp.herokuapp.com/login\", requestOptions)\n    .then(response => response.text())\n    .then(result => console.log(result))\n    .catch(error => console.log('error', error))\n    .then(document.location.href = \"http://127.0.0.1:5500/docs/index.html\");\n}\n\n\n//# sourceURL=webpack://web2-frontend-robbosmans/./src/createUser.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/createUser.js"]();
/******/ 	
/******/ })()
;