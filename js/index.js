/* <div class="card">
  <img src="jeans3.jpg" alt="Denim Jeans" style="width:100%">
  <h2>Tailored Jeans</h2>
  <p class="price">$19.99</p>
  <p>Some text about the jeans..</p>
</div> */

const prod1 = {
  nombre: "Producto 1",
  precio: "$" + 500,
  img: "",
  descripcion: "Esto es una descripcion",
};

const prod2 = {
  nombre: "Producto 2",
  precio: "$" + 400,
  img: "",
  descripcion: "Esto es una descripcion",
};

const prod3 = {
  nombre: "Producto 3",
  precio: "$" + 300,
  img: "",
  descripcion: "Esto es una descripcion",
};

const prod4 = {
  nombre: "Producto 4",
  precio: "$" + 200,
  img: "",
  descripcion: "Esto es una descripcion",
};

const prod5 = {
  nombre: "Producto 5",
  precio: "$" + 100,
  img: "",
  descripcion:
    "Esto es una descripcionEsto es una descripcionEsto es una descripcionEsto es una descripcionEsto es una descripcionEsto es una descripcionEsto es una descripcion",
};

const lista = [
  prod1,
  prod2,
  prod5,
  prod3,
  prod4,
  prod1,
  prod2,
  prod3,
  prod3,
  prod3,
];

const $fragment = document.createDocumentFragment(),
  $cards = document.querySelector(".cards");

lista.forEach((el) => {
  const $div = document.createElement("div"),
    $img = document.createElement("img"),
    $h3 = document.createElement("h3"),
    $p = document.createElement("p"),
    $p2 = document.createElement("p"),
    $a = document.createElement("a");

  $div.classList.add("card");
  $p.classList.add("price");

  $img.setAttribute("src", "https://placeimg.com/200/200/any");
  $img.setAttribute("alt", "Any");
  $a.setAttribute("href", "#");

  $h3.textContent = el.nombre;
  $p.textContent = el.precio;
  $p2.textContent = el.descripcion;
  $a.textContent = "Leer mas";

  $div.appendChild($img);
  $div.appendChild($h3);
  $div.appendChild($p);
  $div.appendChild($p2);
  $div.appendChild($a);

  $fragment.appendChild($div);
});
$cards.appendChild($fragment);
