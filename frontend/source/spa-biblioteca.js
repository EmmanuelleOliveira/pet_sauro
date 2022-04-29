let page = null;

class BaseController {
  onLoad() {

  }

  onDestroy() {

  }
}

let controller = new BaseController();

let spaCurrentData = undefined

function sendData(data) {
  spaCurrentData = data
}

function navigate(url) {
  // const fragments = url.split("/"); // ["", "produtos", ":0"]
  // const params = [];
  // const output = fragments.map((x) => {
  //   if (x[0] === ":") {
  //     params.push(x.slice(1)); // ":220" => "220"
  //     return "$";
  //   } else {
  //     return x;
  //   }
  // });
  // url = output.join("/");
  // if (page !== null) {
  //   document.querySelector(`[data-page="${page}"]`).style.display = "none";
  // }
  // page = url;
  // document.querySelector(`[data-page="${page}"]`).style.display = "block";

  // if (typeof onPageLoad[url] === "function") {
  //   onPageLoad[url](...params);
  // }

  controller.onDestroy();
  controller = new BaseController();
  $("#spa-page-container").load(`/views/${url}/index.html`);
}

function declareController(ControllerClass) {
  controller = new ControllerClass();
  controller.onLoad(spaCurrentData);
  spaCurrentData = undefined;
}

document.body.addEventListener("click", (e) => {
  const link = e.target.closest("[data-link]");
  if (link !== null) {
    e.preventDefault();
    navigate(link.attributes.href.value);
  }
});

// const header = `
// <main>
//     <div class="header-1">
//         <div class="logo">
//           <a href="">
//             <img src="./assets/images/logo.png" width="65px" height="65px" alt=""/>
//           </a>
//         </div>
//           <img id="logo-name" src="./assets/images/petsauro80 1.png" width="50px" height="50px" alt=""/>
//         <div class="cadastro-login">
//             <ul>
//                 <li>
//                     <a href="/cadastro" class="nav__link" data-link>
//                         <img src="./assets/images/pessoa.png" />
//                     </a>
//                 </li>
//                 <li>
//                     <span>Olá, </span><span id="cadastro"><a href="/cadastro" class="nav__link" data-link>Fulano</a></span>
//                     <span id="sair">| <a href="http://www.google.com/search"><span id="cadastro">Sair</span></a></span><br/>
//                     <p><span id="acompanhar"><a href="/acompanhar">Pedido</a></span></p>
//                 </li>
//                 <li>                        
//                     <a href="/carrinho" class="nav__link" data-link>
//                         <img src="./assets/images/carrinho.png" />
//                     </a>
//                     <a href="/pedido" class="nav__link" data-link>
//                       <span id="pedido">0</span>
//                     </a>                          
//                 </li>
//             </ul>
//         </div>
//     </div>
// </main>`

// document.querySelector(".menu-principal").innerHTML = header;

// function renderHomePage() {
//   document.querySelector("body").innerHTML =
//     `
//       ${header}
//     `;
// }