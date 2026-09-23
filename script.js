const estrellas = document.querySelectorAll("#estrellas span");
const textoCalificacion = document.getElementById("textoCalificacion");
const btnEnviar = document.getElementById("btnEnviar");
const mensaje = document.getElementById("mensaje");

let calificacion = 0;

const textos = {
    1: "Muy mala",
    2: "Mala",
    3: "Regular",
    4: "Muy buena",
    5: "Excelente"
};

estrellas.forEach(estrella => {

    estrella.addEventListener("click", () => {

        calificacion = Number(estrella.dataset.value);

        estrellas.forEach(item => {
            item.classList.remove("activa");
        });

        for (let i = 0; i < calificacion; i++) {
            estrellas[i].classList.add("activa");
        }

        textoCalificacion.textContent = textos[calificacion];
    });

});

btnEnviar.addEventListener("click", () => {

    const grupo = document.getElementById("grupo").value.trim();
    const claridad = document.getElementById("claridad").value;
    const dominio = document.getElementById("dominio").value;
    const presentacion = document.getElementById("presentacion").value;
    const comentario = document.getElementById("comentario").value.trim();

    if (
        grupo === "" ||
        calificacion === 0 ||
        claridad === "" ||
        dominio === "" ||
        presentacion === ""
    ) {
        alert("Por favor completa todos los campos.");
        return;
    }

    const evaluacion = {
        grupo: grupo,
        calificacion: calificacion,
        claridad: claridad,
        dominio: dominio,
        presentacion: presentacion,
        comentario: comentario,
        fecha: new Date().toLocaleString()
    };

    let evaluaciones =
        JSON.parse(localStorage.getItem("evaluaciones")) || [];

    evaluaciones.push(evaluacion);

    localStorage.setItem(
        "evaluaciones",
        JSON.stringify(evaluaciones)
    );

    mensaje.style.display = "block";
    mensaje.textContent = "¡Gracias por calificar nuestra exposición!";

    document.getElementById("grupo").value = "";
    document.getElementById("claridad").value = "";
    document.getElementById("dominio").value = "";
    document.getElementById("presentacion").value = "";
    document.getElementById("comentario").value = "";

    estrellas.forEach(item => {
        item.classList.remove("activa");
    });

    calificacion = 0;
    textoCalificacion.textContent = "Selecciona una calificación";

});