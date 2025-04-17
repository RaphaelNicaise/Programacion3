let input = document.getElementById("input-agregar");
let btnAgregar = document.getElementById("boton-agregar");
let ul = document.getElementById("lista")

let botonEliminarId = 0;
btnAgregar.addEventListener("click", () => {
    let valorInput = input.value;
    let li = document.createElement("li");
    li.textContent = valorInput;
    botonEliminarId += 1;
    li.innerHTML += ` <button id='botonEliminar${botonEliminarId}'>Eliminar</button>`;
    ul.appendChild(li);

    valorBotonEliminar = document.getElementById(`botonEliminar${botonEliminarId}`);
    valorBotonEliminar.addEventListener("click", () => {
        li.remove();
    })
});