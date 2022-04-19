let page = null;

console.log("OK")

const onPageLoad = {};

function navigate(url) {
  const fragments = url.split("/"); // ["", "produtos", ":0"]
  const params = [];
  const output = fragments.map((x) => {
    if (x[0] === ":") {
      params.push(x.slice(1)); // ":220" => "220"
      return "$";
    } else {
      return x;
    }
  });
  url = output.join("/");
  if (page !== null) {
    document.querySelector(`[data-page="${page}"]`).style.display = "none";
  }
  page = url;
  document.querySelector(`[data-page="${page}"]`).style.display = "block";

  if (typeof onPageLoad[url] === "function") {
    onPageLoad[url](...params);
  }
}

document.body.addEventListener("click", (e) => {
  if (e.target.matches("[data-link]")) {
    e.preventDefault();
    navigate(e.target.attributes.href.value);
  }
});

//----CARROSSEL ----//
const imagesCarrossel = document.getElementById("img-carrossel");
const imgCarrossel = document.querySelectorAll("#img-carrossel img");

let idInit = 0;
function carrossel() {
    idInit++;
    if(idInit > imgCarrossel.length - 1) {
        idInit = 0;
    }
    imagesCarrossel.style.transform = `translateX(${-idInit * 1130}px)`;
}
setInterval(carrossel, 1900);

