//variables globales 
let numeroSecreto = 0
let numeroIntentos = 1;
let numeroMaximo = 10;
let listaNumerosSorteados = [];

//funcion generica de etiquetas 
function asignarTextoElemento(elemento, texto) {
    // el puente entre JS a la etiqueta h1 y p 
    let elementoHtml = document.querySelector(elemento);
    elementoHtml.innerHTML = texto; 
}
//funcion de eventos para el boton para 'Intentar' con la funcion intentoUsuario();
function verificarIntento() {
    //input es la etiqueta de html de entrada de texto, va a buscar el valor del id definido en el input del html y asignarle un valor numerico
    let numeroUsuario = parseInt(document.getElementById('valorUsuario').value);
    // (===) tiene que ser igual en valor y tipo de dato 
    if (numeroUsuario === numeroSecreto) {
        asignarTextoElemento('p',`¡Acertaste! en ${numeroIntentos} ${(numeroIntentos === 1) ? 'vez' : 'veces'}`);
        document.getElementById('reiniciar').removeAttribute('disabled'); // activa el boton para reiniciar el juego cuadno ganas.
    } else {
        if (numeroSecreto > numeroUsuario) {
            asignarTextoElemento('p','El numero secreto es mayor');
        } else {
            asignarTextoElemento('p','El numero secreto es menor');
        }
        numeroIntentos ++;   
        limpiarCaja();   
    }
}
// funcion para genera el numero secreto para el juego. 
function generarNumeroSecreto() {
    let numeroGenerado = Math.floor(Math.random()*numeroMaximo)+1; 
    console.log(numeroGenerado);
    console.log(listaNumerosSorteados);
    //verificar si los numeros se terminaron 
    if (listaNumerosSorteados.length == numeroMaximo) {
        asignarTextoElemento('p','Ya se sortearon todos los numeros posibles.');
        document.getElementById('intentar').setAttribute('disabled', 'true'); // desactiva el boton con parametro coloca esto con el valor
    } else {
        // si el numero generado esta en la lista se hace una condicion.
        if (listaNumerosSorteados.includes(numeroGenerado)) { // verifica si el numero existe dentro de la lista con include como parametro el numero generado. 
            return generarNumeroSecreto(); // funcion recursiva. 

        } else {
            listaNumerosSorteados.push(numeroGenerado);
            return numeroGenerado;
        }
    }
    
    
}
// funcion para limpiar cuadro de texto 
function limpiarCaja() {
    document.getElementById('valorUsuario').value = ''; 
}
// funcion para los mensajes iniciales 
function condicionesIniciales() {
    asignarTextoElemento('h1', 'Juego del numero secreto.');
    asignarTextoElemento('p',`Ingrese un numero del 1 al ${numeroMaximo}`);
    // generar el numero secreto
    numeroSecreto = generarNumeroSecreto();
    // reiniciar los intentos 
    numeroIntentos = 1;
}
// funcion para reiniciar el juego
function reiniciarJuego() {
    // primero se necesita limpiar la caja 
    limpiarCaja();
    // condiciones iniciales
    condicionesIniciales();
    // deshabilitar el boton de nuevo juego
    document.getElementById('reiniciar').setAttribute('disabled', 'true'); // desactiva el boton con parametro coloca esto con el valor
}

//llamadas de funcion 
condicionesIniciales();

