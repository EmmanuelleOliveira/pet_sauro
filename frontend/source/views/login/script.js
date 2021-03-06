declareController(class {

  url = "http://localhost:8000";

  onLoad() {
    
    document.getElementById('show-hide-password').addEventListener('mousedown', function () {
      document.getElementById('show-hide-password').innerHTML = "OCULTAR";
      document.getElementById('password').type = 'text';
    });

    document.getElementById('show-hide-password').addEventListener('mouseup', function () {
      document.getElementById('show-hide-password').innerHTML = "MOSTRAR";
      document.getElementById('password').type = 'password';
    });

  }

  onDestroy() {

  }

   login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const emailFormat = /^(\s?[^\s,]+@[^\s,]+\.[^\s,]+\s?,)*(\s?[^\s,]+@[^\s,]+\.[^\s,]+)$/;
    const passwordFormat = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{6,20}$/;
    const usernameFormat = /^(?=[a-zA-Z0-9._]{4,100}$)(?!.*[_.]{2})[^_.].*[^_.]$/;
    let testEmail = emailFormat.test(email);
    let testPassword = passwordFormat.test(password);
    let testUsername = usernameFormat.test(email);
    console.log(testUsername, testPassword, testEmail)
    if ((testEmail === true && testPassword === true) || (testUsername === true && testPassword === true)) {
      document.getElementById("incorrect-data").innerHTML = "";
      fetch(`${this.url}/login`, {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': "http://localhost:8080",
          'Access-Control-Allow-Credentials': true
        },
        credentials: "include",
        body: JSON.stringify({
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
          response.json().then(function (data) { //colocar no console que o cliente t?? logado
            console.log(data); //{admin : true|false, name: <string>}
            // localStorage user: data
            localStorage.setItem("user", JSON.stringify(data));
            if (data.admin === true) {
              navigate("/cadastro-pets");
            } else {
              navigate("/inicial");
            }
          });
        })
        .catch(function (err) {
          console.log("Verificar ERRO:" + err);
        });
    } else {
      document.getElementById("incorrect-data").innerHTML = "*Email e/ou senha incorreto, verifique se sua senha apresenta de 6 a 20 caracteres, contendo no m??nimo 1 n??mero, 1 letra mai??scula e 1 min??scula";
    };
  }
})