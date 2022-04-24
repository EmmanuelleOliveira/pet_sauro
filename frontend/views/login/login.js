const url = "http://localhost:2000";

///-----VISIBILIDADE DA SENHA----\\\
console.log("Login.js");
function mouseoverPass(senha) {
  var senha = document.getElementById("myPassword");
  senha.type = "text";
}
function mouseoutPass(senha) {
  var senha = document.getElementById("myPassword");
  senha.type = "password";
}

console.log();

/////------VALIDANDO LOGIN-------\\\\\\

function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  //-----Validação-----\\
  fetch(`${url}/loginclients`, {
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
        console.log("Chegou aqui primeiro then")
      if (response.status !== 200) {
        console.log("Verificar problema. STATUS:" + response.status);

        // if (response.status === 400) {
        //     fetch(`${url}/loginclients`, {
        //         method: "POST",
        //         headers: {
        //             "Content-Type": "application/json",
        //         },
        //         body: JSON.stringify ({
        //           email: email,
        //           password: password
        //         })
        //     }) 
        //     .then(function (response) {
        //       if (response.status !== 200) {
        //         console.log("Verificar problema. STATUS:" + response.status);
        //         return
        //       }
        //       response.json().then(function (data) {
        //         console.log(data);
        //       });
        //     })
        //     .catch(function (err) {
        //       console.log("Verificar ERRO:" + err);
        //     });
        //     return
        // }
      }
      response.json().then(function (data) {
        console.log(data);
      });
    })
    .catch(function (err) {
      console.log("Verificar ERRO:" + err);
    });
}
