let express = require("express");
let app = express();
const router = require('./router');
const PORT = 8080;
const path = require ('path');

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.set("view engine", "pug");
app.set("views", path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname + '../public')));
app.use("/", router);

app.listen(PORT, err =>{
    if(err) throw new Error(`Error en servidor ${err}`)
    console.log(`El servidor se está ejecutando en el puerto ${PORT}`);
})