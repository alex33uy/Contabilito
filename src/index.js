const host_url = "http://localhost:3000/";

const transacciones_url = host_url + "transacciones";
const productos_url = host_url + "productos";

let productsArray = [];
let transaccionesArray = [];
const forms = document.querySelectorAll(".needs-validation");

const getProductNameById = async (id) => {
    const res = await fetch(productos_url + "/" + id);
    const data = await res.json();
    const nombre = await data.nombre;
    return nombre;
};

const getTransacciones = async () => {
  const res = await fetch(transacciones_url);
  const data = await res.json();
  return data;
};

const getProductos = async () => {
  const res = await fetch(productos_url);
  const data = await res.json();
  return data;
};
