const parrafos =document.querySelectorAll(".parrafo");



function resaltarParrafo(parrafo){
    parrafo.classList.add("resaltado");
}
function ocultarParrafo(parrafo){
    parrafo.classList.toggle("oculto");
}


document.getElementById("resaltar").onclick=function(){
    parrafos.forEach(resaltarParrafo)
}

document.getElementById("ocultar").onclick=function(){
    parrafos.forEach(ocultarParrafo)
}