const productos = [
    {
        id: 1,
        nombre: "Casaca Boca años '60",
        descripción: "Camiseta Original de Boca Juniors década de los sesenta",
        imagen: "./img/boca60.jpg",
        precio: 7499,
    }, {
        id: 2,
        nombre: "Casaca Argentina Titular '86",
        descripción: "Camiseta icónica de la Selección Argentina Copa Mundial de México 1986",
        imagen: "./img/argentina86.jpg",
        precio: 6500,
    }, {
        id: 3,
        nombre: "Casaca Holanda Titular '74",
        descripción: "La Naranja Mecánica, clásica camiseta de Holanda del 74",
        imagen: "./img/holanda74.jpg",
        precio: 6500,
    }, {
        id: 4,
        nombre: "Casaca Brasil Titular '82",
        descripción: "Hermosa camiseta de la Selección de Brasil Copa Mundial de España 1982",
        imagen: "./img/brasil82.jpg",
        precio: 4150,
    }, {
        id: 5,
        nombre: "Casaca Argentina Suplente '86",
        descripción: "La Barrilete Cósmico, no requiere presentación. Suplente Selección Argentina 1986",
        imagen: "./img/argentinaSup86.jpg",
        precio: 7500,
    }, {
        id: 6,
        nombre: "Casaca Alemania Titular '74",
        descripción: "Armadura utilizada por el artillero Gerd Müller en 1974",
        imagen: "./img/alemania74.jpg",
        precio: 5000,
    }, {
        id: 7,
        nombre: "Casaca Italia Titular '70",
        descripción: "Hermosa camiseta de La Nazionale década de los setenta",
        imagen: "./img/italia70.jpg",
        precio: 5750,
    }, {
        id: 8,
        nombre: "Pelota Tango '78",
        descripción: "Icónica pelota Adidas Tango de la Copa Mundial de Argentina 1978",
        imagen: "./img/pelotaTango78.jpg",
        precio: 2150,
    }, {
        id: 9,
        nombre: "Pelota Tricolore '98",
        descripción: "La Tricolore utilizada en la Copa Mundial de Francia 1998",
        imagen: "./img/pelotaTricolore98.jpg",
        precio: 2000,
    }, {
        id: 10,
        nombre: "Pelota Azteca '86",
        descripción: "Pelota Azteca, protagonista del Mejor Gol de la Historia. Copa Mundial México 1986",
        imagen: "./img/pelotaAzteca86.jpg",
        precio: 3999,
    },
];

fetch('js/productos.json')
    .then((response) => response.json())
    .then((data) => {
        const lista = document.getElementById("lista");
        productos.forEach((producto, posicion) => {
            let tarjeta = document.createElement("div");
            tarjeta.classList.add("card", "col-md-11", "col-lg-11");
            tarjeta.innerHTML = `<div class="" style="width: 18rem; height: auto;">
        <img src="${producto.imagen}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${producto.nombre}</h5>
            <p class="card-text">$ ${producto.precio}</p>
            <p class="card-text">${producto.descripción}</p>
            <a class="btn btnCard" role="button" onClick="addCart(${posicion})">COMPRAR</a>
        </div>
        </div>`
            lista.appendChild(tarjeta);
        });
    });


// carrito en HTML 


let carritoHTML = document.getElementById("carrito");
let valorFinal = 0;
let subtotal = 0;
let iva = 1.21;
const drawCart = () => {
    let valorFinal = 0;
    carritoHTML.className = "carrito";
    carritoHTML.innerHTML = "";
    if (carrito.length > 0) {
        carrito.forEach((producto, posicion) => {
            subtotal = producto.precio * producto.cantidad;
            valorFinal += subtotal * iva;

            const agregoCarrito = document.createElement("div");
            agregoCarrito.classList.add("prod-cart", "d-flex", "col-md-11", "col-lg-11", "mb-2");
            agregoCarrito.innerHTML = `<img class="carritoImg" src="${producto.imagen}"/>
            <div class="carritoDetalles">${producto.nombre}</div>
            <div class="carritoDetalles">Cantidad: ${producto.cantidad}</div>
            <div class="carritoDetalles">Precio: $ ${producto.precio}</div>
            <div class="carritoDetalles">Total: $ ${producto.precio * producto.cantidad}</div>
            <a class="carritoDetalles" id="remove-producto" onClick="removeProduct(${posicion})"><img class="removeImg" src="./img/trashCan.png"/><a/>`;

            carritoHTML.appendChild(agregoCarrito);
        });

        const totalHTML = document.createElement("div");
        totalHTML.className = "precio-final";
        totalHTML.innerHTML = `<hr><div class="valorFinal">El precio final es $ ${valorFinal}</div>
        <button class="btn btn-dark" id="finalizar" onClick="finCompra()">IR A PAGAR</button>`;
        carritoHTML.appendChild(totalHTML);
    } else {
        carritoHTML.classList.remove("carrito");
    }
};


