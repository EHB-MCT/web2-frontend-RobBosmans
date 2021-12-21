let username = "";
let password = "";
let id = "";

window.onload = function(){
    loginInputs();
};

function checkInputs(data){
    for(let i of data){
        if(username == i.name){
            
            if (password == i.password){
                id = i._id;
                console.log("id", id)
                console.log("correct");
                window.localStorage.setItem("id", id);
                window.location.href = "main.html";
                
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

        window.localStorage.setItem("username", username);
        window.localStorage.setItem("password", password);
    });
}

async function getUser(){
    let response = await fetch(`https://stravaroutesapp.herokuapp.com/login`);
    return await response.json()
    .then(data => {
        checkInputs(data);
    });
};