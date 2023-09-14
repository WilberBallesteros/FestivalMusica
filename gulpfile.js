//va a ser nuestro contenedor de nuestras tareas
//instalamos dependencias npm en package.json, aqui se realizan las funciones y se va a conectar el package.json con gulpfile

const { src, dest, watch } = require("gulp"); //el gulp q instalamos 4.0.2, src identifica el archivo, dest lo guarda
const sass = require("gulp-sass")(require("sass"));
const plumber = require("gulp-plumber");

function css(done) {

    src("src/scss/**/*.scss") //identificar el archivo de SASS todas las carpetas y archiovs sass al guardar
        .pipe( plumber() ) //muestra errores de codigo sin detener la terminal
        .pipe( sass() ) //compilarlo
        .pipe( dest("build/css") ); //almacenarla en el disco duro

    done(); //callback q avisa a gulp cuando llegamos al final de la funcion
}

function dev(done) {

    watch("src/scss/**/*.scss", css);

    done();
}

exports.css = css; //mandamos llamar a la funcion css
exports.dev = dev;

//npm run dev
//npx gulp dev

//npm run nombreTarea