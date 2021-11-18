/**
 * Router y multer
 */

const express = require("express");
const app = express();
const cors = require("cors");
const multer = require("multer");
const {uuid} = require("uuidv4");
const {Router} = express;
let router1 = new Router();
let router2 = new Router();
const PORT = 3000;
const path = require("path");//para manejos de rutas en los diferentes sistemas operativos
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors("*"))

/*
    tipos de middleware son 5
    ruta
    app
    router
    error
    static
    terceros
*/

/**
 * Multer, sirve para subir archivos
 */
let storage = multer.diskStorage({
    destination:(req, file, cb)=>{
        //el null es callback error
        cb(null, '008-uploads')
    },
    filename:(req, file, cb)=>{
        let date = new Date();
        //el null es callback error
        cb(null, `${uuid()}-${file.originalname}`)
    },
})

let uploadMiddleware = multer({storage});

function miMiddleware(req,res,next){
    req.name = "Ervin"
    console.log("estamos pasando por el middleware")
    //continua con el siguiente middleware o con la siguiente ruta
    next();
}

//Middlewares, captura informacion antes de que llegue a las rutas
//Son a nivel de aplicacion
app.use(express.static(path.join(__dirname, "008-public/")));
app.use("/files", express.static(path.join(__dirname, "008-files/")));

//app.use("api/",router);
app.use("/personas",router1);
app.use("/mascotas",router2);


//Las rutas son mini aplicaciones
//Middleware a nivel de router
router1.use((req,res,next)=>{
    req.name = "Ervin"
    console.log("estamos pasando por el middleware")
    //continua con el siguiente middleware o con la siguiente ruta
    next();
})

//Se pueden hacer mas de un middleware
router1.use((req,res,next)=>{
    req.name = "Ervin Solano"
    console.log("estamos pasando por el middleware")
    //continua con el siguiente middleware o con la siguiente ruta
    next();
})

//Middleware por ruta
router1.get("/", miMiddleware, (req, res, next)=>{
    res.send("desde personas", req.name);
    //tambien se puede para cargar los html
    //res.sendFile(path.join(__dirname, "public", "index.html"));
})

//Pasar varios midleware 
router2.get("/", [miMiddleware, miMiddleware],(req, res, next)=>{
    res.send("desde mascota");
})

app.listen(PORT, ()=>{
    console.log(`Escuchando en http://localhost:${PORT}`);
})

app.post("/uploadfile", uploadMiddleware.single("myFile"), (req, res, next)=>{
    const file = req.file;
    if(!file){
        new Error("error en la carga del archivo");
    }
    console.log("Archivo", file)
    res.send(file);
})

app.post("/uploadfiles", uploadMiddleware.array("myFiles", 12), (req, res, next)=>{
    const files = req.files;
    if(!files){
        new Error("error en la carga del archivo");
    }
    console.log("Archivo", files)
    res.send(files);
})