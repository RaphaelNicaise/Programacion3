
document.getElementById("submit").onclick = function() {
    let texto=document.getElementById("input").value;

    let nuevoli=document.createElement("li");
    nuevoli.textContent=texto;

    document.querySelector("ul").appendChild(nuevoli);


    let boton =document.createElement("button");
    boton.textContent="Eliminar";

    boton.onclick=function(){
        nuevoli.remove();
    }
    nuevoli.appendChild(boton);
}

