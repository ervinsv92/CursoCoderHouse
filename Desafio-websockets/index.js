let express = require("express");
let app = express();
let {engine} = require("express-handlebars");
const http = require('http');
const server = http.createServer(app)
let Socket = require("./utils/sockets");
const router = require('./router');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const PORT = 8081;
const advancedOptions = {useNewUrlParser:true, useUnifiedTopology:true};
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(session({
    store:MongoStore.create({mongoUrl:'mongodb+srv://esv:esv@cluster0.nssrw.mongodb.net/codersockets', mongoOptions:advancedOptions}),
    secret:'soyunaclavesecreta',
    resave:false,
    saveUninitialized:false,
    cookie: {
        expires: 1000*60*10
    }
}));

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