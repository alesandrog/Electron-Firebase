


// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
    apiKey: "AIzaSyDl4VNsS4xy1hq9bL-xeXZZ4wFybLAGYcE",
    authDomain: "proyectohorario-cafc2.firebaseapp.com",
    projectId: "proyectohorario-cafc2"
  });
  
  const db = firebase.firestore();



function nuevoCurso(){
    db.collection("curso").add({
        nombre: getNombre(),
        enlace: getEnlace(),
        horaInicio: getInicio(),
        horaFinal: getFinal()
    })
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
}  


function getNombre(){
    return nombre = document.getElementById('nombre');
}

function getEnlace(){
    let enlace = document.getElementById('enlace');
    return enlace.value;
}

function getInicio(){
    let inicio = document.getElementById('horaInicio');
    return inicio.value;
}

function getFinal(){
    let final  = document.getElementById('horaFinal');
    return final.value;
}



function modal (){
    Swal.fire({
        title: '<strong>HTML <u>example</u></strong>',
        icon: 'info',
        html: 
        
                
        '<div class=\"card\" style=\"width: 18rem;\">'+
        '<div class="card-body">'+
        '  <h5 class="card-title">Nuevo Curso</h5>'+

        '<div class="form-row">'+
        '<div class="form-group col-md-6">'+
          '<label for="nombre">Nombre</label>'+
          '<input type="text" class="form-control" id="nombre">'+
        '</div>'+
        '</div>'+
        '<div class="form-row">'+
        '<div class="form-group col-md-6">'+
          '<label for="enlace">Enlace</label>'+
          '<input type="text" class="form-control" id="enlace">'+
        '</div>'+
        '</div>'+
        '<div class="form-row">'+
          '<div class="form-group col-md-6">'+
            '<label for="horaInicio">Hora Inicio</label>'+
            '<input type="time" class="form-control" id="horaInicio">'+
          '</div>'+
        '</div>'+
          '<div class="form-row">'+
            '<div class="form-group col-md-6">'+
              '<label for="horaFinal">Hora Final</label>'+
              '<input type="time" class="form-control" id="horaFinal">'+
            '</div>'+
        '</div>'+
        '<div class="form-row">'+
        '<button type="submit" class="btn btn-primary" onclick="nuevoCurso()">Guardar</button>'+
        '</div>'+
        '<div class="form-row">'+
            '<button  class="btn btn-primary" onclick="printNombre()">Print</button>'+
            '</div>'+



       ' </div>'+
      '</div>'
      ,
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText:
          '<i class="fa fa-thumbs-up"></i> Great!',
        confirmButtonAriaLabel: 'Thumbs up, great!',
        cancelButtonText:
          '<i class="fa fa-thumbs-down"></i>'
      });


}

let cursos = document.getElementById('principal');

db.collection("curso").onSnapshot((querySnapshot) => {
  cursos.innerHTML = ' ';
  querySnapshot.forEach((doc) => {
      cursos.innerHTML += card( doc.data().nombre , doc.data().horaInicio , doc.data().horaFinal, doc.data().enlace, doc.id);
      console.log(card( doc.data().nombre , doc.data().horaInicio , doc.data().horaFinal, doc.data().enlace, doc.id));
  });
});

function card( nombre , hInicio, hFinal , enl, id){
    let curso = 
    '<div class="card" style="width: 18rem;">'+
    '<div class="card-body">'+
      '<h5 class="card-title">' + nombre + '</h5>'+
      `<button class = "btn btn-danger" onclick="eliminar('${id}')">Eliminar</button>`+
      '<p class="card-text"></p>'+
    '</div>'+
    '<ul class="list-group list-group-flush">'+
      '<li class="list-group-item">'+ hInicio + ' : '+ hFinal + '</li>'+
    '</ul>'+
    '<div class="card-body">'+
      '<a href="'  + enl + '" class="card-link" >Enlace Meet</a>'+
    '</div>'+
  '</div>';

  return curso;
}

function eliminar(id){
  db.collection("curso").doc(id).delete().then(function() {
    console.log("Document successfully deleted!");
}).catch(function(error) {
    console.error("Error removing document: ", error);
});
}