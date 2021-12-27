let express = require("express");
let app = express();
let {engine} = require("express-handlebars");
const http = require('http');
const server = http.createServer(app)
let Socket = require("./utils/sockets");
const router = require('./router');
const PORT = 8081;

app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views/");
app.use(express.static("public"));
app.use("/", router);

let socket = new Socket(server);
socket.init();

server.listen(PORT, err =>{
    if(err) throw new Error(`Error en servidor ${err}`)
    console.log(`El servidor se está ejecutando en el puerto ${PORT}`);
})