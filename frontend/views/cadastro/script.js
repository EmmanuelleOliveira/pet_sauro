/* declareController(class {
    onLoad() {
        console.log("entrando na página de cadastro")
    }

    onDestroy() {
        console.log("saindo da página de cadastro")
    }

    cadastrarUser(event) {
        event.preventDefault();
        // <input id="pet-name" type="text">
        // <input id="pet-image-url" type="text"></input>

        const name = document.getElementById("name").value;
        const cpf = document.getElementById("cpf").value;
        const email = document.getElementById("email").value;
        const senha = document.getElementById("password").value;

        console.log({ name, cpf, email, senha });
        
        // name.innerHTML = "#nome-cadastro"

        fetch("/cadastrar-user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, cpf, email, senha }),
        });
    }
}) */
const url = "http://localhost:2000";

function registerUser() {
    const name = document.getElementById("name").value;
    const cpf = document.getElementById("cpf").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const secondPassword = document.getElementById("secondPassword").value;
    console.log(password)
    console.log(secondPassword)
    if (secondPassword === password){
        document.getElementById("differentPasswords").innerHTML = ""
        fetch(`${url}/clients`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': "http://localhost:8080",
                'Access-Control-Allow-Credentials': true
            },
            credentials: "include",
            body: JSON.stringify({
                name: name,
                cpf: cpf,
                email: email,
                password: password
            }) 
        })
        .then(function (response) {
            console.log("Chegou aqui primeiro then")
            if (response.status !== 200) {
                console.log("Verificar problema. STATUS:" + response.status);
                response.text().then(function (data) {
                    console.log(data);
                });
            }
            response.json().then(function (data) {
            console.log(data);
            });
        })
        .catch(function (err) {
            console.log("Verificar ERRO:" + err);
        });
    } else {
        document.getElementById("differentPasswords").innerHTML = "As senhas não correspondem"
    }
}
        