// orden para agregar productos al carrito

let carrito = []

const addCart = (posicion) => {
    const indexCart = carrito.findIndex((elemento) => {
        return elemento.id === productos[posicion].id;
    });
    if (indexCart === -1) {
        const addProd = productos[posicion];
        addProd.cantidad = 1;
        carrito.push(addProd);
        refreshLS(carrito);
        drawCart();
    } else {
        carrito[indexCart].cantidad += 1;
        refreshLS(carrito);
        drawCart();
    }

};

const removeProduct = (posicion) => {
    carrito.splice(posicion, 1);
    refreshLS(carrito);
    drawCart();
}

// mensaje con valores finales

const finCompra = () => {
    const valorFinal = document.getElementsByClassName("valorFinal")[0].innerHTML;
    carritoHTML.innerHTML = "";
    carritoHTML.innerHTML = `<div class="pagar"><p class="parrafoPagar">${valorFinal}.</p></div>
    <div class="cliente">
    <p>Clickeé debajo para completar el formulario de envío.</p>
    <button class="btn btn-dark" id="formulario" onClick="drawForm()">Continuar</button>
    </div>`;
};

// aparece form. para finalizar compra.

const drawForm = () => {
    carritoHTML.innerHTML = "";
    const form = `
    <section class="form" id="customer">
        <div class="contForm">
            <div class="form-floating">
                <input type="name" class="form-control name" id="name" placeholder="Nombre">
                <label for="floatingInput">Nombre</label>
            </div>
            <div class="form-floating">
                <input type="e-mail" class="form-control email" id="email" placeholder="Email">
                <label for="floatingInput">E-mail</label>
            </div>
            <div class="form-floating">
                <input type="address" class="form-control address" id="address" placeholder="Dirección">
                <label for="floatingInput">Dirección</label>
            </div>
            <button class="boton btn btn-outline-success" type="button" id="enviar" onClick="mensaje()">Enviar</button>
        </div>
    </section>
    `
    carritoHTML.innerHTML = form;
};

// mensaje post confirmación de compra completando form con operador ternario

const mensaje = () => {
    const nombreCliente = document.getElementById("name").value.toUpperCase();
    const emailCliente = document.getElementById("email").value.toUpperCase();
    const direccionCliente = document.getElementById("address").value.toUpperCase();


    const mensaje = nombreCliente.length > 3 ?
            (Swal.fire(
            'Tu compra fue confirmada!',
            'Gracias por elegir Back&Forth F.C.',
            'success'),
            carritoHTML.innerHTML = "",
            datosEnvio = `<div class="datosEnvios">${nombreCliente} gracias por comprar con Back&Forth FC. En unos minutos
            recibirás la confirmación en tu casilla: ${emailCliente} y recibirás tu compra dentro de las 72 hs. posteriores
            a la recepción del correo electrónico en tu domicilio: ${direccionCliente}.</div>
            `,
            carritoHTML.innerHTML = datosEnvio) :

            Swal.fire({
            icon: 'error',
            title: 'Hubo un error!',
            text: 'Verificá que todos los campos estén completos'},
            carritoHTML.innerHTML = "",
            datosEnvio = `<div class="datosEnvios">Por favor, verificá que los datos sean correctos y volvé a ingresarlos.</div>`,
            carritoHTML.innerHTML = datosEnvio)

};

// guardar carrito en LocalStorage

const refreshLS = (carrito) => {
    localStorage.setItem("carrito", JSON.stringify(carrito))
};
