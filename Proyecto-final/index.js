let express = require("express");
let cors = require("cors");
let serverRouter = require("./routes");
let {config} = require("./config");
const PORT = config.port;
const app = express();

//Middlewares
app.use(cors("*"));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//Routes
serverRouter(app);

app.listen(PORT, ()=>{
    console.log(`Conectado a http://localhost:${PORT}`);
})