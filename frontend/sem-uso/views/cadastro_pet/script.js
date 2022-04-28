declareController(
  class {
    onLoad() {
      console.log("entrando na página de cadastro de pet");
    }

    onDestroy() {
      console.log("saindo da página de cadastro de pet");
    }

    cadastrarPet(event) {
      event.preventDefault();
      // <input id="pet-name" type="text">
      // <input id="pet-image-url" type="text"></input>

      const pet_category_id = document.getElementById("pet-category_id").value;
      const pet_name = document.getElementById("pet-name").value;
      const image_url = document.getElementById("pet-image-url").value;
      const pet_weight = document.getElementById("pet-weight").value;
      const pet_price = document.getElementById("pet-price").value;
      const pet_height = document.getElementById("pet-height").value;
      const pet_created_at = document.getElementById("pet-created_at").value;
      const pet_description = document.getElementById("pet-description").value;
      const pet_promotion = document.getElementById("pet-promotion").value;
      // const name = document.getElementById("pet-name").value;

      console.log({
        pet_category_id,
        pet_name,
        image_url,
        pet_weight,
        pet_price,
        pet_height,
        pet_created_at,
        pet_description,
        pet_promotion,
      });

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
  }
);
