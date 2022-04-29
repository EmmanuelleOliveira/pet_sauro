const url = "http://localhost:8000";

function mask(i) {
    var v = i.value;
    if (isNaN(v[v.length - 1])) { // impede entrar outro caractere que não seja número
        i.value = v.substring(0, v.length - 1);
        return;
    }
    i.setAttribute("maxlength", "14");
    if (v.length == 3 || v.length == 7) i.value += ".";
    if (v.length == 11) i.value += "-";
}

function registerUser() {
    const name = document.getElementById("name").value;
    const cpfMask = document.getElementById("cpf").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const secondPassword = document.getElementById("second-password").value;
    const cpfRegex = /\d/g;
    const cpf = cpfMask.match(cpfRegex).join("");
    const nameFormat = /^(?![ ])(?!.*[ ]{2})((?:e|da|do|das|dos|de|d'|D'|la|las|el|los)\s*?|(?:[A-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð'][^\s]*\s*?)(?!.*[ ]$))+$/;
    const cpfFormat = /\d{11}/;
    const emailFormat = /^(\s?[^\s,]+@[^\s,]+\.[^\s,]+\s?,)*(\s?[^\s,]+@[^\s,]+\.[^\s,]+)$/;
    const passwordFormat = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{6,20}$/;
    let testName = nameFormat.test(name);
    let testCpf = cpfFormat.test(cpf);
    let testEmail = emailFormat.test(email);
    let testPassword = passwordFormat.test(password);
    if (secondPassword === password) {
        if (testName === true && testCpf === true && testEmail === true && testPassword === true) {
            document.getElementById("incorrect-data").innerHTML = "";
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
                    if (response.status !== 200) {
                        console.log("Verificar problema. STATUS:" + response.status);
                        response.text().then(function (data) {
                            document.getElementById("incorrect-data").innerHTML = `${data}`;
                        });
                    }
                    else {
                        response.json().then(function (data) {
                            document.getElementById("btn-register").style.display = "none";
                            document.getElementById("btn-login").style.display = "block";
                            console.log(data);
                        });
                    }
                })
                .catch(function (err) {
                    console.log("Verificar ERRO:" + err);
                });
        } else {
            document.getElementById("incorrect-data").innerHTML = "Dados inseridos incorretamente";
        }
    } else {
        document.getElementById("incorrect-data").innerHTML = "As senhas não correspondem";
    }
}
