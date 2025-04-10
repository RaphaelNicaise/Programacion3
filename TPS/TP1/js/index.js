// Función para crear y mostrar un mensaje flotante
function mostrarMensajeFlotante(texto, opciones = {}) {
    const {
        duracion = 2000, // Duración del mensaje en milisegundos
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

// Mostrar los mensajes en diferentes posiciones
setTimeout(() => {
    mostrarMensajeFlotante("Bienvenidos.", { posicion: { top: "200px", left: "700px" } });
}, 1500);

setTimeout(() => {
    mostrarMensajeFlotante("Somos una empresa dedicada a ayudarte en distintos aspectos de tu vida en base a la IA", { posicion: { top: "250px", right: "400px" } });
}, 3000);

setTimeout(() => {
    mostrarMensajeFlotante("Este es el home", { posicion: { bottom: "580px", left: "580px" } });
}, 5000);

setTimeout(() => {
    mostrarMensajeFlotante("Este es el apartado donde verás", { posicion: { top: "50px", right: "600px" } });
    mostrarMensajeFlotante("los servicios que ofrecemos!!", { posicion: { top: "100px", right: "600px" } });
}, 7000);

setTimeout(() => {
    mostrarMensajeFlotante("experimentar con nuestra ayuda" , { posicion: { top: "100px", left: "780px" } });
    mostrarMensajeFlotante("Aqui conoceras sobre que experiencias puedes", { posicion: { bottom: "590px", left: "780px" } });
}, 9500);

setTimeout(() => {
    mostrarMensajeFlotante("Si estas interesado, aqui podras contactarnos", { posicion: { bottom: "580px", right: "200px" } });
}, 12500);
