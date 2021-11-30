let express = require("express");
let app = express();
let cors = require("cors");
let {engine} = require("express-handlebars");
const router = require('./router');
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cors("*"))

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views/");
app.use(express.static("public"));
app.use("/", router);

app.listen(PORT, err =>{
    if(err) throw new Error(`Error en servidor ${err}`)
    console.log(`El servidor se está ejecutando en el puerto ${PORT}`);
})