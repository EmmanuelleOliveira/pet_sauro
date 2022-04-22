declareController(class {
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
})
        