//va a ser nuestro contenedor de nuestras tareas
//instalamos dependencias npm en package.json, aqui se realizan las funciones y se va a conectar el package.json con gulpfile

const { src, dest, watch, parallel } = require("gulp"); //el gulp q instalamos 4.0.2, src identifica el archivo, dest lo guarda

//CSS
const sass = require("gulp-sass")(require("sass"));
const plumber = require("gulp-plumber");

//IMAGENES
const cache = require('gulp-cache')
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');

function css(done) {

    src("src/scss/**/*.scss") //identificar el archivo de SASS todas las carpetas y archiovs sass al guardar
        .pipe( plumber() ) //muestra errores de codigo sin detener la terminal
        .pipe( sass() ) //compilarlo
        .pipe( dest("build/css") ); //almacenarla en el disco duro

    done(); //callback q avisa a gulp cuando llegamos al final de la funcion
}

function imagenes(done) {

    const opciones = {
        optimizationLevel: 3 //estas opciones en la doc de esta libreria
    }

    src('src/img/**/*.{png,jpg}')
        .pipe( cache( imagemin(opciones) ) )
        .pipe( dest('build/img') )
    done();
}

function versionWebp(done) {

    const opciones = {
        quality: 50  //el numero va de 0 a 100
    };

    src('src/img/**/*.{png,jpg}') //cuando son dos formatos entre llaves, sin llaves en scss
        .pipe( webp(opciones) ) //convertimos 
        .pipe( dest('build/img') ) //q las guarde en esta carpeta
    done();
}

function versionAvif(done) {

    const opciones = {
        quality: 50  //el numero va de 0 a 100
    };

    src('src/img/**/*.{png,jpg}') //cuando son dos formatos entre llaves, sin llaves en scss
        .pipe( avif(opciones) ) //convertimos 
        .pipe( dest('build/img') ) //q las guarde en esta carpeta
    done();
}

function javaScript(done) {
    src('src/js/**/*.js')
        .pipe(dest('build/js'));
    done();
}

function dev(done) {

    watch("src/scss/**/*.scss", css);
    watch("src/js/**/*.js", javaScript); //javaScript es la funcion q se manda a llamar
    done();
}

exports.css = css; //mandamos llamar a la funcion css
exports.js = javaScript;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.dev = parallel(imagenes, versionWebp, versionAvif, javaScript, dev); //ejecuta la tarea versionWebp y despues la de dev

//npm run dev
//npx gulp dev

//npm run nombreTarea
