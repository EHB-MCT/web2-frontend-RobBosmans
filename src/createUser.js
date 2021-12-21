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
    });
}

async function saveUser(){
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
    .catch(error => console.log('error', error))
    .then(document.location.href = "http://127.0.0.1:5500/docs/index.html");
}
