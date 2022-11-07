//Variables
let tarjetasDestapadas=0;
let tarjeta1=null;
let tarjeta2=null;
let primerResultado=null;
let segundoResultado=null;
let movimientos=0;
let aciertos=0;
let temporalizador=false;
let tiempo = 180;
let tiempoInicial=180;
let tiempoAtras=null;

let aciertoAudio =new Audio('./sounds/ganar.wav');
let normalAudio =new Audio('./sounds/normal.wav');
let perderAudio =new Audio('./sounds/perder.wav');

//Apuntando a documento HTML
let mostrarMovimientos=document.getElementById('movimientos');
let mostrarAciertos=document.getElementById('aciertos');
let mostrarTiempo= document.getElementById('tiempo_restante');

let numeros = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,14,14,15,15];
//Crea números aleatorios con una función flecha 
numeros= numeros.sort(()=>{return Math.random()-0.5});
console.log(numeros);
//Funciones
function contarTiempo(){
    tiempoAtras = setInterval(() => {
        tiempo--;
        mostrarTiempo.innerHTML=`Tiempo: ${tiempo} segundos`;
        if(tiempo==0){
            clearInterval(tiempoAtras);
            bloquearTarjetas();
        }
    }, 1000);
}

function bloquearTarjetas(){
    for (let i=0;i<=29;i++){
        let tarjetaBloqueada = document.getElementById(i);
        tarjetaBloqueada.innerHTML=`<img src="./images/fotos_juego1/${numeros[i]}.png" alt="emoji de cerditos">`;
        tarjetaBloqueada.disabled=true;
    }
}

//Funcion primordial
function destapar(id) {

    if(temporalizador==false){
        contarTiempo();
        temporalizador=true;
    }

    tarjetasDestapadas++;
    console.log(tarjetasDestapadas);

    if(tarjetasDestapadas == 1){
        //Mostrar el primer número
        tarjeta1 = document.getElementById(id);
        primerResultado=numeros[id];
        tarjeta1.innerHTML= `<img src="./images/fotos_juego1/${primerResultado}.png" alt="emoji de cerditos">`;
        normalAudio.play();
        //Desahilitar primer boton
        tarjeta1.disabled=true;

    }else if(tarjetasDestapadas==2){
        //Mostrar segundo número
        tarjeta2=document.getElementById(id);
        segundoResultado=numeros[id];
        tarjeta2.innerHTML=`<img src="./images/fotos_juego1/${segundoResultado}.png" alt="caras de cerditos">`;
        //Desahilitamos segundo botón
        tarjeta2.disabled=true;
        //Incrementamos movimientos
        movimientos++;
        //Permite Strings (información actualizada)
        mostrarMovimientos.innerHTML=`Movimientos: ${movimientos}`;
        
        if(primerResultado== segundoResultado){
            //Reseteamos una vez acertado
            tarjetasDestapadas=0;

            //Aumento de aciertos
            aciertos++;
            mostrarAciertos.innerHTML= `Aciertos: ${aciertos}`;
            aciertoAudio.play();
            if(aciertos==15){
                clearInterval(tiempoAtras);
                mostrarAciertos.innerHTML= `Aciertos: ${aciertos} <3`;
                mostrarTiempo.innerHTML=`Enhorabuena!! Acertaste en ${tiempoInicial-tiempo} segundos`
                mostrarMovimientos.innerHTML=`Movimientos: ${movimientos} O.o`
            }
        }else{
            perderAudio.play();
            //Mostrar temporalmente los valores y volver a taparlos
            setTimeout(() => {
               tarjeta1.innerHTML ='  ';
               tarjeta2.innerHTML = '  ';
               tarjeta1.disabled=false;
               tarjeta2.disabled=false;
               tarjetasDestapadas=0; 
            }, 800);
        }

    }
}