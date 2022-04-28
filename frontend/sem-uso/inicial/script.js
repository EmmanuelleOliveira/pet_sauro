
 //----CARROSSEL ----//
 const imagesCarrossel = document.getElementById("img-carrossel");
 const imgCarrossel = document.querySelectorAll("#img-carrossel img");

 let idInit = 0;
 function carrossel() {
     idInit++;
     if (idInit > imgCarrossel.length - 1) {
         idInit = 0;
     }
     imagesCarrossel.style.transform = `translateX(${-idInit * 1130}px)`;
 }
 setInterval(carrossel, 1900);



const inforCard = `
    <div class="catalog-page-init" title="Mais Detalhes">
        <a href="/detalhe" class="nav__link" data-link>
            <div class="img-catalog-page-init">
                <img id="${img-page-init}" src="${images/filhotes.jpg}"  alt=""/>
            </div>
            <div class="inform-pet-init">
                <h3 id="${name-pet}">TIRANOSSAURO REX</h3>
                <h4 id="${category-pet}">Carnívoro</h4>
                <h4 id="${height-pet}">8<span> Metros</span></h4>
                <h4 id="${price-pet}"><span>R$ </span>10.000</h4>
            </div>
        </a>
    </div>
`
// spa-page-container
document.querySelector(".spa-page-container").innerHTML = inforCard;

function renderHomePage() {
  document.querySelector("body").innerHTML =
    `
      ${inforCard}
    `;
}    

