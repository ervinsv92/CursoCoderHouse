//Filter
let array = [1,1,'string', {name:'Ervin'}, null];
console.log("Filter: ", array.filter(x => typeof x === 'object'));

//Map
let numeros = [10,2,30,450,5];
console.log("Map: ", numeros.map(elemento => elemento*2));

//Map objetos
let arrayObjetos = [{name:'ervin', edad:10}, {name:'zafiro', edad:12}, {name:'juan', edad:11}];
console.log("Map object: ", arrayObjetos.map(x => x.name));

//find
console.log(arrayObjetos.find(x => x.name === 'ervin'));

//some, devuelve true si solo uno cumple la condicion
console.log("some: ", numeros.some(x => x > 2))

//every, devuelve true si todos los datos cumplen la condicion
console.log("every: ", numeros.every(x => x >= 1))

//sort, ordena un array numeros
console.log("sort enteros: ", numeros.sort((a,b) => a - b))

//sort, ordena un array string
let palabras = ['gato', 'avion', 'perro', 'dedo']
console.log("sort string: ", palabras.sort())

//sort, ordena un arrat de objetos
console.log("sort objetos: ", arrayObjetos.sort((a,b) => {
    if(a.name > b.name) return 1;
    if(a.name < b.name) return -1;
    return 0
}))

//push, ingresar dato al final 
palabras.push("escorpion")
console.log("push: ", palabras)

//pop, quita el ultimo elemento de la lista, el return por defecto devuelve lo que se borró, pero el array original queda com el cambio aplicado.
palabras.pop()
console.log("pop: ", palabras)

//shift, saca el primer elemento del array
palabras.shift()
console.log("shift: ", palabras)

//unshift, ingresa el primer elemento del array, permite agregar varios
palabras.unshift("mario")
console.log("unshift: ", palabras)

//join, une los valores de un array, se le pueden pasar parametros para que sirva de separador, por defecto es una coma ","
let arrayJoin = numeros.join(",")
console.log("join: ", arrayJoin)

//split, separa un string en un array por un string de separacion
//param1 = dividir
//param2 = limite, por defecto no se coloca y usa todos los elementos que separó
console.log("split", arrayJoin.split(",",2))

//indexOf
//param1 solo elemento primario
//param2 indice desde donde comienza a buscar
console.log("indexOf: ", palabras.indexOf('perro'))

//include, indica si un elemento existe en un arreglo, con solo 1 devuelve true, sino tira false
//param1 validacion
//param2 desde que indice valida
console.log("includes: ", palabras.includes('perro'))

//buscar como se hace
console.log("includes object: ", arrayObjetos.includes(x => x.name === 'ervin'))

//isArray
console.log("isArray true: ", Array.isArray(palabras))

console.log("isArray false: ", Array.isArray("prueba"))

//array from, convierte un iterable (string, etc) en un array
console.log("array from: ", Array.from("ervin"))

//prueba array of
let objectoArr = {name:'ervin', edad:10}
console.log("array from object: ", Array.from(objectoArr))

//slice, buscar de tarea