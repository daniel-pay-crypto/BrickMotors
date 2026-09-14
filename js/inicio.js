
// diccionario de precios
const precioBase = {
    "Caminante AT-ST": 150000,
    "Destructor Estelar": 70000,
    "AT-AT Supremacy": 85000,
    "Halcon Milenario": 80000
}

//Aca guardaremos lo que el usuario tiene en el carrito
let estadoCarrito = {}


//Funcion que recalcula y actualiza los textos de abajo
function actualizarTotales(){
    let totalItems = 0;
    let totalPrecio = 0;

    for (let id in estadoCarrito) {
        totalItems += estadoCarrito[id].cantidad;
        totalPrecio += (estadoCarrito[id].cantidad * estadoCarrito[id].precio);

    }

    document.getElementById("carrito-total-items").innerText = totalItems;
    document.getElementById("carrito-total-esmeraldas").innerText = totalPrecio;
}


//FUNCIONES PARA ABRIR EL MENU HAMBURGUESA Y EL CARRITO DE COMPRAS:

// Abre o cierra el panel izquierdo
function abrirCarrito() {
    /*let carrito = document.getElementById("carrito");*/
    const carrito = document.getElementById('carrito');
    carrito.classList.toggle("activo");
}


//Funcion para el menu de hamburguesa:
function abrirMenu(){
    //Busca el menu en el HTML
    let menu = document.getElementById("menu");

    // El "toggle" es como un interruptor de luz: 
    // si no tiene la clase "activo", se la pone. Si ya la tiene, se la quita.
    menu.classList.toggle("activo");
}


//FUNCIONES DE AGREGAR AL CARRITO:

// Función principal para agregar al carrito (Evita duplicados y crea el nuevo diseño)
function agregarAlCarrito(nombre, imagen, cantidad) {
    const panelCarrito = document.getElementById('lista-carrito');

    // Creamos un ID único y sin espacios para este producto (ej: "cart-diamante")
    const itemId = 'cart-' + nombre.replace(/\s+/g, '-').toLowerCase();

    // REGLA: Si el producto ya existe en el carrito, mostramos alerta y detenemos la función
    if (document.getElementById(itemId)) {
        alert("¡Este producto ya está en tu carrito! Modifica la cantidad desde allí.");
        return; 
    }


    let precioUnitario = precioBase[nombre] || 0;
    estadoCarrito[itemId] = {
        nombre: nombre,
        imagen: imagen,
        precio : precioUnitario,
        cantidad : parseInt(cantidad)
    };

    actualizarTotales();
    guardarCarritoEnMemoria();

    // Creamos el recuadro blanco con el botón de Eliminar y el Menú Desplegable
    const itemHTML = `
        <div class="item-carrito" id="${itemId}">
            <img src="${imagen}" alt="${nombre}">
            <div class="item-carrito-info">
                <span class="item-carrito-nombre">${nombre}</span>
                
                <div class="controles-cantidad">
                    <!-- Botón que dice "1 u." y abre el menú -->
                    <button class="btn-cantidad" onclick="abrirMenuCantidad('${itemId}')">
                        <span id="qty-${itemId}">${cantidad}</span> u. ▼
                    </button>
                    
                    <!-- Menú oculto que se despliega hacia abajo -->
                    <div class="dropdown-cantidad" id="drop-${itemId}" style="display: none;">
                        <button onclick="cambiarCantidad('${itemId}', 2)">2 u.</button>
                        <button onclick="cambiarCantidad('${itemId}', 5)">5 u.</button>
                        <button onclick="cambiarCantidad('${itemId}', 10)">10 u.</button>
                        <button onclick="mostrarInput('${itemId}')">Más unidades</button>
                        
                        <!-- Input para escribir números manualmente -->
                        <div id="caja-input-${itemId}" class="caja-input" style="display: none;">
                            <input type="number" id="input-qty-${itemId}" min="1" placeholder="Ej: 20">
                            <button onclick="aplicarInput('${itemId}')">Ok</button>
                        </div>
                    </div>

                    <!-- Botón para eliminar el producto entero -->
                    <button class="btn-eliminar-item" onclick="eliminarDelCarrito('${itemId}')">Eliminar</button>
                </div>
            </div>
        </div>
    `;

    panelCarrito.innerHTML += itemHTML;
    actualizarTotales(); //actualiza los numeros en el panel
}


