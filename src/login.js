let username = "";
let password = "";

window.onload = function(){
    loginInputs();
};

function checkInputs(data){
    for(let i of data){
        if(username = i.name){
            if (password = i.password){
                console.log("correct");
            } else{
                console.log("wrong password");
            }
        } else{
            console.log("wrong username");
        }
    }
    
};

function loginInputs(){
    document.getElementById('loginForm').addEventListener('submit', event => {
        event.preventDefault();

        username = document.getElementById('username').value;
        password = document.getElementById('password').value;
        getUser();
    });
}

async function getUser(){
    let response = await fetch(`https://stravaroutesapp.herokuapp.com/login`);
    return await response.json()
    .then(data => {
        checkInputs(data);
    });
};