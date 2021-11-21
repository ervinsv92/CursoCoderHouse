let express = require('express');
let cors = require("cors");
let app = express();
let path = require("path");
const PORT = 8080;
const router = require('./router');

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cors("*"))
app.use(express.static(path.join(__dirname, "public/")));

app.use("/api/productos", router);

app.listen(PORT, ()=>{
    console.log(`Servidor corriendo en: http://localhost:${PORT}`);
});