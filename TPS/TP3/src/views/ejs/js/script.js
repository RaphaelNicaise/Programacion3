
// Seleccionamos todos los botones dentro del contenedor ".funciones"
const botones = document.querySelectorAll('.funciones button.register-btn');

// Variable para saber si el usuario está logueado
let usuarioLogueado = false;

// Función para activar o desactivar "visualmente" los botones
function activarBotones(activar) {
    botones.forEach(boton => {
        if (activar) {
            boton.classList.remove('deshabilitado');
        } else {
            boton.classList.add('deshabilitado');
        }
    });
    usuarioLogueado = activar;
}

// Al cargar la página, "deshabilitamos" los botones visualmente
activarBotones(false);

// Escuchamos el envío del formulario de login
document.getElementById('loginForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const password = document.getElementById('password').value.trim();
    const loginContainer = document.querySelector('.login');

    loginContainer.classList.remove('success', 'error');
    document.getElementById('mensaje').textContent = '';

    if (!password) {
        document.getElementById('mensaje').textContent = 'Por favor ingrese la contraseña';
        loginContainer.classList.add('error');
        activarBotones(false);
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/api/v1/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password })
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem('token', data.token);
            document.getElementById('mensaje').textContent = 'Inicio de sesión exitoso';
            loginContainer.classList.add('success');

            activarBotones(true);
        } else {
            document.getElementById('mensaje').textContent = data.error || 'Contraseña incorrecta';
            loginContainer.classList.add('error');
            activarBotones(false);
        }
    } catch (error) {
        document.getElementById('mensaje').textContent = 'Error de conexión con el servidor';
        loginContainer.classList.add('error');
        activarBotones(false);
    }
});

// Cuando alguien hace click en un botón "deshabilitado" mostramos alerta y bloqueamos acción
botones.forEach(boton => {
    boton.addEventListener('click', function (e) {
        if (!usuarioLogueado) {
            e.preventDefault();
            alert('No puedes acceder hasta que ingreses la contraseña correctamente.');
        }
    });
});

