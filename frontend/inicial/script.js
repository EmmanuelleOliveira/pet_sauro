
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