/*
    Las variables let pertenecen al scope donde se crean, no pueden ser modificadas desde otro scope. BLOQUE {} ya sea function o if
*/ 
let nombre = 'Ervin';

function cambiarNombre(){
    nombre = 'mario';
}

cambiarNombre();
console.log(nombre)

//Se pasa un objeto y se destructura
function cambiarApellido({nombre, edad}){

}

//var, el scope es a nivel de funcion
//let, el scope es a nivel del las llaves donde esta

//Funcion anonima es cuando no tiene nombre
let miFuncion = function(){}

//Funcion ifi

//Hoisting en JS
/* 
    Crea las invocaciones al inicio del js, con funciones y var
*/

//Death zone
/*
    parecido al hoisting
    para const
*/

//console.log(chat); da error 
let chat = "mi chat";

//funciones auto invocadas IIFE, function
(function(){
    console.log("ejecutando ifee")
})();

//funciones auto invocadas IIFE, flecha
(()=>{
    console.log("ejecutando ifee")
})();

//Closure
/*
    Se crea siempre que se crea una funcion, el codigo solo existe dentro de la funcion, para sacarlo afuera hay que devolverlo en la funcion
*/

function calculate(valor_a){
    let valor = 1;
    function sumar(){
        return valor + valor_a;
    }

    return {
        sumar,
        valor
    }
}
//let respuesta = calculate(10).sumar();
//console.log(respuesta)

// let respuesta = calculate(10);
// respuesta.valor = 36;
// console.log(respuesta(10).sumar())

let identificadores = [1,2,3]
console.log(`nada: ${identificadores.join(",")}`)

//pasar parametro a IIFE
let nombreDefinido = "ervin";
((nombre)=>{
    console.log(nombre)
})(nombreDefinido)

function multiplicador(num1){
    return function(num2){
        return num1*num2;
    }
}

let result = multiplicador(2)(3)
let duplicar = multiplicador(2)
let triplicar = multiplicador(3)

//Clases

class Persona{
    constructor(id){
        this.id = id;
    }
}

//herencia. Las clases de js tiene herencia, polimorfismo
class Cliente extends Persona{
    static contador = 0;
    edad = 10
    constructor(nombre){
        super()
        //Los atributos de la clase siempre se declaran aqui, no van global como en otros lenguajes
        this.nombre = nombre;
    }

    getNombre(){
        let apellido = "apellido";
        return this.nombre + " " + super.id + " " +this.edad + " " + apellido;
    }

    setEdad(edad){
        this.edad = edad;
    }
}

let cli = new Cliente("Ervin class");
cli.setEdad(40);
console.log(cli.getNombre())


