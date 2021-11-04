
//Clousure, funcion dentro de otra
function mostrarLetras(string, timer){
    let mifuncion = setInterval(letras, timer);
    let counter = 0;
    function letras(){
        if(counter != string.length){
            console.log(string.slice(counter, counter+1))
            counter++;
        }else{
            fin();
            clearInterval(mifuncion);
        }
    }
}

let fin = ()=> console.log("Hemos terminado");

//Sirven
//mostrarLetras("Ervin", 250)
//mostrarLetras("Solano", 500)
//mostrarLetras("Vargas", 1000)

//Manejo de archivos. file system
const fs = require('fs');
const path = require('path');
//Syncronas
//escribir todo
let archivoW = fs.writeFileSync('./004-clase.txt', 'nuevo texto escrito');
console.log(archivoW)

//leer
let archivoR = fs.readFileSync('./004-clase.txt', 'utf-8');
console.log(archivoR)

try {
    //escribir agregar
    let archivoA = fs.appendFileSync('./004-clase.txt', 'nuevo texto agregado \n');     
} catch (error) {
    console.error(error)
    throw new Error(error)
}

//elimina
//let archivoU = fs.unlinkSync('./004-clase.txt');

//callback error, primero el error despues la informacion, convencion.

//Asincronas, no es necesario el trycatch ya que usan callback
//escribir todo
let archivoW = fs.writeFile('./004-clase.txt', 'nuevo texto escrito', (error, response)=>{
    if(error){
        console.log("Hemos fallado")
    }
    console.log(response)
});
console.log(archivoW)

//leer
let archivoR = fs.readFile('./004-clase.txt', 'utf-8', (error, response)=>{
    if(error){
        console.log("Hemos fallado")
    }
    console.log(response)
});
console.log(archivoR)

try {
    //escribir agregar
    let archivoA = fs.appendFile('./004-clase.txt', 'nuevo texto agregado \n', (error, response)=>{
        if(error){
            console.log("Hemos fallado")
        }
        console.log(response)
    });     
} catch (error) {
    console.error(error)
    throw new Error(error)
}

//elimina
let archivoU = fs.unlink('./004-clase.txt', error=>{
    if(error){
        console.log("Hemos fallado")
    }
    console.log("lo eliminamos")
});

//crear carpeta 
try {
    fs.mkdir(path.join(__dirname, "/carpeta_creada"), error=>{
        console.log("error al crear la carpeta")
    });
} catch (error) {
    console.log(error)
}

//lee los nombres de los archivos de una carpeta
//fs.readdir

//file system con promesas
fs.promises.readFile('ruta', 'utf-8').then(contenido => {}).catch(err=>{})

async function leerArchivo(){
    try {
        await fs.promises.readFile('ruta', 'utf-8')
    } catch (error) {
        
    }
}
