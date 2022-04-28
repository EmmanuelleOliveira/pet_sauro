onPageLoad["/produtos"] = function () {
    fetch("/api/produtos")
      .then((response) => response.json())
      .then((produtos) => {
        document.getElementById("produtos__lista").innerHTML = produtos
          .map(
            (x) => `<li><a href="/produtos/:${x.id}" data-link>${x.nome}</a></li>`
          )
          .join("\n");
      });
  };
  
  onPageLoad["/produtos/$"] = function (produtoId) {
    fetch(`/api/produto?id=${produtoId}`)
      .then((response) => response.json())
      .then((produto) => {
        document.getElementById("produto__lista").innerHTML = `
        <li>id: ${produto.id}</li>
        <li>nome: ${produto.nome}</li>
        <li>preço: ${produto.preco}</li>
      `;
      });
  };
  
  navigate("/");