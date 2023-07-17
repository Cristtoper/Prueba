const elementos1 = document.getElementById('lista-1'); //lista de los productos
const lista = document.querySelector('#lista-carrito tbody'); // lo que contiene la barra de carrito
const vaciarCarritoBtn = document.getElementById('vaciar-carrito'); // es el id: btn-2 
const eliminar = document.getElementById('eliminar-elemento');
let ventas = JSON.parse(localStorage.getItem("ventas")) || []; //local storage
let botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar")

// Traer productos de json
const fetchData = async () => {
    const res = await fetch('products.json');
    const data = await res.json()
    // console.log(data)
    pintarCards(data)
}
//
cargarEventListeners();

function cargarEventListeners() {

    elementos1.addEventListener('click', comprarElemento);
    carrito.addEventListener('click', eliminarElemento);
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito); 
}
function comprarElemento(e) {
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){
        const elemento = e.target.parentElement.parentElement;
        leerDatosElemento(elemento);
    }
}
function leerDatosElemento(elemento){
    const producto = {
        id: elemento.querySelector('a').getAttribute('data-id'),
        titulo: elemento.querySelector('h3').textContent,
        precio: elemento.querySelector('.Precio').textContent,
        cantidad: 1,
    }
    if(carrito.hasOwnProperty(producto.id)){
        producto.cantidad = carrito[producto.id].cantidad + 1
    }
    carrito[producto.id] = {...producto}
    console.log(producto)
    insertarcarrito(producto);
    
    
}  //se comienza agregar los elementos cuando le das agregar
function insertarcarrito(elemento) {
    const row = document.createElement('tr');

    row.innerHTML = `
        <td>
            ${elemento.titulo}
        </td>
        <td>
         ${elemento.cantidad}
         </td>
        <td>
            ${elemento.precio}
        </td>
        <td>
            <a herf="#" class="borrar" data-id="${elemento.id}">X </a>
        </td>
    `;
    saveLocal();
    lista.appendChild(row);
 
}

// elimina los productos de manera unitaria 
function eliminarElemento(e) {
    e.preventDefault();
    let elemento,
        elementoId;
    if(e.target.classList.contains('borrar')){
        e.target.parentElement.parentElement.remove();
        elemento = e.target.parentElement.parentElement;
        elementoId = elemento.querySelector('a').getAttribute('data-id');
    }
}


//elimina todos los productos con el botom vaciar carrito
function vaciarCarrito(){
    while(lista.firstChild){
        lista.removeChild(lista.firstChild);
    }
    return false;
}
// se elimina todos los elementos en la consola presionando vaciar carrito
const boton = document.querySelector('#vaciar-carrito')
boton.addEventListener('click', () => {
    carrito = {}
})
//

//storage
const saveLocal = () => {
    localStorage.setItem("ventas", JSON.stringify(ventas));
}
// storage
const abrirMenu = () =>{
    navegacion.classList.remove('ocultar');
    botonCerrar
}

const botonCerrar = () =>{
    console.log('cerrar menu');
};

