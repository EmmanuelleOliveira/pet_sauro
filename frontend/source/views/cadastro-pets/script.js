declareController(class {
    onLoad() {
        $("#price-promo").hide();

        this.url = "http://localhost:8000";
        this.namePet = document.getElementById("name");
        this.weight = document.getElementById("pet-weight");
        this.height = document.getElementById("pet-height");
        this.description = document.getElementById("description");
        this.category = document.getElementById("category");
        this.quantity = document.getElementById("quantity");
        this.price = document.getElementById("price");
        this.routeImage = document.getElementById("source-image");
        this.verifyPromo = "no";
        this.pricePromo = 0.00;

        if (document.querySelector('input[name="promo"]')) { //Muda o valor de promo de acordo com o que for escolhido
            document.querySelectorAll('input[name="promo"]').forEach((elem) => {
                elem.addEventListener("change", (event) => {
                    this.verifyPromo = event.target.value;
                    if (this.verifyPromo === "yes") {
                        console.log(this.verifyPromo); //Alterei
                        $("#price-promo").show();
                    } else {
                        $("#price-promo").hide();
                    }
                });
            });
        }

    }

    onDestroy() {

    }

    registerPet() {
        console.log(this.verifyPromo)
        let nameRegister = this.namePet.value;
        let weightRegister = this.weight.value;
        let heightRegister = this.height.value;
        let descriptionRegister = this.description.value;
        let categoryRegister = Number(this.category.value);
        let quantityRegister = this.quantity.value;
        let priceRegister = this.price.value;
        let routeImageRegister = this.routeImage.value;
        /* console.log(nameRegister);
        console.log(weightRegister);
        console.log(heightRegister);
        console.log(descriptionRegister);
        console.log(categoryRegister);
        console.log(quantityRegister);
        console.log(priceRegister);
        console.log(routImageRegister);
        console.log(this.verifyPromo); */

        //Fazer verificações
        const nameFormat = /^(?![ ])(?!.*[ ]{2})((?:e|da|do|das|dos|de|d'|D'|la|las|el|los)\s*?|(?:[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð'][^\s]*\s*?)(?!.*[ ]$))+$/;
        const weightFormat = /^[+]?(\d{1,5}\.{1}\d{3})/;
        const heightFormat = /^[+]?(\d{1,2}\.{1}\d{2})/;
        const descriptionFormat = /^(?![ ])(?!.*[ ]{2})((?:e|da|do|das|dos|de|d'|D'|la|las|el|los)\s*?|(?:[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð'][^\s]*\s*?)(?!.*[ ]$))+$/;
        const quantityFormat = /^(0|\+?[1-9]\d*)$/;
        const priceFormat = /^[+]?(\d{1,8}\.{1}\d{2})/;
        const routeFormat = /^(.*\/)([^\/]*)$/;
        let testName = nameFormat.test(nameRegister);
        let testWeight = weightFormat.test(weightRegister);
        let testHeight = heightFormat.test(heightRegister);
        let testDescription = descriptionFormat.test(descriptionRegister);
        let testQuantity = quantityFormat.test(quantityRegister);
        let testPrice = priceFormat.test(priceRegister);
        let testRoute = routeFormat.test(routeImageRegister);
        let testPricePromo = false;
        if (this.verifyPromo === "yes") {
            console.log("Promo ativa")
            let pricePromoRegister = document.getElementById("price-promo").value;
            console.log(pricePromoRegister)
            testPricePromo = priceFormat.test(pricePromoRegister);
            if (testPricePromo === true) {
                this.pricePromo = pricePromoRegister;
            }
        }
        if (testName === true && testWeight === true && testHeight === true && (testDescription === true && descriptionRegister.length <= 255) && categoryRegister !== 0 && testQuantity === true && testPrice === true && testRoute === true) {
            console.log("Requisitos atendidos");
            if (this.verifyPromo === "yes") { //Produto em promoção 
                console.log("Promoção identificada");
                if (testPricePromo === true) { //Preço do produto no formato correto
                    console.log("Preço promocional no formato correto");
                    document.getElementById("incorrect-data").innerHTML = "";
                    fetch(`${this.url}/pets`, {
                        method: "POST",
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': "http://localhost:8080",
                            'Access-Control-Allow-Credentials': true
                        },
                        credentials: "include",
                        body: JSON.stringify({
                            name: nameRegister,
                            weight: weightRegister,
                            height: heightRegister,
                            price: priceRegister,
                            category_id: categoryRegister,
                            url_image: routeImageRegister,
                            description: descriptionRegister,
                            promo_verify: this.verifyPromo,
                            price_promo: this.pricePromo,
                            quantity: quantityRegister
                        })
                    })
                        .then(function (response) {
                            if (response.status !== 200) {
                                console.log("Verificar problema. STATUS:" + response.status);
                                response.text().then(function (data) {
                                    document.getElementById("incorrect-data").innerHTML = `${data}`;
                                });
                            }
                            response.json().then(function (data) {
                                console.log(data);
                                document.getElementById("incorrect-data").innerHTML = "Cadastro realizado com sucesso!"
                            });
                        })
                        .catch(function (err) {
                            console.log("Verificar ERRO:" + err);
                        });
                } else {
                    document.getElementById("incorrect-data").innerHTML = "O formato do preço promocional está errado";
                }
            } else { //Não está em promoção
                document.getElementById("incorrect-data").innerHTML = "";
                fetch(`${this.url}/pets`, {
                    method: "POST",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': "http://localhost:8080",
                        'Access-Control-Allow-Credentials': true
                    },
                    credentials: "include",
                    body: JSON.stringify({
                        name: nameRegister,
                        weight: weightRegister,
                        height: heightRegister,
                        price: priceRegister,
                        category_id: categoryRegister,
                        url_image: routeImageRegister,
                        description: descriptionRegister,
                        promo_verify: this.verifyPromo,
                        price_promo: null,
                        quantity: quantityRegister
                    })
                })
                    .then(function (response) {
                        if (response.status !== 200) {
                            console.log("Verificar problema. STATUS:" + response.status);
                            response.text().then(function (data) {
                                document.getElementById("incorrect-data").innerHTML = `${data}`;
                            });
                        }
                        response.json().then(function (data) {
                            console.log(data);
                        });
                    })
                    .catch(function (err) {
                        console.log("Verificar ERRO:" + err);
                    });
            }
        } else {
            document.getElementById("incorrect-data").innerHTML = "Algum dado foi inserido incorretamente";
        }
    }


    update() {
        alert("Não implementado");
    }

    listSales() {
        const table = document.getElementById("sales-log-table")
        table.style.display = "table";
        const tbody = table.querySelector("tbody");

        fetch(`${this.url}/sales/admin`, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': "http://localhost:8080",
                'Access-Control-Allow-Credentials': true
            },
            credentials: "include"
        })
            .then(res => res.json())
            .then(sales => {
                tbody.innerHTML = sales.map(sale => ` 
                <tr>
                    <td>${sale.created_at}</td>
                    <td>${sale.name}</td>
                    <td>${sale.email}</td>
                    <td>${sale.value}</td>
                    <td>${sale.description}</td>
                </tr>`
                ).join("\n");
            })
    }
})