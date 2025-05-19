const nombre = document.getElementById("nombre");
const email = document.getElementById("email");
const edad = document.getElementById("edad");
const botonEnviar = document.getElementById("botonEnviar");
let error=false;


botonEnviar.addEventListener("click", validarFormulario);
function validarFormulario(event){
    event.preventDefault();
    const errorNombre = document.getElementById("errorNombre");
    const errorEmail = document.getElementById("errorEmail");
    const errorEdad = document.getElementById("errorEdad");
    errorNombre.textContent = "";
    errorEmail.textContent = "";
    errorEdad.textContent = "";
    error=false;
    
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if(nombre.value === ""){
        errorNombre.textContent = "El nombre es obligatorio";
        error=true;
    }

    if(email.value === ""){
        errorEmail.textContent = "El email es obligatorio";
        error=true;
    }else if(!regexEmail.test(email.value)){
        errorEmail.textContent = "El email no es válido";
        error=true;
    }

    if(edad.value === ""){
        errorEdad.textContent = "La edad es obligatoria";
        error=true;
    }else if(isNaN(edad.value)){
        errorEdad.textContent = "La edad debe ser un número";
        error=true;
    }else if(edad.value < 18){
        errorEdad.textContent = "Debes ser mayor de edad";
        error=true;
    }

    
    if(!error){
        alert("Formulario enviado correctamente");
    }
}







