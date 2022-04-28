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
const esconderFiltro = document.getElementById("esconder-filtro");
const verFiltro = document.getElementById("ver-filtro");
const btnFiltro = document.getElementById("filtro-btn");

function filterCarnivoro() {
    console.log("Filtro")
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

function filterHerbivoro() {
    
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
function filterOnivoro() {
    
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
function filterPromocao() {
   
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
