declareController(
    class {
      onLoad() {
        console.log("entrando na página de carnivoro");
      }
  
      onDestroy() {
        console.log("saindo da página de carnivoro");
      }
  
      filterOnivoro(event) {
        event.preventDefault();
        //----- FILTRO -------//
        function filterOnivoro() {
            let esconderFiltro = document.getElementById("esconder-filtro");
            // const verFiltro = document.getElementById("ver-filtro");
            let btnFiltro = document.getElementById("filtro-btn");
            console.log("Filtro")
            if(esconderFiltro.style.display === "none" || esconderFiltro.style.display === "") {
                esconderFiltro.style.display = "inline";
                // verFiltro.style.display = "none";
                btnFiltro.innerHTML = "Esconder Filtro";
            } else {
                esconderFiltro.style.display = "none";
                // verFiltro.style.display = "inline";
                btnFiltro.innerHTML = "Ver Filtro"
            }
        }
      }
        
      //   fetch("/cadastrar-pet", {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify({
      //       pet_category_id,
      //       pet_name,
      //       image_url,
      //       pet_weight,
      //       pet_price,
      //       pet_height,
      //       pet_created_at,
      //       pet_description,
      //       pet_promotion,
      //     }),
      //   });
      }
    
);