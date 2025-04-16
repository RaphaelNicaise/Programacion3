const titulo =document.getElementById("TituloPrincipal");
titulo.textContent="Titulo modificado con js";

const parrafo = document.getElementsByClassName("parrafo");
parrafo[0].style.color = "red";
parrafo[1].style.color = "blue";

const elementosLi=document.querySelectorAll("li");
elementosLi[0].textContent+=" primer parrafo al que le agrego algo";
elementosLi[1].textContent+=" segundo parrafo al que le agrego"
elementosLi[2].textContent+=" tercer parrafo al que le agrego algo";

