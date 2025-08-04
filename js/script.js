// informacion traida del html//////

// Traer el contenedor del carrito y los botones de agregar
const carritoItems = document.getElementById('carrito-items');
const botonesAgregar = document.querySelectorAll('.buttonAdd');
const botonBorrar = document.querySelector('.buttonDelete');

// Traer el formulario y los campos del formulario
const form = document.querySelector("#form")
const nombreForm = document.querySelector("#txtNombre");
const atributo1 = document.querySelector("#txtAtributo1");
const atributo2 = document.querySelector("#txtAtributo2");
const atributo3 = document.querySelector("#txtAtributo3");
const imagen = document.querySelector("#txtImage");
const precio = document.querySelector("#txtPrecio");


// Parte del html con items
const itemsList = document.querySelector("#itemList")

//////////////////////////////////////////Loguica del inventario////////////////////////////////////

// clase Item que representa cada item del inventario
// Cada item tiene un nombre, 3 atributos, una imagen y un precio
class Item {
  constructor(nombre, atributo1, atributo2, atributo3, imagen, precio) {
    this.nombre = nombre;
    this.atributo1 = atributo1;
    this.atributo2 = atributo2;
    this.atributo3 = atributo3;
    this.urlImage = imagen;
    this.precio = precio;
  }

  // Metodo para pasar a html cada item

  passHtml() {
    return `<article class="item">
                <h2 class="itemTitle">${this.nombre}</h2>
                <img class="itemImage" src=${this.urlImage} alt="Item 1 Image">
                <p>Price: $${this.precio}</p>
                <p>- ${this.atributo1}</p>
                <p>- ${this.atributo2}</p>
                <p>- ${this.atributo3}</p>

                <button class="buttonAdd">Agregar al carro</button>
            </article>
            `;
  }

}


// Items que ya estan
const items = [
    new Item("lapiz","amarillo","15 cm", "trazado negro" ,"https://www.ambientum.com/wp-content/uploads/2019/09/lapiz.png", 2000),
    new Item("lapiz","rojo","15 cm", "trazado rojo  " ,"https://static.wixstatic.com/media/45ce85_9c38bbf5abde45d591794cb14ab7e7fb~mv2.png/v1/fill/w_550,h_550,al_c,lg_1,q_85,enc_avif,quality_auto/45ce85_9c38bbf5abde45d591794cb14ab7e7fb~mv2.png", 2000)
]


//funcion para agregar los items al html
const listaEnHtml= () => {
    // Limpiar la lista de items en el HTML antes de agregar los nuevos
    itemsList.innerHTML = ""
    
    for (let item of items){
        itemsList.innerHTML += item.passHtml()
    }

}


form.addEventListener("submit", (e) => {
    e.preventDefault();

    const precioValor = parseFloat(precio.value);

    if (precioValor < 1000) {
        alert("El precio debe ser mayor o igual a 1000"); // muiestra un mensaje de alerta
        return; // Detiene la ejecución aquí, no agrega ni limpia nada
    }

    // Crear un nuevo item con los datos del formulario
    const nuevoItem = new Item(
        nombreForm.value,
        atributo1.value,
        atributo2.value,
        atributo3.value,
        imagen.value,
        precioValor
    );

    // Agregar el nuevo item a la lista de items
    items.push(nuevoItem);

    // Limpiar el formulario
    form.reset();

    // Actualizar la lista de items en el HTML
    listaEnHtml();
});



//////////////////////////////////////////Loguica del carrito////////////////////////////////////

const urlImages = []

botonesAgregar.forEach(boton => {
    boton.addEventListener('click', (e) => {
        const item = e.target.closest('.item'); //encontrar el ancestro más cercano que coincida con un selector CSS dado.
        const imagenCarrito = item.querySelector('.itemImage').src; // Traer la imagen del item
        if (urlImages.includes(imagenCarrito)) {
            // Buscar la fila en el carrito que tenga esa imagen
            const filas = carritoItems.querySelectorAll('tr');
            filas.forEach(fila => {
                const img = fila.querySelector('img');
                if (img !== null && img.src === imagenCarrito) {
                    // Encontramos la fila e item correcta , ahora aumentamos la cantidad
                    const cantiItem = fila.querySelector('.cantiItem');
                    let cantidadActual = parseInt(cantiItem.textContent);
                    cantiItem.textContent = cantidadActual + 1;
                }
            });
        } else {
          const nombre = item.querySelector('.itemTitle').innerText;
          // funciona solo porque el precio es el primer p, ya que trae el primero que encuentre, preguntar si es la mejor practica al profe siu
          const precio = item.querySelector('p').innerText.split(':')[1].trim(); 
          const fila = document.createElement('tr');
          fila.innerHTML = `
              <td> <img class="imageCarro" src="${imagenCarrito}" alt="IMAGEN${nombre}"> </td>
              <td>${nombre}</td>
              <td>${precio}</td>
              <td class="cantiItem">1</td>
          `;
          urlImages.push(imagenCarrito); // Agregar la imagen al array 
          carritoItems.appendChild(fila);
        }
        
    });
});

botonBorrar.addEventListener('click', () => {
    // Limpiar el carrito
    carritoItems.innerHTML = '';
    urlImages.length = 0; // Vaciar el array de imágenes
});






