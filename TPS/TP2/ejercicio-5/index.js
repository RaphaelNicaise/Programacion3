const formulario = document.getElementById("formulario");

formulario.addEventListener("submit", function (event) {
    event.preventDefault();
    
    const nombre = document.getElementById("nombre").value;
    const email = document.getElementById("email").value;
    const edad = document.getElementById("edad").value;

    const mensajesError = document.querySelectorAll(".error");
    mensajesError.forEach(mensaje => mensaje.remove());

    if (nombre === "") {
        const errorNombre = document.createElement("p");
        errorNombre.textContent = "El nombre es obligatorio.";
        errorNombre.classList.add("error");
        document.getElementById("nombre").parentElement.appendChild(errorNombre);
        return;
    }
    if (email === "") {
        const errorEmail = document.createElement("p");
        errorEmail.textContent = "El email es obligatorio.";
        errorEmail.classList.add("error");
        document.getElementById("email").parentElement.appendChild(errorEmail);
        return;
    }
    if (edad === "") {
        const errorEdad = document.createElement("p");
        errorEdad.textContent = "La edad es obligatoria.";
        errorEdad.classList.add("error");
        document.getElementById("edad").parentElement.appendChild(errorEdad);
        return;
    }

    if (edad < 18) {
        const errorEdad2 = document.createElement("p");
        errorEdad2.textContent = "La edad debe ser mayor a 18.";
        errorEdad2.classList.add("error");
        document.getElementById("edad").parentElement.appendChild(errorEdad2);
        return;
    }
});
