const input = document.getElementById("input-text");
const btnEnviar = document.getElementById("boton-enviar");
const formulario = document.getElementById("form");
const ul = document.getElementById("lista")

formulario.addEventListener("submit", (event) => {
    event.preventDefault();
})

btnEnviar.addEventListener("click", () => {
    const contenidoInput = input.value
    if (isNaN(contenidoInput) && contenidoInput != "") {
        const li = document.createElement("li")
        li.innerText = contenidoInput
        ul.appendChild(li)
        
        li.addEventListener("click", () => {
            li.classList.add("completado")
        })
    }
})




