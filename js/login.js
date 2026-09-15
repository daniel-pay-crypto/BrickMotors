// patron simple para validar correos de gmail
const patronGmail = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

const formLogin = document.getElementById('form-login');

formLogin.addEventListener('submit', (e) => {
    e.preventDefault();

    const correo = document.getElementById('correo').value.trim();
    const contrasena = document.getElementById('contrasena').value.trim();

    const errorCorreo = document.getElementById('error-correo');
    const errorContrasena = document.getElementById('error-contrasena');
    const mensajeExito = document.getElementById('mensaje-exito');

    // oculta errores antes de validar de nuevo
    errorCorreo.classList.add('is-hidden');
    errorContrasena.classList.add('is-hidden');
    mensajeExito.classList.add('is-hidden');

    let formularioValido = true;

    // el correo debe ser un gmail bien escrito
    if (correo === '' || !patronGmail.test(correo)) {
        errorCorreo.classList.remove('is-hidden');
        formularioValido = false;
    }

    // la contrasena no puede quedar vacia
    if (contrasena === '') {
        errorContrasena.classList.remove('is-hidden');
        formularioValido = false;
    }

    if (formularioValido) {
        mensajeExito.classList.remove('is-hidden');
        formLogin.reset();

        // si el correo es del admin, entra al panel de administracion
        if (correo.toLowerCase() === 'admin@gmail.com') {
            window.location.href = 'admin.html';
        }
    }
});