let express = require("express");
let cors = require("cors");
let serverRouter = require("./routes");
let {config} = require("./config");
const existsRouteMiddleware = require("./utils/middleware/general/existsRouteMiddleware");
const PORT = config.port;
const app = express();

//Middlewares
app.use(cors("*"));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(express.static('public'));

//Routes
serverRouter(app);

//Debe ir al final de todas las rutas, ya que sino entra en ninguna de ellas entra en este middleware
app.use(existsRouteMiddleware);

app.listen(PORT, ()=>{
    console.log(`Conectado a http://localhost:${PORT}`);
})