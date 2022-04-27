$("#price-promo").hide();

const url = "http://localhost:3000";
const namePet = document.getElementById("name");
const weight = document.getElementById("pet-weight");
const height = document.getElementById("pet-height");
const description = document.getElementById("description");
const category = document.getElementById("category");
const quantity = document.getElementById("quantity");
const price = document.getElementById("price");
const routeImage = document.getElementById("source-image");
let verifyPromo = "no";
let pricePromo = 0.00;

if (document.querySelector('input[name="promo"]')) { //Muda o valor de promo de acordo com o que for escolhido
    document.querySelectorAll('input[name="promo"]').forEach((elem) => {
        elem.addEventListener("change", function (event) {
            verifyPromo = event.target.value;
            if (verifyPromo === "yes") {
                $("#price-promo").show();
            } else {
                $("#price-promo").hide();
            }
        });
    });
}

function registerPet() {
    let nameRegister = namePet.value;
    let weightRegister = weight.value;
    let heightRegister = height.value;
    let descriptionRegister = description.value;
    let categoryRegister = Number(category.value);
    let quantityRegister = quantity.value;
    let priceRegister = price.value;
    let routeImageRegister = routeImage.value;
    /* console.log(nameRegister);
    console.log(weightRegister);
    console.log(heightRegister);
    console.log(descriptionRegister);
    console.log(categoryRegister);
    console.log(quantityRegister);
    console.log(priceRegister);
    console.log(routImageRegister);
    console.log(verifyPromo); */

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
    if (verifyPromo === "yes") {
        let pricePromoRegister = document.getElementById("price-promo").value;
        testPricePromo = priceFormat.test(pricePromoRegister);
        if (testPricePromo === true) {
            pricePromo = pricePromoRegister;
        }
    }
    if (testName === true && testWeight === true && testHeight === true && (testDescription === true && descriptionRegister.length <= 255) && categoryRegister !== 0 && testQuantity === true && testPrice === true && testRoute === true) {
        console.log("Requisitos atendidos");
        if (verifyPromo === "yes") { //Produto em promoção 
            console.log("Promoção identificada");
            if (testPricePromo === true) { //Preço do produto no formato correto
                console.log("Preço promocional no formato correto");
                document.getElementById("incorrect-data").innerHTML = "";
                fetch(`${url}/pets`, {
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
                        promo_verify: verifyPromo,
                        price_promo: pricePromo,
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
            fetch(`${url}/pets`, {
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
                    promo_verify: verifyPromo,
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