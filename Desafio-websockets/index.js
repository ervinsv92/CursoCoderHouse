let express = require("express");
let app = express();
let {engine} = require("express-handlebars");
const http = require('http');
const server = http.createServer(app)
let Socket = require("./utils/sockets");
const router = require('./router');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const {configMongoDB} = require('./config');
const MongoStore = require('connect-mongo');
const PORT = 8081;
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const advancedOptions = {useNewUrlParser:true, useUnifiedTopology:true};
const mongoContainerUsers = require('./utils/containers/mongoContainerUsers');
const {isValidPassword, createHash} = require('./utils/bcrypt');
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(session({
    store:MongoStore.create({mongoUrl:configMongoDB.mongoUri, mongoOptions:advancedOptions}),
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

passport.use('login', new LocalStrategy(
    async (username, password, done)=>{
        try {
            const user = await mongoContainerUsers.getUserByUsername(username);
            if (user){

                if(!isValidPassword(user, password)){
                    console.log("Contraseña incorrecta")
                    return done(null, false)
                }

                return done(null, user)
            }else{
                console.log("No se encuentra el usuario")
                return done(null, false)
            }
        } catch (error) {
            console.log("Error: ", error);
            return done(null, false);
        }
    }
))

passport.use('signup', new LocalStrategy(
    async (req, username, password, done)=>{
        try {
            const user = await mongoContainerUsers.getUserByUsername(username);
            if (!user){

               let newUser = {
                   username, 
                   password:createHash(password)
               }

               const userSaved = await mongoContainerUsers.save(newUser);

               return done(null, userSaved)
            }else{
                console.log("El usuario ya está registrado")
                return done(null, false)
            }
        } catch (error) {
            console.log("Error: ", error);
            return done(null, false);
        }
    }
))

app.use(passport.initialize());
app.use(passport.session());

server.listen(PORT, err =>{
    if(err) throw new Error(`Error en servidor ${err}`)
    console.log(`El servidor se está ejecutando en el puerto ${PORT}`);
})