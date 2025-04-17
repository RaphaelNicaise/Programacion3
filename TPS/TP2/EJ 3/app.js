const parrafos = document.querySelectorAll(".parrafo");
const btnResaltar = document.querySelector(".boton-resaltar")
const btnOcultar = document.querySelector(".boton-ocultar")

console.log(btnResaltar)

btnResaltar.addEventListener("click", () => {
    for (let i = 0; i < parrafos.length; i++) {
        parrafos[i].classList.add("resaltado")
    } 
})

btnOcultar.addEventListener("click", () => {
    for (let i = 0; i < parrafos.length; i++) {
        parrafos[i].classList.toggle("oculto")
}
})