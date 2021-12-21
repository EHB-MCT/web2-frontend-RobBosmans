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

/***/ "./src/login.js":
/*!**********************!*\
  !*** ./src/login.js ***!
  \**********************/
/***/ (() => {

eval("let username = \"\";\nlet password = \"\";\nlet id = \"\";\n\nwindow.onload = function(){\n    loginInputs();\n};\n\nfunction checkInputs(data){\n    for(let i of data){\n        if(username == i.name){\n            \n            if (password == i.password){\n                id = i._id;\n                console.log(\"id\", id)\n                console.log(\"correct\");\n                window.localStorage.setItem(\"id\", id);\n                window.location.href = \"docs/main.html\";\n                \n            } else{\n                console.log(\"wrong password\");\n                document.getElementById('message').insertAdjacentHTML(\"beforebegin\",\n                    \"<p>Password is incorrect</p>\"\n                    \n                );\n            };\n        } else{\n            console.log(\"wrong username\");\n            document.getElementById('message').insertAdjacentHTML(\"beforebegin\",\n                    \"<p>Name is incorrect</p>\"\n                );\n        };\n    };\n    \n};\n\nfunction loginInputs(){\n    document.getElementById('loginForm').addEventListener('submit', event => {\n        event.preventDefault();\n\n        username = document.getElementById('username').value;\n        password = document.getElementById('password').value;\n        getUser();\n\n        window.localStorage.setItem(\"username\", username);\n        window.localStorage.setItem(\"password\", password);\n    });\n}\n\nasync function getUser(){\n    let response = await fetch(`https://stravaroutesapp.herokuapp.com/login`);\n    return await response.json()\n    .then(data => {\n        checkInputs(data);\n    });\n};\n\n//# sourceURL=webpack://web2-frontend-robbosmans/./src/login.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/login.js"]();
/******/ 	
/******/ })()
;