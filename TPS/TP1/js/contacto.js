setTimeout(() => {
    const mensaje = document.createElement('p');
    mensaje.textContent = '¡Este formulario tiene funcionalidad! sera enviado a mi mail.';
    mensaje.style.position = 'fixed';
    mensaje.style.bottom = '400px';
    mensaje.style.right = '300px';
    mensaje.style.backgroundColor = '#f0f8ff'; // Color más claro y amigable
    mensaje.style.color = '#333'; // Texto oscuro para mejor contraste
    mensaje.style.padding = '15px';
    mensaje.style.borderRadius = '10px';
    mensaje.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)'; // Sombra para un efecto más moderno
    mensaje.style.fontFamily = 'Arial, sans-serif';
    mensaje.style.fontSize = '18px';
    mensaje.style.zIndex = '1000';
    document.body.appendChild(mensaje);

    // Opcional: Eliminar el mensaje después de unos segundos
    setTimeout(() => {
        mensaje.remove();
    }, 4000);
}, 1000);