//
// Abre y cierra el menú de unidades
function abrirMenuCantidad(itemId) {
    let menu = document.getElementById('drop-' + itemId);
    if (menu.style.display === 'none') {
        menu.style.display = 'flex';
    } else {
        menu.style.display = 'none';
    }
}


// Cambia el número de unidades y cierra el menú
function cambiarCantidad(itemId, nuevaCantidad) {
    let cant = parseInt(nuevaCantidad);
    document.getElementById('qty-' + itemId).innerText = cant;
    document.getElementById('drop-' + itemId).style.display = 'none'; // Cierra el menú
    
    if (estadoCarrito[itemId]) {
        estadoCarrito[itemId].cantidad = cant;
    }
    actualizarTotales();

    guardarCarritoEnMemoria();

}


// Muestra la cajita para escribir el número manualmente
function mostrarInput(itemId) {
    document.getElementById('caja-input-' + itemId).style.display = 'flex';
}


// Aplica el número que el usuario escribió
function aplicarInput(itemId) {
    let valor = document.getElementById('input-qty-' + itemId).value;
    if (valor > 0) { // Solo si escribió un número mayor a 0
        cambiarCantidad(itemId, valor);
    } else {
        alert("Por favor, ingresa un número válido.");
    }
}


// Elimina el cuadro blanco entero del carrito
function eliminarDelCarrito(itemId) {
    document.getElementById(itemId).remove();

    //Borramos el elemento de la memoria y recalculamos
    delete estadoCarrito[itemId];
    actualizarTotales();

    guardarCarritoEnMemoria();
}


// Variables globales (Acumuladores)
let inventario = {
    "Caminante AT-ST": 0,
    "Destructor Estelar": 0,
    "AT-AT Supremacy": 0,
    "Halcon Milenario": 0
};
let totalItems = 0;
let totalPrecio = 0;




// 2. Función principal que se activa al hacer clic
function agregarObjeto(tipo, precio) {
    // Validación del nombre (Desafío Extra)
    let nombreJugador = document.getElementById("jugador").value;
    
    if (nombreJugador.trim() === "") {
        alert("¡Debes ingresar tu nombre antes de comprar!");
        return; // Detiene la función aquí si no hay nombre
    }

    // Actualizamos el nombre en el resumen
    document.getElementById("nombre-resumen").innerText = nombreJugador;

    // 3. Regla de Negocio (Validación de 64 unidades)
    if (inventario[tipo] >= 64) {
        alert("¡Inventario lleno para este objeto!");
        return; // Detiene la función, no suma más
    }

    // 4. Sumar al inventario y a los acumuladores
    inventario[tipo]++;           // Suma 1 al objeto específico
    totalItems++;                 // Suma 1 al total de ítems
    totalEsmeraldas += precio;    // Suma el precio al costo total

    // 5. Manipulación del DOM (Actualizar pantalla sin recargar)
    document.getElementById("cant-" + tipo).innerText = inventario[tipo];
    document.getElementById("total-items").innerText = totalItems;
    document.getElementById("total-esmeraldas").innerText = totalEsmeraldas;
}


// 3. Restar productos
function quitarObjeto(tipo, precio) {
    // Solo podemos quitar si hay más de 0
    if (inventario[tipo] > 0) {
        inventario[tipo]--;
        totalItems--;
        totalEsmeraldas -= precio;
        
        actualizarPantalla(tipo);
    }
}

// 4. Actualizar todos los textos en la página
function actualizarPantalla(tipo) {
    // A) Actualiza la tarjeta verde y el panel de en medio
    document.getElementById("cant-" + tipo).innerText = inventario[tipo];
    document.getElementById("total-items").innerText = totalItems;
    document.getElementById("total-esmeraldas").innerText = totalEsmeraldas;

    // B) Actualiza los números del carrito lateral
    document.getElementById("carrito-cant-" + tipo).innerText = inventario[tipo];
    document.getElementById("carrito-total-items").innerText = totalItems;
    document.getElementById("carrito-total-esmeraldas").innerText = totalEsmeraldas;

    // C) Aparecer u ocultar el objeto en el carrito si llega a 0
    let itemCarrito = document.getElementById("item-" + tipo);
    if (inventario[tipo] > 0) {
        itemCarrito.style.display = "flex"; // Lo muestra
    } else {
        itemCarrito.style.display = "none"; // Lo oculta
    }
}

