let username = "";
let password = "";

window.onload = function(){
    loginInputs();
};

function checkInputs(data){
    for(let i of data){
        if(username == i.name){
            
            if (password == i.password){
                console.log("correct");
                document.location.href = "http://127.0.0.1:5500/docs/index.html";
            } else{
                console.log("wrong password");
                document.getElementById('message').insertAdjacentHTML("beforebegin",
                    "<p>Password is incorrect</p>"
                );
            };
        } else{
            console.log("wrong username");
            document.getElementById('message').insertAdjacentHTML("beforebegin",
                    "<p>Name is incorrect</p>"
                );
        };
    };
    
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