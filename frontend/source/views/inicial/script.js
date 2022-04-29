declareController(class {

  #timer;

  onLoad(data) {
    // data === undefined ou data === {algum usuário aqui}
    // se data não for undefined ({.name .admin}), mudar o header
    this.checkCar();

    let slideIndex = 0;

    const showSlides = () => {
      console.log("atualizando carrossel");
      let i;
      let slides = document.getElementsByClassName("mySlides");
      for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
      }
      slideIndex++;
      if (slideIndex > slides.length) { slideIndex = 1 }
      slides[slideIndex - 1].style.display = "block";
      this.#timer = setTimeout(showSlides, 4000);
    }

    showSlides();

    this.url = "http://localhost:8000";

    fetch(`${this.url}/pets`, {
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
      console.log(promo_verify);
      let category = "";
      if (category_id === 1) {
        category = "Carnívoro";
      } else if (category_id === 2) {
        category = "Herbívoro";
      } else {
        category = "Onívoro";
      }
      if (promo_verify === true) {
        container.innerHTML +=
          `<div class="card" title="Mais Detalhes">
      <a href="/detalhe-produto" class="nav__link" data-link onclick="controller.sendPetData(${id}, '${name}', ${price_promo}, '${description}', ${weight}, ${height})">
      <img class="img-pet" src="${url_image}"  alt=""/>
      <div class="informations-card">
        <h3 class="name-pet">${name}</h3>
        <h4 class="category-pet">${category}</h4>
        <h4 class="price-pet-old"><span>R$</span>${price}</h4>
        <h4 class="price-pet"><span>R$ </span>${price_promo}</h4>
      </div>
      </a>
      <button type="button" class="btn-buy" onclick="controller.addCar(${id}, '${name}', ${price_promo}, '${description}', ${weight}, ${height})">Comprar</button>
  </div>`;
      } else {
        container.innerHTML +=
          `<div class="card" title="Mais Detalhes">
      <a href="/detalhe-produto" class="nav__link" data-link onclick="controller.sendPetData(${id}, '${name}', ${price}, '${description}', ${weight}, ${height})">
        <img class="img-pet" src="${url_image}"  alt=""/>
        <div class="informations-card">
          <h3 class="name-pet">${name}</h3>
          <h4 class="category-pet">${category}</h4>
          <h4 class="price-pet-no-promo"><span>R$ </span>${price}</h4>
        </div>
      </a>
      <button type="button" class="btn-buy" onclick="controller.addCar(${id}, '${name}', ${price}, '${description}', ${weight}, ${height})">Comprar</button>
  </div>`;
      }
    }

    function renderCards(pets) {
      const container = document.querySelector("#products");
      for (let i = 0; i < pets.length; i++) {
        renderCardItem(pets[i], container);
      }
    }

    this.modalName = document.getElementById("modal-pet-name");
    this.modalPrice = document.getElementById("modal-pet-price");
    this.modalQuantity = document.getElementById("modal-quantity");
    this.modalTotal = document.getElementById("modal-pet-total");
    this.modalDescription = document.getElementById("modal-description");
    this.modalWeight = document.getElementById("modal-weight");
    this.modalHeight = document.getElementById("modal-height");
    this.modalQuantity.addEventListener('input', () => {
      const pricePet = Number(this.priceHidden.value);
      const quantityPet = Number(this.modalQuantity.value);
      this.modalTotal.innerHTML = `Total: R$ ${pricePet * quantityPet}`;
    })

    this.petIdHidden = document.getElementById("pet-id");
    this.priceHidden = document.getElementById("price-hidden");
    this.modal = document.getElementById("modal-test");
    this.tableItens = document.getElementById("table-itens");
    this.modalBuy = document.getElementById("modal-buy");
    this.modalPayment = document.getElementById("quantity-select");

    document.getElementById("payment-select").addEventListener("change", () => {
      let optionChoosed = Number(document.getElementById("payment-select").value);
      if (optionChoosed === 0) {
        document.getElementById("error-message").textContent = "Escolha uma forma de pagamento";
      } else {
        document.getElementById("error-message").textContent = "";
      }
      this.optionsPayments()
    })
  }

  onDestroy() {
    clearTimeout(this.#timer);
  }

  addCar(petId, petName, petPrice, petDescription, petWeight, petHeight) {
    this.modal.style.display = "flex";
    this.modalName.innerHTML = `Pet selecionado: ${petName}`;
    this.modalPrice.innerHTML = `Preço unitário: R$ ${petPrice}`;
    this.modalDescription.innerHTML = `${petDescription}`;
    this.modalWeight.innerHTML = `Peso: ${petWeight} Kg`;
    this.modalHeight.innerHTML = `Altura: ${petHeight} metros`;
    this.petIdHidden.value = petId;
    this.priceHidden.value = petPrice;
  }

  sendPetData(petId, petName, petPrice, petDescription, petWeight, petHeight) {
    sendData({ petId, petName, petPrice, petDescription, petWeight, petHeight })
  }

  cancelPet() {
    this.modal.style.display = "none";
  }

  addPet() {
    const pricePet = Number(this.priceHidden.value);
    const quantityPet = this.modalQuantity.value;
    const petId = Number(this.petIdHidden.value);
    const quantityFormat = /^(\+?[1-9]\d*)$/;
    const namePetCar = (this.modalName.innerHTML).split(': ');
    if (quantityFormat.test(quantityPet)) {
      const carItem = {
        "pet_id": petId,
        "name": namePetCar[1],
        "quantity": quantityPet,
        "price": pricePet
      }
      let carLocalStorage = this.getCar();
      carLocalStorage.push(carItem);
      this.setCar(carLocalStorage);
      this.modal.style.display = "none";
      this.checkCar();
    } else {
      alert("Formato do campo de quantidade está incorreto");
    }
  }

  checkCar() {
    const shoppingCart = this.getCar();
    if (shoppingCart.length === 0) {
      document.getElementById("number-itens").innerHTML = "";
    } else {
      let quantityItensCart = this.totalItens(shoppingCart);
      document.getElementById("number-itens").innerHTML = `${quantityItensCart}`;
    }
  }


  getCar() {
    const car = localStorage.getItem('car') ? JSON.parse(localStorage.getItem('car')) : [];
    return car;
  }

  setCar(car) {
    localStorage.setItem("car", JSON.stringify(car));
  }

  clearCar() {
    localStorage.clear();
  }

  fillTable() {
    this.clearTable();
    const car = this.getCar();
    let total = 0;
    this.tableItens.innerHTML += `
      <tr>
      <th>Nome</th>
      <th>Quantidade</th>
      <th>Preço</th>
      <th>Total</th>
      <th>Remover</th>
      </tr>`;
    this.tableItens.innerHTML += car.map((item, index) => {
      total = total + (item.price * item.quantity);
      return `
        <tr>
        <td>${item.name}</td>
        <td>${item.quantity}</td>
        <td>R$ ${item.price}</td>
        <td>R$ ${item.quantity * item.price}</td>
        <td><button type="button" class="btn-remove-itens" onclick='controller.removeItemCar(${index})'><img class="remove" src = "./assets/images/remove.png" alt = ""></button></td>
        </tr>
        `
    }).join("");
    document.getElementById("total").innerHTML = `Total da compra: R$ ${total}`;
  }

  removeItemCar(index) {
    const car = this.getCar();
    car.splice(index, 1);
    this.setCar(car);
    this.fillTable();
    this.checkCar();
  }

  clearTable() {
    this.tableItens.innerHTML = "";
  }

  showShopCart() {
    this.modalBuy.style.display = "flex";
    this.fillTable();
    this.optionsPayments();
  }

  cancelBuy() {
    this.modalBuy.style.display = "none";
  }

  totalSales(itens) {
    let value = 0;
    for (let i = 0; i < itens.length; i++) {
      value += (itens[i].price * itens[i].quantity);
    }
    return value;
  }

  totalItens(itens){
    let quantityItens = 0;
    for (let i = 0; i < itens.length; i++) {
      quantityItens += Number(itens[i].quantity);
    }
    return quantityItens;
  }

  addBuy() {
    const modalPaymentSelect = document.getElementById("payment-select");
    const car = this.getCar();
    const total = this.totalSales(car);
    const debts = [];
    switch (Number(modalPaymentSelect.value)) {
      case 0:
        document.getElementById("error-message").innerText = "Escolha uma forma de pagamento";
        return;
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
        console.log("ATENÇÃO", this.modalPayment.value)
        for (let i = 0; i < Number(this.modalPayment.value); i++) {
          debts.push({
            "value": total / Number(this.modalPayment.value),
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
          "pet_id": item.pet_id
        }
      }),
      "debts": debts
    }
    const user = localStorage.getItem("user")
    if (!user) {
      document.getElementById("error-message").innerText = "Você precisa fazer o login para finalizar a compra";
      return;
    }
    this.clearCar();
    this.checkCar();
    this.cancelBuy();
    fetch(`${this.url}/sales`, {
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
      .then((response) => {
        if (response.status !== 200) {
          console.log("Verificar problema. STATUS:" + response.status);
          response.text().then((data) => {
            document.getElementById("incorrect-data").innerHTML = `${data}`;
          });
        }
        else {
          response.json().then((data) => { //colocar no console que o cliente tá logado
            console.log("Chegou aqui - 38")
            //alert("Compra registrada")
            document.getElementById("modal-buy-finished").style.display = "flex";
          });
        }
      })
      .catch(function (err) {
        console.log("Verificar ERRO:" + err);
      });

  }

  backNavigate(){
    document.getElementById("modal-buy-finished").style.display = "none";
  }

  optionsPayments() {
    let optionChoosed = Number(document.getElementById("payment-select").value);
    if (optionChoosed === 3) {
      this.modalPayment.style.display = "flex";
    } else {
      this.modalPayment.style.display = "none";
    }
  }

})

