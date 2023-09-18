document.addEventListener('DOMContentLoaded', function() {
    iniciarApp();
});

function iniciarApp() {
    navegacionFija();
    crearGaleria();
    scrollNav();
}

function navegacionFija() {
    const barra = document.querySelector('.header');
    const sobreFestival = document.querySelector('.sobre-festival');
    const body = document.querySelector('body');

    window.addEventListener('scroll', function() {
        //console.log(sobreFestival.getBoundingClientRect());

        if (sobreFestival.getBoundingClientRect().top < 0) {
            //console.log('ya pasamos el elemento');
            barra.classList.add('fijo');
            body.classList.add('body-scroll');
        }   else {
            //console.log('aun nonas');
            barra.classList.remove('fijo');
            body.classList.remove('body-scroll');
        }
    });
}

function scrollNav() {

    const enlaces = document.querySelectorAll('.navegacion-principal a');
    enlaces.forEach( enlace => {
        enlace.addEventListener('click', function(e) {

            e.preventDefault(); //prevenir la accion x defecto q va al instante al enlace

            const seccionScroll = e.target.attributes.href.value; //target es a lo q le he dado click
            const seccion = document.querySelector(seccionScroll);
            seccion.scrollIntoView({ behavior: "smooth" }); //ir al enlace despacio y chidory
        });
    });
}

function crearGaleria() {
    const galeria = document.querySelector('.galeria-imagenes');

    for (let i = 1; i <= 12; i++) {
        const imagen = document.createElement('picture');
        imagen.innerHTML = `
        
        <source srcset="build/img/thumb/${i}.avif" type="image/avif">
        <source srcset="build/img/thumb/${i}.webp" type="image/webp">
        <img loading="lazy" width="200" height="300" src="build/img/thumb/${i}.jpg" alt="imagen galeria">
        
        `;

        //al dar click aparezca mas grande la imagen en ventana modal

        imagen.onclick = function() {
            mostrarImagen(i);
        }

        galeria.appendChild(imagen); //visualiza las imagenes
        
    }
}


function mostrarImagen(id) {
    const imagen = document.createElement('picture');
        imagen.innerHTML = `
        
        <source srcset="build/img/grande/${id}.avif" type="image/avif">
        <source srcset="build/img/grande/${id}.webp" type="image/webp">
        <img loading="lazy" width="200" height="300" src="build/img/grande/${id}.jpg" alt="imagen galeria">
        
        `;

        //crea el overlay(imagen grande) de la imagen
        const overlay = document.createElement('DIV');
        overlay.appendChild(imagen);
        overlay.classList.add('overlay');
        //dar click fuera del modal y q tambien se cierre
        overlay.onclick = function() {
            const body = document.querySelector('body'); 
            body.classList.remove('fijar-body'); //elimine la clase q deja quieto el body 
    
                overlay.remove();
            }

        //boton para cerrar el modal
        const cerrarModal = document.createElement('P');
        cerrarModal.textContent = 'X';
        cerrarModal.classList.add('btn-cerrar');
        //cerrar al dar click
        cerrarModal.onclick = function() {
        const body = document.querySelector('body'); 
        body.classList.remove('fijar-body'); //elimine la clase q deja quieto el body 

            overlay.remove();
        }

        overlay.appendChild(cerrarModal);

        //agregar imagen al html
        const body = document.querySelector('body'); //selecciono la etiqueta body
        body.appendChild(overlay);
        //q no se pueda dar scroll cuando se abre la imagen grande
        body.classList.add('fijar-body'); //esta clase la ponemos en los globales
}