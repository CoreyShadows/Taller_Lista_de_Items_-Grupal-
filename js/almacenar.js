//  Inicialización del array desde localStorage//
let lista = JSON.parse(localStorage.getItem("listado")) || [];


//  Referencias del DOM//
const inputItem = document.getElementById("item");
const btnAgregar = document.getElementById("agregar");
const btnLimpiar = document.getElementById("limpiar");
const contenedor = document.getElementById("contenedor");


//  Función  la lista en pantalla //
function renderizarLista() {
  contenedor.innerHTML = ""; // Limpiar contenido previo//
  lista.forEach((item, index) => {
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center";
    li.textContent = item;


    // Botón para eliminar ítem //
    const btnEliminar = document.createElement("button");
    btnEliminar.className = "btn btn-sm btn-danger";
    btnEliminar.textContent = "✖";
    btnEliminar.onclick = () => {
      lista.splice(index, 1);
      actualizarStorageYVista();
    };

    li.appendChild(btnEliminar);
    contenedor.appendChild(li);
  });

}


//  Función para actualizar localStorage y la vista//
function actualizarStorageYVista() {
  localStorage.setItem("listado", JSON.stringify(lista));
  renderizarLista();
}


//  Evento para agregar ítem //
btnAgregar.addEventListener("click", () => {
  const nuevoItem = inputItem.value.trim();
  if (nuevoItem !== "") {
    lista.push(nuevoItem);
    actualizarStorageYVista();
    inputItem.value = ""; // Limpiar campo //
    inputItem.focus();    // Mejor UX //
  }
});

//  Evento para limpiar listado //
btnLimpiar.addEventListener("click", () => {
  localStorage.removeItem("listado");
  lista = [];
  renderizarLista();
});

//  Renderizar al cargar la página //
renderizarLista();

