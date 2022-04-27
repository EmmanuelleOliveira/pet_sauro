function filterCarnivoro() {
  let esconderFiltro = document.getElementById("esconder-filtro");
  // const verFiltro = document.getElementById("ver-filtro");
  let btnFiltro = document.getElementById("filtro-btn");
  console.log("Filtro");
  if (
    esconderFiltro.style.display === "none" ||
    esconderFiltro.style.display === ""
  ) {
    esconderFiltro.style.display = "inline";
    // verFiltro.style.display = "none";
    btnFiltro.innerHTML = "Esconder Filtro";
  } else {
    esconderFiltro.style.display = "none";
    // verFiltro.style.display = "inline";
    btnFiltro.innerHTML = "Ver Filtro";
  }
}
