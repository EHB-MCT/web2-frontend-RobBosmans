let username = "";
let password = "";

window.onload = function(){
    loginInputs();
};

function loginInputs(){
    document.getElementById('createUserForm').addEventListener('submit', event => {
        event.preventDefault();

        username = document.getElementById('username').value;
        password = document.getElementById('password').value;

        saveUser();
        window.localStorage.setItem("username", username);
        window.localStorage.setItem("password", password);
        document.location.href = "http://127.0.0.1:5500/src/main.html";
    });
}

async function getUser(){
    let response = await fetch(`https://stravaroutesapp.herokuapp.com/login`);
    return await response.json()
    .then(data => {
        checkInputs(data);
    });
};

async function saveUser(){
    //code from postman
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify({
    "name": username,
    "password": password
    });

    let requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    fetch("https://stravaroutesapp.herokuapp.com/login", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}
