// patron simple para validar correos de gmail
const patronGmail = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

const formRegistro = document.getElementById('form-registro');

formRegistro.addEventListener('submit', (e) => {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value.trim();
    const correo = document.getElementById('correo').value.trim();
    const contrasena = document.getElementById('contrasena').value.trim();

    const errorNombre = document.getElementById('error-nombre');
    const errorCorreo = document.getElementById('error-correo');
    const errorContrasena = document.getElementById('error-contrasena');
    const mensajeExito = document.getElementById('mensaje-exito');

    // oculta errores antes de validar de nuevo
    errorNombre.classList.add('is-hidden');
    errorCorreo.classList.add('is-hidden');
    errorContrasena.classList.add('is-hidden');
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

    if (contrasena === '') {
        errorContrasena.classList.remove('is-hidden');
        formularioValido = false;
    }

    if (formularioValido) {
        mensajeExito.classList.remove('is-hidden');
        formRegistro.reset();
    }
});