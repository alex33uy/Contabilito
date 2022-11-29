const calcularSubtotal = () =>{
  getProductos();

  const subtotalInput = document.getElementById("subtotal");
  const precioUnitarioInput = document.getElementById('precioUnitario');

  const cantProd = Number(document.getElementById("cantProducto").value);
  const productoId = Number(document.getElementById("producto").value);
  const producto = productsArray.find( producto => producto.id == productoId);
  const precioUnitario = Number(producto.precioUnitario)

  precioUnitarioInput.value = precioUnitario;
  subtotalInput.value = cantProd * precioUnitario;
}


Array.prototype.slice.call(forms).forEach(function (form) {
  if (form.id === "transaccion_form") {
    form.addEventListener(
      "submit",
      async function (event) {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        } else {
          event.preventDefault();
          event.stopPropagation();
          const producto = document.getElementById("producto").value;
          const cantProd = document.getElementById("cantProducto").value;
          const fecha = document.getElementById("fecha").value;
          const precioUnitario =
            document.getElementById("precioUnitario").value;
          const tipoTransaccion = document.querySelectorAll(
            "input[name='tipoTransaccion']:checked"
          )[0].value;
          const tipoIVA = document.querySelectorAll(
            "input[name='tipoIVA']:checked"
          )[0].value;
          const subtotal = document.getElementById("subtotal").value;

          const transaccion = {
            producto,
            cantProd,
            precioUnitario,
            fecha,
            tipoTransaccion,
            tipoIVA,
            subtotal,
          };

          console.log(transaccion);

          const res = await addTransaccion(transaccion);
          console.trace(res);
          history.go();
        }
        form.classList.add("was-validated");
      },
      false
    );
  }
});

const addTransaccion = async (transaccion) => {
  const res = await fetch(transacciones_url, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(transaccion),
  });
  const data = await res.json();
  return data;
};

/** Funcion para calcular el IVA */
const costoDeIVA = (subtotal, tipoIVA) => {
  return Number(tipoIVA) * subtotal;
};

const showFecha = (date) => {
  const fecha = new Date(date);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  return fecha.toLocaleDateString("es-ES", options);
};

const showTransacciones = async () => {

  const transacciones_container = document.getElementById("transacciones");

  transaccionesArray = await getTransacciones();
  productsArray = await getProductos();

  let totalCompras = 0;
  let totalVentas = 0;

  transacciones_container.innerHTML = "";

  await transaccionesArray.forEach(async (transaccion) => {
    let {
      id,
      fecha,
      idProducto,
      cantProd,
      precioUnitario,
      tipoTransaccion,
      tipoIVA,
      subtotal,
    } = transaccion;

    let iva = costoDeIVA(subtotal, tipoIVA);
    let total = Number(subtotal) + Number(iva);
    let nombreProducto = await getProductNameById(idProducto);

    if(tipoTransaccion.toUpperCase() == "COMPRA"){
      totalCompras += total;
    } else {
      totalVentas += total;
    }

    transacciones_container.innerHTML += `
      <tr>
        <td>${id}</td>
        <td>${tipoTransaccion}</td>
        <td>${showFecha(fecha)}</td>
        <td>${nombreProducto}</td>
        <td>${cantProd}</td>
        <td>${precioUnitario}</td>
        <td>${Number(subtotal).toFixed(2)}</td>
        <td>${iva.toFixed(2)}</td>
        <td>${total.toFixed(2)}</td>
      </tr>
    `;

    document.getElementById("total_compras").innerHTML = totalCompras.toFixed(2);
    document.getElementById("total_ventas").innerHTML = totalVentas.toFixed(2);
  });

  

  
};
document.addEventListener("DOMContentLoaded", showTransacciones);


