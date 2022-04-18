console.log("main.js funcionando")

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


//----- FILTRO -------//
function filterPets() {
    console.log("Filtro")
    let esconderFiltro = document.getElementById("esconder-filtro");
    let verFiltro = document.getElementById("ver-filtro");
    let btnFiltro = document.getElementById("filtro-btn");

    if(esconderFiltro.style.display === "none") {
        esconderFiltro.style.display = "inline";
        verFiltro.style.display = "none";
        btnFiltro.innerHTML = "Ver Filtro";
    } else {
        esconderFiltro.style.display = "none";
        verFiltro.style.display = "inline";
        btnFiltro.innerHTML = "Esconder Filtro"
    }
}

