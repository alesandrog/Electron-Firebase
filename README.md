# App Horario

Implementación de un CRUD para almacenar cursos con sus respectivos horarios.

## Tecnologías Utilizadas

Firebase [Cloud Firestore](https://firebase.google.com/docs/firestore?hl=es-419)

[Electron](https://github.com/electron/electron) v. 9.3.0


## Uso

* Copiar el objeto `firebaseConfig` generado para su proyecto dentro del archivo `actions.js`
```javascript
firebase.initializeApp({
  apiKey: '### FIREBASE API KEY ###',
  authDomain: '### FIREBASE AUTH DOMAIN ###',
  projectId: '### CLOUD FIRESTORE PROJECT ID ###'
});
```
* En la consola de Cloud Firestore, crear una coleccion llamada **curso** 
* La colección curso recibe documentos con el siguiente formato
```javascript
enlace : string
horaFinal : string
horaInicio : string
nombre : string
```


## License
[MIT](https://choosealicense.com/licenses/mit/)