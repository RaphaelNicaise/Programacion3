// Obtener los elementos relevantes
const formulario = document.getElementById("formulario");
const listaTareas = document.getElementById("lista-tareas");
const btnFormulario = document.getElementById("boton-formulario");

// Agregar tarea cuando se envíe el formulario
btnFormulario.addEventListener("click", (event) => {
    event.preventDefault();  // Prevenir la acción por defecto (recargar la página)
    const tarea = document.getElementById("text-area-tareas").value;  // Obtener el texto de la tarea
    if (tarea) {  // Si hay texto en el campo
        const nuevoLi = document.createElement("li");  // Crear un nuevo <li>
        nuevoLi.textContent = tarea;  // Asignar el texto de la tarea al <li>
        listaTareas.appendChild(nuevoLi);  // Agregar el <li> a la lista
        document.getElementById("tex.area.tareas").value = "";  // Limpiar el campo de texto
    }
});

// Marcar tarea como completada al hacer clic
listaTareas.addEventListener("click", function(event) {
    if (event.target.tagName === "LI") {  // Verificar que se hizo clic en un <li>
        event.target.classList.toggle("completado");  // Alternar la clase 'completado'
    }
});
