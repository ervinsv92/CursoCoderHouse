/*
    Callbacks

    Son funciones que se pasan como parametro.
    Siempre pasarlo como último parametro por convención.
    El error en el callback, por convencion se pasa como primer parametro el error y el segundo la respuesta.
*/

let suma = (a,b) => a+b;

let operacion =(num1, num2, cb)=>{
    return cb(num1, num2);
}

let res = operacion(10,43,suma);

console.log(`La operación nos da: ${res}`);

/*
    Promesas

    Ejecutar codigo asyncronico y esperar la respuesta. Codigo no bloqueante.
*/

let promesa = function dividir(dividiendo, divisor){
    return new Promise((resolve, reject)=>{
        if(divisor == 0){
            //rechazar
            reject('No se puede dividir por 0')
        }else{
            resolve('Clase de programacion');
        }
    });
}

//se pueden anidar los then
promesa.then(res=>{})
.then(res=>{})
.catch(err=>{});
