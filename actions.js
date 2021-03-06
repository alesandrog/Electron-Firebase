// Inicializar Firestore
firebase.initializeApp({
  apiKey: '### FIREBASE API KEY ###',
  authDomain: '### FIREBASE AUTH DOMAIN ###',
  projectId: '### CLOUD FIRESTORE PROJECT ID ###'
});

const db = firebase.firestore();

function nuevoCurso() {
  db.collection("curso")
    .add({
      nombre: getNombre(),
      enlace: getEnlace(),
      horaInicio: getInicio(),
      horaFinal: getFinal(),
    })
    .then(function (docRef) {
      console.log("Document written with ID: ", docRef.id);
    })
    .catch(function (error) {
      console.error("Error adding document: ", error);
    });
}

function getNombre() {
  return (nombre = document.getElementById("nombre")).value;
}

function getEnlace() {
  return (enlace = document.getElementById("enlace").value);
}

function getInicio() {
  return (inicio = document.getElementById("horaInicio").value);
}

function getFinal() {
  return (final = document.getElementById("horaFinal").value);
}


//Formulario de registro de nuevos cursos
function modal() {
  Swal.fire({
    title: "<strong>Nuevo Curso</strong>",
    html:
      '<div class="card" style="width: 100%;">' +
      '<div class="card-body">' +
      '<div class="form-row">' +
      '<div class="form-group col-md-12">' +
      '<label for="nombre">Nombre</label>' +
      '<input type="text" class="form-control" id="nombre">' +
      "</div>" +
      "</div>" +
      '<div class="form-row">' +
      '<div class="form-group col-md-12">' +
      '<label for="enlace">Enlace</label>' +
      '<input type="text" class="form-control" id="enlace">' +
      "</div>" +
      "</div>" +
      '<div class="form-row">' +
      '<div class="form-group col-md-12">' +
      '<label for="horaInicio">Hora Inicio</label>' +
      '<input type="time" class="form-control" id="horaInicio">' +
      "</div>" +
      "</div>" +
      '<div class="form-row">' +
      '<div class="form-group col-md-12">' +
      '<label for="horaFinal">Hora Final</label>' +
      '<input type="time" class="form-control" id="horaFinal">' +
      "</div>" +
      "</div>" +
      '<div class="form-row">' +
      '<div class="form-group col-md-12">' +
      '<button type="submit" class="btn btn-primary" onclick="nuevoCurso()">Guardar</button>' +
      "</div>" +
      "</div>" +
      " </div>" +
      "</div>",
    showConfirmButton: false,
    showCloseButton: true,
  });
}

let cursos = document.getElementById("principal");
db.collection("curso").onSnapshot((querySnapshot) => {
  let i = 0;
  cursos.innerHTML = " ";
  let innerAux = " ";
  querySnapshot.forEach((doc) => {
    resto = i % 3;
    if (resto == 0 && i > 0) {
      cursos.innerHTML += '<div class="row mt-2">' + innerAux + "</div>";
      innerAux = " ";
      innerAux += card(
        doc.data().nombre,
        doc.data().horaInicio,
        doc.data().horaFinal,
        doc.data().enlace,
        doc.id
      );
    } else {
      innerAux += card(
        doc.data().nombre,
        doc.data().horaInicio,
        doc.data().horaFinal,
        doc.data().enlace,
        doc.id
      );
    }
    i++;
  });
  if (innerAux.length > 1) {
    cursos.innerHTML += '<div class="row mt-2">' + innerAux + "</div>";
  }
});

function card(nombre, hInicio, hFinal, enl, id) {
  let curso =
    '<div class="col-md-4">' +
    '<div class="card">' +
    '<div class="card-body bg-dark" style="color: whitesmoke;">' +
    '<div class="row">' +
    '<div class="col-8 ">' +
    '<h5 class="card-title">' +
    nombre +
    "</h5>" +
    "</div>" +
    '<div class="col-4 ">' +
    `<button class="btn btn-danger" onclick="eliminar('${id}')"><svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-x" fill="currentColor" xmlns="http://www.w3.org/2000/svg">` +
    '<path fill-rule="evenodd" d="M11.854 4.146a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708-.708l7-7a.5.5 0 0 1 .708 0z"/>' +
    '<path fill-rule="evenodd" d="M4.146 4.146a.5.5 0 0 0 0 .708l7 7a.5.5 0 0 0 .708-.708l-7-7a.5.5 0 0 0-.708 0z"/>' +
    "</svg></button>" +
    "</div>" +
    "</div>" +
    "</div>" +
    '<ul class="list-group list-group-flush">' +
    '<li class="list-group-item">' +
    hInicio +
    " : " +
    hFinal +
    "</li>" +
    "</ul>" +
    '<div class="card-body" style="background-color: white;">' +
    '<button class="btn btn-primary" onclick="redirect(`' +
    enl +
    '`)">Enlace Meet</button>' +
    "</div>" +
    "</div>" +
    "</div>";

  return curso;
}

function eliminar(id) {
  db.collection("curso")
    .doc(id)
    .delete()
    .then(function () {
      console.log("Document successfully deleted!");
    })
    .catch(function (error) {
      console.error("Error removing document: ", error);
    });
}

function redirect(link) {
  const { remote } = require("electron");
  const mainProcess = remote.require("./main.js");

  mainProcess.redirectExternal(link);
}
