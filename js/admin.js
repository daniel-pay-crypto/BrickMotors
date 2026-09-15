// patron simple para validar correos de gmail
const patronGmail = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

// datos de ejemplo guardados en memoria
let productos = [
    { codigo: "ATST-001", nombre: "Caminante AT-ST", precio: 150000, stock: 5, categoria: "Star Wars" },
    { codigo: "ATAT-001", nombre: "AT-AT Supremacy", precio: 850000, stock: 2, categoria: "Star Wars" }
];

let usuarios = [
    { nombre: "Juan Perez", correo: "juan@gmail.com", tipo: "Administrador" }
];

// cambia entre la seccion de productos y usuarios
function mostrarSeccion(seccion) {
    document.getElementById("seccion-productos").classList.add("is-hidden");
    document.getElementById("seccion-usuarios").classList.add("is-hidden");
    document.getElementById("seccion-" + seccion).classList.remove("is-hidden");
}

// dibuja la tabla de productos
function renderizarProductos() {
    const tabla = document.getElementById("tabla-productos");
    tabla.innerHTML = "";

    productos.forEach((p) => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${p.codigo}</td>
            <td>${p.nombre}</td>
            <td>$${p.precio}</td>
            <td>${p.stock}</td>
            <td>${p.categoria}</td>
        `;
        tabla.appendChild(fila);
    });
}

function mostrarFormularioProducto() {
    document.getElementById("form-box-producto").classList.remove("is-hidden");
}

function ocultarFormularioProducto() {
    document.getElementById("form-box-producto").classList.add("is-hidden");
    document.getElementById("form-producto").reset();
}

// valida y guarda un producto nuevo
document.getElementById("form-producto").addEventListener("submit", (e) => {
    e.preventDefault();

    const codigo = document.getElementById("p-codigo").value.trim();
    const nombre = document.getElementById("p-nombre").value.trim();
    const precio = document.getElementById("p-precio").value.trim();
    const stock = document.getElementById("p-stock").value.trim();
    const categoria = document.getElementById("p-categoria").value;

    // oculta errores antes de validar de nuevo
    ["p-codigo", "p-nombre", "p-precio", "p-stock", "p-categoria"].forEach((id) => {
        document.getElementById("error-" + id).classList.add("is-hidden");
    });

    let formularioValido = true;

    // nada puede quedar vacio
    if (codigo === "") {
        document.getElementById("error-p-codigo").classList.remove("is-hidden");
        formularioValido = false;
    }

    if (nombre === "") {
        document.getElementById("error-p-nombre").classList.remove("is-hidden");
        formularioValido = false;
    }

    if (precio === "") {
        document.getElementById("error-p-precio").classList.remove("is-hidden");
        formularioValido = false;
    }

    if (stock === "") {
        document.getElementById("error-p-stock").classList.remove("is-hidden");
        formularioValido = false;
    }

    if (categoria === "") {
        document.getElementById("error-p-categoria").classList.remove("is-hidden");
        formularioValido = false;
    }

    if (formularioValido) {
        productos.push({
            codigo: codigo,
            nombre: nombre,
            precio: parseInt(precio),
            stock: parseInt(stock),
            categoria: categoria
        });
        renderizarProductos();
        ocultarFormularioProducto();
    }
});

// dibuja la tabla de usuarios
function renderizarUsuarios() {
    const tabla = document.getElementById("tabla-usuarios");
    tabla.innerHTML = "";

    usuarios.forEach((u) => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${u.nombre}</td>
            <td>${u.correo}</td>
            <td>${u.tipo}</td>
        `;
        tabla.appendChild(fila);
    });
}

function mostrarFormularioUsuario() {
    document.getElementById("form-box-usuario").classList.remove("is-hidden");
}

function ocultarFormularioUsuario() {
    document.getElementById("form-box-usuario").classList.add("is-hidden");
    document.getElementById("form-usuario").reset();
}

// valida y guarda un usuario nuevo
document.getElementById("form-usuario").addEventListener("submit", (e) => {
    e.preventDefault();

    const nombre = document.getElementById("u-nombre").value.trim();
    const correo = document.getElementById("u-correo").value.trim();
    const tipo = document.getElementById("u-tipo").value;

    // oculta errores antes de validar de nuevo
    ["u-nombre", "u-correo", "u-tipo"].forEach((id) => {
        document.getElementById("error-" + id).classList.add("is-hidden");
    });

    let formularioValido = true;

    // nada puede quedar vacio
    if (nombre === "") {
        document.getElementById("error-u-nombre").classList.remove("is-hidden");
        formularioValido = false;
    }

    // el correo debe ser un gmail bien escrito
    if (correo === "" || !patronGmail.test(correo)) {
        document.getElementById("error-u-correo").classList.remove("is-hidden");
        formularioValido = false;
    }

    if (tipo === "") {
        document.getElementById("error-u-tipo").classList.remove("is-hidden");
        formularioValido = false;
    }

    if (formularioValido) {
        usuarios.push({ nombre, correo, tipo });
        renderizarUsuarios();
        ocultarFormularioUsuario();
    }
});

// pinta las tablas apenas carga la pagina
renderizarProductos();
renderizarUsuarios();