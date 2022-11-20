const host_url = "https://6374330708104a9c5f7bc8a4.mockapi.io";
const transacciones_url = host_url + "/transacciones";

const forms = document.querySelectorAll(".needs-validation");
Array.prototype.slice.call(forms).forEach(function (form) {
  form.addEventListener(
    "submit",
    async function (event) {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      } else {
        event.preventDefault();
        event.stopPropagation();
        const descripcion = document.getElementById("descripcion").value;
        const tipoTransaccion = document.querySelectorAll(
          "input[name='tipoTransaccion']:checked"
        )[0].value;
        const tipoIVA = document.querySelectorAll(
          "input[name='tipoIVA']:checked"
        )[0].value;
        const subtotal = document.getElementById("subtotal").value;

        const transaccion = {
          descripcion,
          tipoTransaccion,
          tipoIVA,
          subtotal,
        };

        const res = await addTransaccion(transaccion);
        console.trace(res);
        showTransacciones();
      }
      form.classList.add("was-validated");
    },
    false
  );
});

const getTransacciones = async () => {
  const res = await fetch(transacciones_url);
  const data = await res.json();
  return data;
};

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

// Funcion para calcular el IVA usando los datos del server mock
const costoDeIVADev = (subtotal, tipoIVA) => {
  let nuevoTipoIVA = tipoIVA % 3;
  if (nuevoTipoIVA === 1) {
    // 1 representa IVA MÍNIMO
    return 0.1 * subtotal;
  }
  if (nuevoTipoIVA === 2) {
    // 2 representa IVA BÁSICO
    return 0.22 * subtotal;
  } else {
    return 0; // 0 representa IVA EXONERADO
  }
};

/** Funcion para calcular el IVA */
const costoDeIVA = (subtotal, tipoIVA) => {
  if (tipoIVA === 1) {
    // 1 representa IVA MÍNIMO
    return 0.1 * subtotal;
  }
  if (tipoIVA === 2) {
    // 2 representa IVA BÁSICO
    return 0.22 * subtotal;
  } else {
    return 0; // 0 representa IVA EXONERADO
  }
};

const showTransacciones = async () => {
  const transacciones_container = document.getElementById("transacciones");
  const transacciones = await getTransacciones();

  let total_compras = 0;
  let total_ventas = 0;

  transacciones_container.innerHTML = "";
  transacciones.forEach((transaccion) => {
    const { id, descripcion, tipoTransaccion, tipoIVA, subtotal } = transaccion;

    let iva = costoDeIVADev(subtotal, tipoIVA);
    let total = Number(subtotal) + iva;

    tipoTransaccion === "compra"
      ? (total_compras += total)
      : (total_ventas += total);

    transacciones_container.innerHTML += `
      <tr>
        <td>${id}</td>
        <td>${descripcion}</td>
        <td>${tipoTransaccion}</td>
        <td>${Number(subtotal).toFixed(2)}</td>
        <td>${iva.toFixed(2)}</td>
        <td>${total.toFixed(2)}</td>
      </tr>
    `;
  });

  document.getElementById("total_compras").innerHTML = total_compras.toFixed(2);
  document.getElementById("total_ventas").innerHTML = total_ventas.toFixed(2);

};
document.addEventListener("DOMContentLoaded", showTransacciones);
