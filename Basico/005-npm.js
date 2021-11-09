let HandlerDates = require("./handlerDates");
let handlerDates = new HandlerDates("11/07/1992");
//JIT, compila justo a tiempo, forma de compilacion

console.log(`Hoy es ${handlerDates.getToday()}`);
console.log(`Naci el ${handlerDates.getToday()}`);
console.log(`Desde mi nacimiento han pasado ${handlerDates.getDiffYears()} años`);
console.log(`Desde mi nacimiento han pasado ${handlerDates.getDiffDays()} días`);
console.log(`Desde mi nacimiento han pasado ${handlerDates.getDiff("hours")} horas`);

//1- numeros aleatorios
let hasta = 10000;
let response = {};

/*
Math.floor = aproxima al numero entero mas bajo
Math.ceil  = aproxima al numero entero mas alto
Math.round = redondea, mayor a 0.5 aproxima al siguiente
*/ 

for (let i = 0; i < hasta; i++) {

    let indice = Math.ceil(Math.random()*20);

    response[indice] = response[indice] ? response[indice]+1:1;
    
}

console.log("Resultado ", response);

let productos = [
    {id:1, nombre:'Escuadra', precio:323.45},
    {id:2, nombre:'Calculadora', precio:234.56},
    {id:3, nombre:'Globo terraqueo', precio:45.67},
    {id:4, nombre:'Paleta pintura', precio:456.78},
    {id:5, nombre:'Reloj', precio:67.89},
    {id:6, nombre:'Agenda', precio:78.90},
];

let respuesta2 = productos.reduce((prev, current, i)=>{
    if(i == 0){
        return {
            name :`${current.nombre}`,
            total:current.precio,
            minor:current,
            major:current
        }
    }else{

        let minor = prev.minor.precio < current.precio ? prev.minor : current;
        let major = prev.major.precio > current.precio ? prev.major : current;

        return {
            name :`${prev.name}, ${current.nombre}`,
            total:prev.total + current.precio,
            minor,
            major

        }
    }
}, {});
respuesta2.promedio = (respuesta2.total / productos.length).toFixed(2);
respuesta2.total = respuesta2.total.toFixed(2)
console.log(respuesta2)

/*
    NPM 

    //Global
    npm install -g nombre-libreria //tratar de no usarlo, solo con nodemon. puede generar incompatibilidad si tenemos varios proyectos en la pc

    //Local, recomendable usar siempre esta forma
    npm install nombre-libreria

    npm init //inicializa un proyecto de nodejs

    ***package.json 
    dependencias version con techito

    **Versionamiento paquetes, se usa el versionado de 3 números
    2.0.4
    2 = major versión, actualizaciones grandes
    0 = minor versión, actualizaciones pequeñas
    4 = patch versión, arreglos o correcciones de defectos

    --simbolo antes de las versiones
    ~ virgulilla, solo se usa para actualizar patch
    sombrero, desde minor hacia abajo si se actualiza, solo los major no
    * asterisco, actualiza todos
    sino se pone nada, no se actualiza nada de ese paquete
    

*/