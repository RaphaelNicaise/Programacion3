const formulario = document.getElementsByClassName("formulario")[0];
const nombre = document.getElementById("form-nombre");
const email = document.getElementById("form-email");
const edad = document.getElementById("form-edad");
const btnEnviar = document.getElementsByClassName("form-boton")[0];

const preventDefault = () => {
    return formulario.addEventListener("submit", (event) => {
        event.preventDefault();
    })
}

btnEnviar.addEventListener("click", () => {
    const nombreValue = nombre.value
    const emailValue = email.value
    const edadValue = edad.value

    if (nombreValue === "" || emailValue === "" || edadValue === "") {
        alert("Completar todos los campos");
        preventDefault(); // Lo llamo en este if pero se activa entrando o no en este if, checkear sintaxis de funciones
    }
})