// Detectamos cada vez que el usuario mueve la rueda
window.addEventListener('scroll', () => {
    let altoPantalla = window.innerHeight;

    // 1. Agrupamos las secciones que queremos animar
    const secciones = [
        document.querySelector('.seccion-animada'),
        document.querySelector('.seccion-animada2')
    ];

    // 2. Evaluamos CADA sección por separado
    secciones.forEach(seccion => {
        // Si la sección no existe en la página, la saltamos para evitar errores
        if (!seccion) return; 

        // Buscamos las imágenes SOLO dentro de la sección que estamos evaluando en este momento
        const imgIzq = seccion.querySelector('.izquierda');
        const imgDer = seccion.querySelector('.derecha');

        let posicionSeccion = seccion.getBoundingClientRect().top;

        // Si la sección ya es visible en la pantalla
        if (posicionSeccion < altoPantalla && posicionSeccion > -seccion.offsetHeight) {
            
            let progreso = (altoPantalla - posicionSeccion) / altoPantalla;

            // Las imágenes empiezan a 300px afuera y llegan a 0px (el centro)
            let movimientoIzq = -300 + (300 * progreso);
            let movimientoDer = 300 - (300 * progreso);

            // Frenamos las imágenes para que no se crucen y pasen de largo
            if (movimientoIzq > 0) movimientoIzq = 0;
            if (movimientoDer < 0) movimientoDer = 0;

            // Si hay una imagen izquierda en esta sección, la movemos
            if (imgIzq) {
                imgIzq.style.transform = `translateX(${movimientoIzq}px)`;
                imgIzq.style.opacity = progreso;
            }

            // Si hay una imagen derecha en esta sección, la movemos
            if (imgDer) {
                imgDer.style.transform = `translateX(${movimientoDer}px)`;
                imgDer.style.opacity = progreso;
            }
        }
    });
});




// Guardar el carrito en el navegador
function guardarCarritoEnMemoria() {
    localStorage.setItem('carritoBrickMotors', JSON.stringify(estadoCarrito));
}

//cargo y dibujar el carrito al abrir la página
function cargarCarritoDeMemoria() {
    const carritoGuardado = localStorage.getItem('carritoBrickMotors');
    
    if (carritoGuardado) {
        estadoCarrito = JSON.parse(carritoGuardado);
        const panelCarrito = document.getElementById('lista-carrito');
        panelCarrito.innerHTML = ''; // Limpiamos el panel antes de rellenar
        
        // Dibujo cada producto recuperado de la memoria
        for (let itemId in estadoCarrito) {
            let prod = estadoCarrito[itemId];
            
            panelCarrito.innerHTML += `
                <div class="item-carrito" id="${itemId}">
                    <img src="${prod.imagen}" alt="${prod.nombre}">
                    <div class="item-carrito-info">
                        <span class="item-carrito-nombre">${prod.nombre}</span>
                        <div class="controles-cantidad">
                            <button class="btn-cantidad" onclick="abrirMenuCantidad('${itemId}')">
                                <span id="qty-${itemId}">${prod.cantidad}</span> u. ▼
                            </button>
                            <!-- Menú oculto -->
                            <div class="dropdown-cantidad" id="drop-${itemId}" style="display: none;">
                                <button onclick="cambiarCantidad('${itemId}', 2)">2 u.</button>
                                <button onclick="cambiarCantidad('${itemId}', 5)">5 u.</button>
                                <button onclick="eliminarDelCarrito('${itemId}')">Eliminar</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }
        actualizarTotales();
    }
}

//ejecuto la carga automáticamente apenas se lee este archivo
cargarCarritoDeMemoria();





//function inyetarFooter(){
  //  document.getElementById("footer").innerHTML = "<nos jakiaron>"
//}
//function inyectarHeader()
//document.getElementById("header").
//inyertarFooter();