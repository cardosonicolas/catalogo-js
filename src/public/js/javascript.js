const prod1 = {
  nombre: "Producto 1",
  precio: "$" + 100,
};
const prod2 = {
  nombre: "Producto 2",
  precio: "$" + 200,
};
const prod3 = {
  nombre: "Producto 3",
  precio: "$" + 300,
};
const prod4 = {
  nombre: "Producto 4",
  precio: "$" + 400,
};
const prod5 = {
  nombre: "Producto 5",
  precio: "$" + 500,
};

const lista = [prod1, prod2, prod3, prod4, prod5];

const $fragment = document.createDocumentFragment(),
  $cards = document.querySelector(".cards");

lista.forEach((el) => {
  const $divItem = document.createElement("div"),
    $divCard = document.createElement("div"),
    $divImg = document.createElement("div"),
    $p = document.createElement("p"),
    $divBody = document.createElement("div"),
    $h3 = document.createElement("h3");

  $divItem.classList.add("flex-item");
  $divCard.classList.add("card", "flex-column");
  $divImg.classList.add("card-img", "flex-column");
  $p.classList.add("card-precio");
  $divBody.classList.add("card-body");
  $h3.classList.add("card-prod");

  $p.textContent = el.precio;
  $h3.textContent = el.nombre;
  $divImg.style.backgroundImage = "url('http://placeimg.com/1366/720/any')";

  $divCard.appendChild($divImg);
  $divImg.appendChild($p);
  $divCard.appendChild($divBody);
  $divBody.appendChild($h3);
  $divItem.appendChild($divCard);

  $fragment.appendChild($divItem);
});
$cards.appendChild($fragment);
