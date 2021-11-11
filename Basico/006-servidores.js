/**
 * Servidores
 */
/*
***server HTTP
let http = require('http');
const PORT = 3000;

let app = http.createServer((req, res)=>{
    res.end("Hola desde mi primer servidor");
});

app.listen(PORT, ()=>{
    console.log(`Mi servidor escuchando desde http://localhost:${PORT}`);
})*/

/*Express */
let express = require("express");
let app = express();
const PORT = 3000;

app.get("/", (req, res, next)=>{
    res.send("<p>Mi primer servidor con express</p>")
})

app.get("/", (req, res, next)=>{
    res.json({cantidad:10});
})

app.listen(PORT, ()=>{
    console.log(`Mi servidor escuchando desde http://localhost:${PORT}`);
})

//glitch para host
/*
    en el package.json siempre colocar los scripts dev y start, se hace por convencion de los proyectos de node
    "start": "node index.js",
    "dev": "nodemon index.js"
*/