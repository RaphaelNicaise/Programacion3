//USE IA OARA HACER ESTE ESPECIE DE TUTORIAL/GUIA EN JS

document.addEventListener("DOMContentLoaded", () => {
  const buttonTutorial = document.getElementById("button-tutorial");
  const guia = document.getElementById("guia");
  const guiaTexto = document.getElementById("guia-texto");
  const btnNext = document.getElementById("btn-next");
  const btnPrev = document.getElementById("btn-prev");

  const items = document.querySelectorAll(".list-item li");

  const mensajes = [
    "Este es el inicio en donde encontraras informacion de la empresa.",
    "Aquí podés ver los servicios con mas demanda que ofrecemos.",
    "Aquí podés ver todo sobre la experiencia que podras vivir con nuestra IA.",
    "Y desde acá podés contactarte con nosotros."
  ];

  let paso = 0;

  function mostrarPaso(index) {
    if (index >= 0 && index < items.length) {
      const item = items[index];
      const rect = item.getBoundingClientRect();

      guia.style.left = `${rect.right - 180}px`;
      guia.style.top = `${rect.top + window.scrollY + 40}px`;

      guiaTexto.textContent = mensajes[index];
      guia.style.display = "block";

      // Mostrar u ocultar el botón "Atrás"
      btnPrev.style.display = index === 0 ? "none" : "inline-block";

      // Cambiar el texto del botón "Siguiente" a "Finalizar" en el último paso
      btnNext.textContent = index === items.length - 1 ? "Finalizar" : "Siguiente";
    }
  }

  btnNext.addEventListener("click", () => {
    if (paso < items.length - 1) {
      paso++;
      mostrarPaso(paso);
    } else {
      guia.style.display = "none";
      paso = 0;
      mostrarMensajeFinal()

    }
  });

  btnPrev.addEventListener("click", () => {
    if (paso > 0) {
      paso--;
      mostrarPaso(paso);
    }
  });

  buttonTutorial.addEventListener("click", () => {
    paso = 0;
    mostrarPaso(paso);
    buttonTutorial.style.visibility = "hidden"; // Hacer el botón invisible
  });
});
btnNext.addEventListener("click", () => {
  if (paso < items.length - 1) {
    paso++;
    mostrarPaso(paso);
  } else {
    guia.style.display = "none";
    paso = 0;

    // Mostrar mensaje de finalización
    const mensajeFinal = document.createElement("div");
    mensajeFinal.textContent = "Disfrute la experiencia";
    mensajeFinal.style.position = "fixed";
    mensajeFinal.style.top = "50%";
    mensajeFinal.style.left = "50%";
    mensajeFinal.style.transform = "translate(-50%, -50%)";
    mensajeFinal.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
    mensajeFinal.style.color = "white";
    mensajeFinal.style.padding = "20px";
    mensajeFinal.style.borderRadius = "10px";
    mensajeFinal.style.zIndex = "1000";
    document.body.appendChild(mensajeFinal);

    // Ocultar el mensaje después de 2 segundos
    setTimeout(() => {
      document.body.removeChild(mensajeFinal);
    }, 2000);
  }
});











function mostrarMensajeFinal() {
  setTimeout(() => {
    const mensaje = document.createElement("div");
    mensaje.textContent = "Disfrute la experiencia";
    mensaje.style.position = "fixed";
    mensaje.style.top = "36%";
    mensaje.style.left = "50%";
    mensaje.style.transform = "translate(-50%, -50%)";
    mensaje.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
    mensaje.style.color = "white";
    mensaje.style.padding = "20px";
    mensaje.style.borderRadius = "10px";
    mensaje.style.zIndex = "1000";
    document.body.appendChild(mensaje);

    setTimeout(() => {
      document.body.removeChild(mensaje);
    }, 1800);
  }, 1000);
}