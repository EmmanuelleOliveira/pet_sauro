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


const url = "http://localhost:3000";

fetch(`${url}/pets`, {
  method: "GET",
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': "http://localhost:8080",
    'Access-Control-Allow-Credentials': true
  },
  credentials: "include",
})
  .then(function (response) {
    if (response.status !== 200) {
      console.log("Verificar problema. STATUS:" + response.status);
      response.text().then(function (data) {
        document.getElementById("incorrect-data").innerHTML = `${data}`;
      });
    }
    response.json().then(function (data) { //colocar no console que o cliente tá logado
      console.log("Chegou aqui - 38")
      renderCards(data);
    });
  })
  .catch(function (err) {
    console.log("Verificar ERRO:" + err);
  });

function renderCardItem(pet, container) {
  const {
    name, weight, 
    price, height, 
    category_id, url_image, 
    description, price_promo, 
    promo_verify, quantity, id
  } = pet;
  console.log(pet);
  let category = "";
  if (category_id === 1) {
    category = "Carnívoro";
  } else if (category_id === 2) {
    category = "Herbívoro";
  } else {
    category = "Onívoro";
  }
  container.innerHTML += 
  `<div class="catalog-page-init" title="Mais Detalhes">
    <a href="/detalhe_produto" class="nav__link" data-link>
    <div class="img-catalog-page-init">
      <img id="img-page-init" src="${url_image}"  alt=""/>
    </div>
    <div class="inform-pet-init">
      <h3 id="name-pet">${name}</h3>
      <h4 id="category-pet">${category}</h4>
      <h4 id="height-pet">${height}<span> Metros</span></h4>
      <h4 id="price-pet"><span>R$ </span>${price}</h4>
    </div>
    </a>
    <button type="button" class="btn-buy" onclick="addCar(${id}, '${name}', ${price})">Comprar</button>
</div>`;
}

function renderCards(pets) {
  const container = document.querySelector(".page-init-container");
  for (let i = 0; i < pets.length; i++) {
    renderCardItem(pets[i], container);
  }
}

const modalName = document.getElementById("modal-pet-name");
const modalPrice = document.getElementById("modal-pet-price");
const modalQuantity = document.getElementById("modal-quantity");
const modalTotal = document.getElementById("modal-pet-total");
modalQuantity.addEventListener('input', function (){
  const pricePet = Number(priceHidden.value);
  const quantityPet = Number(modalQuantity.value);
  modalTotal.innerHTML = pricePet * quantityPet;
})

const petIdHidden = document.getElementById("pet-id");
const priceHidden = document.getElementById("price-hidden");

function addCar(petId, petName, petPrice) {
  modal.style.display = "flex";
  modalName.innerHTML = petName;
  modalPrice.innerHTML = petPrice;
  petIdHidden.value = petId;
  priceHidden.value = petPrice;
}

const modal = document.getElementById("modal-test");

function cancelPet() {
  modal.style.display = "none";
}

function addPet() {
  const pricePet = Number(priceHidden.value);
  const quantityPet = modalQuantity.value;
  const petId = Number(petIdHidden.value);
  const quantityFormat = /^(\+?[1-9]\d*)$/;
  if(quantityFormat.test(quantityPet)) {
    const carItem = {
      "pet_id": petId,
      "name": modalName.innerHTML,
      "quantity":quantityPet,
      "price": pricePet
    }
    let carLocalStorage = getCar();
    carLocalStorage.push(carItem);
    setCar(carLocalStorage);
    modal.style.display = "none";
  } else {
    alert("Formato do campo de quantidade está incorreto");
  }
}

function getCar() {
  const car = localStorage.getItem('car') ? JSON.parse(localStorage.getItem('car')) : [];
  return car;
}

function setCar(car) {
  localStorage.setItem("car", JSON.stringify(car));
}

function clearCar() {
  localStorage.clear();
}

const tableItens = document.getElementById("table-itens");

function fillTable() {
  clearTable();
  const car = getCar();
  let total = 0;
  tableItens.innerHTML += `
  <tr>
  <th>Nome</th>
  <th>Quantidade</th>
  <th>Preço</th>
  <th>Total</th>
  <th>Remover</th>
  </tr>`; 
  tableItens.innerHTML += car.map((item, index) => {
    total = total + (item.price * item.quantity);
    return `
    <tr>
    <td>${item.name}</td>
    <td>${item.quantity}</td>
    <td>${item.price}</td>
    <td>${item.quantity * item.price}</td>
    <td><button type="button" class="btn-remove-itens" onclick='removeItemCar(${index})'>Remover item</button></td>
    </tr>
    `
  }).join(""); 
  document.getElementById("total").innerHTML = `${total}`;
}

function removeItemCar(index) {
  const car = getCar();
  car.splice(index,1);
  setCar(car);
  fillTable();
}

function clearTable() {
  tableItens.innerHTML = "";
}

const modalBuy = document.getElementById("modal-buy");

function showShopCart(){
  modalBuy.style.display = "flex";
  fillTable();
  optionsPayments();
}

function cancelBuy() {
  modalBuy.style.display = "none";
}

const modalPayment = document.getElementById("quantity-select");

document.getElementById("payment-select").addEventListener("change", () => {
  optionsPayments()
})

function totalSales(itens) {
  let value = 0;
  for(let i = 0; i < itens.length; i++){
    value += (itens[i].price * itens[i].quantity);
  }
  return value;
}

function addBuy() {
  const modalPaymentSelect = document.getElementById("payment-select");
  const car = getCar();
  const total = totalSales(car);
  const debts = [];
  switch (Number(modalPaymentSelect.value)){
    case 1: 
      debts.push({
        "value": total,
        "status": false,
        "due_date": "2022-05-13",
        "payment_type_id": 1
      }) 
      break;
    case 2: 
      debts.push({
        "value": total,
        "status": false,
        "due_date": "2022-05-13",
        "payment_type_id": 2
      }) 
      break;
    case 3: {
      for (let i = 0; i < Number(modalPayment.value); i++){
        debts.push({
          "value": total/Number(modalPayment.value),
          "status": false,
          "due_date": "2022-05-13",
          "payment_type_id": 3
        }) 
      }
      break;
    }
  }
  const sale = {
    "itens": car.map(item => {
      return {
        "price": item.price,
			  "quantity": item.quantity,
			  "pet_id": item.pet_id}
    }), 
    "debts": debts
  }
  clearCar();
  cancelBuy();
  fetch(`${url}/sales`, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': "http://localhost:8080",
      'Access-Control-Allow-Credentials': true
    },
    credentials: "include",
      body: JSON.stringify(sale)
  })
    .then(function (response) {
      if (response.status !== 200) {
        console.log("Verificar problema. STATUS:" + response.status);
        response.text().then(function (data) {
          document.getElementById("incorrect-data").innerHTML = `${data}`;
        });
      }
      response.json().then(function (data) { //colocar no console que o cliente tá logado
        console.log("Chegou aqui - 38")
        alert("Compra registrada")
      });
    })
    .catch(function (err) {
      console.log("Verificar ERRO:" + err);
    });
  
}

function optionsPayments() {
  let optionChoosed = Number(document.getElementById("payment-select").value);
    if (optionChoosed === 3) {
      modalPayment.style.display = "flex";
    } else {
      modalPayment.style.display = "none";
    }
}

//Fazer Validações