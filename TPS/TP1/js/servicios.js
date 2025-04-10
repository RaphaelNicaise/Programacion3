// Función para crear y mostrar un mensaje flotante
function mostrarMensajeFlotante(texto, opciones = {}) {
    const {
        duracion = 5000, // Duración del mensaje en milisegundos
        posicion = { bottom: "500px", right: "300px" }, // Posición del mensaje
        estilosAdicionales = {}, // Estilos adicionales opcionales
    } = opciones;

    // Crear el div del mensaje
    const mensaje = document.createElement("div");
    mensaje.id = "mensaje-flotante";
    mensaje.textContent = texto;

    // Estilos base
    Object.assign(mensaje.style, {
        position: "fixed",
        backgroundColor: "#333",
        color: "#fff",
        padding: "15px 20px",
        borderRadius: "10px",
        boxShadow: "0 0 10px rgba(0,0,0,0.3)",
        fontFamily: "sans-serif",
        zIndex: "1000",
        opacity: "0",
        transition: "opacity 0.5s ease-in-out",
        ...posicion, // Aplicar posición
        ...estilosAdicionales, // Aplicar estilos adicionales
    });

    // Agregar el mensaje al body
    document.body.appendChild(mensaje);

    // Forzar render para que funcione la transición
    setTimeout(() => {
        mensaje.style.opacity = "1";
    }, 50);

    // Ocultar después de la duración especificada
    setTimeout(() => {
        mensaje.style.opacity = "0";
        setTimeout(() => {
            mensaje.remove();
        }, 500); // Esperar que termine la transición antes de eliminarlo
    }, duracion);
}

// Mostrar el mensaje después de 2 segundos
setTimeout(() => {
    mostrarMensajeFlotante("🌈Hola lindo.");
}, 1500);

// Mostrar el mensaje después de 2 segundos
setTimeout(() => {
    mostrarMensajeFlotante("Na mentira💀");
}, 3000);

setTimeout(() => {
    mostrarMensajeFlotante("Te asustaste🤣");
}, 4500);
setTimeout(() => {
    mostrarMensajeFlotante("Nos faltaron 2 card pero porque con 4 quedaba mejor.");
}, 6500);
setTimeout(() => {
    mostrarMensajeFlotante("Intentamos hacer un carrusel para que se desplaze solo y ver mas cards pero no pudimos");
}, 11500);

