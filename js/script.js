const form = document.querySelector("#form")
const nombreForm = document.querySelector("#txtNombre");
const atributo1 = document.querySelector("#txtAtributo1");
const atributo2 = document.querySelector("#txtAtributo2");
const atributo3 = document.querySelector("#txtAtributo3");
const imagen = document.querySelector("#txtImage");
const precio = document.querySelector("#txtPrecio");

console.log({
    form
});

const itemsList = document.querySelector("#itemList")

const items = [
    new Item("lapiz","amarillo","15 cm", "trazado negro" ,"https://www.ambientum.com/wp-content/uploads/2019/09/lapiz.png", 3),
    new Item("lapiz","rojo","15 cm", "trazado rojo  " ,"https://static.wixstatic.com/media/45ce85_9c38bbf5abde45d591794cb14ab7e7fb~mv2.png/v1/fill/w_550,h_550,al_c,lg_1,q_85,enc_avif,quality_auto/45ce85_9c38bbf5abde45d591794cb14ab7e7fb~mv2.png", 3)
]

class Item {
  constructor(nombre, atributo1, atributo2, atributo3, imagen, precio) {
    this.nombre = nombre;
    this.atributo1 = atributo1;
    this.atributo2 = atributo2;
    this.atributo3 = atributo3;
    this.urlImage = imagen;
    this.precio = precio;
  }


  passHtml() {
    return `<article class="item">
                <h2 class="itemTitle">${this.nombre}</h2>
                <img class="itemImage" src="${this.urlImage}" alt="Item 1 Image">
                <p>Price: $${this.precio}</p>
                <p>- ${this.atributo1}</p>
                <p>- ${this.atributo2}</p>
                <p>- ${this.atributo3}</p>

                <button>Agregar al carro</button>
            </article>
            `;
  }

}

const listaEnHtml= () => {

    itemsList.innerHTML = ""
    
    for (let item of items){
        itemsList.innerHTML += item.passHtml()
    }

}













