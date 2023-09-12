//va a ser nuestro contenedor de nuestras tareas
//instalamos dependencias npm en package.json, aqui se realizan las funciones y se va a conectar el package.json con gulpfile

function tarea( callback ) {
    console.log('mi primer tarea');

    callback();  //funcion q se llama dentro de otra. //llegamos al final y termina de ejecutarse esa funcion
}

//codigo node.js
//tarea en rosadito es como la quiero nombrar
//se manda llamar en la terminal con la parte izquierda morada npx gulp tarea
exports.tarea = tarea; //tarea en blanco es la funcion de arriba