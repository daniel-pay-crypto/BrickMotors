// patron simple para validar correos de gmail
const patronGmail = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

const formContacto = document.getElementById('form-contacto');

formContacto.addEventListener('submit', (e) => {
    // evita que la pagina se recargue
    e.preventDefault();

    const nombre = document.getElementById('nombre').value.trim();
    const correo = document.getElementById('correo').value.trim();
    const mensaje = document.getElementById('mensaje').value.trim();

    const errorNombre = document.getElementById('error-nombre');
    const errorCorreo = document.getElementById('error-correo');
    const errorMensaje = document.getElementById('error-mensaje');
    const mensajeExito = document.getElementById('mensaje-exito');

    // oculta errores antes de validar de nuevo
    errorNombre.classList.add('is-hidden');
    errorCorreo.classList.add('is-hidden');
    errorMensaje.classList.add('is-hidden');
    mensajeExito.classList.add('is-hidden');

    let formularioValido = true;

    // nada puede quedar vacio
    if (nombre === '') {
        errorNombre.classList.remove('is-hidden');
        formularioValido = false;
    }

    // el correo debe ser un gmail bien escrito
    if (correo === '' || !patronGmail.test(correo)) {
        errorCorreo.classList.remove('is-hidden');
        formularioValido = false;
    }

    if (mensaje === '') {
        errorMensaje.classList.remove('is-hidden');
        formularioValido = false;
    }

    if (formularioValido) {
        mensajeExito.classList.remove('is-hidden');
        formContacto.reset();
    }
});