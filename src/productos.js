document.addEventListener("DOMContentLoaded", () => {
  showStockProducts();
});

const productosLista = document.querySelector("#productos_lista");

async function showStockProducts() {
  productsArray = await getProductos();
  let htmlContentToAppend = "";
  productsArray.forEach((product) => {
    let { id, nombre, descripcion, stock, precioUnitario } = product;
    htmlContentToAppend += `
                <tr>
                  <td>${id}</td>
                  <td>${nombre}</td>
                  <td>${descripcion}</td>
                  <td>${precioUnitario}</td>
                  <td>${stock}</td>
                </tr>
              `;

    // Agrega opciones al select de transacciones
    const newOption = document.createElement("option");
    newOption.value = id;
    newOption.innerText = nombre;
    document.getElementById("producto").appendChild(newOption);
  });
  productosLista.innerHTML = htmlContentToAppend;
}

Array.prototype.slice.call(forms).forEach(function (form) {
  if (form.id === "productos_form") {
    form.addEventListener(
      "submit",
      async function (event) {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        } else {
          event.preventDefault();
          event.stopPropagation();
          const nombre = document.getElementById("productoNombre").value;
          const descripcionProducto = document.getElementById("descripcionProducto").value;
          const precioUnitarioProducto =
            document.getElementById("precioUnitarioProducto").value;
          const stockProducto = document.getElementById("stockProducto").value;

          const producto = {
            nombre: nombre,
            descripcion: descripcionProducto,
            precioUnitario: precioUnitarioProducto,
            stock: stockProducto,
          };

          console.log(producto);

          const res = await addProducto(producto);
          console.trace(res);
          history.go();
        }
        form.classList.add("was-validated");
      },
      false
    );
  }
});

const addProducto = async (producto) => {
  const res = await fetch(productos_url, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(producto),
  });
  const data = await res.json();
  return data;
};