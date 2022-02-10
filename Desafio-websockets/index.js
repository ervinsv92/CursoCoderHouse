let express = require("express");
let app = express();
let {engine} = require("express-handlebars");
const http = require('http');
const server = http.createServer(app)
let Socket = require("./utils/sockets");
const serverRouter = require("./router");
//const cookieParser = require('cookie-parser');
const session = require('express-session');
//const {configMongoDB} = require('./config');
//const MongoStore = require('connect-mongo');
const PORT = 8081;
let passport = require('passport');
const passportStrategy  = require('passport-local').Strategy;
//const advancedOptions = {useNewUrlParser:true, useUnifiedTopology:true};
const mongoContainerUsers = require('./utils/containers/mongoContainerUsers');
const {isValidPassword, createHash} = require('./utils/bcrypt');
app.use(express.json());
app.use(express.urlencoded({extended:true}));
//app.use(cookieParser());
app.use(session({
    secret: "secret123",
    cookie:{
        httpOnly: false,
        secure: false,
        maxAge: 60000
    },
    resave:false,
    saveUninitialized:false
}));

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views/");
app.use(express.static("public"));


let socket = new Socket(server);
socket.init();


// let newUser = {
//     username:'ervin', 
//     password:'123'
// }

// mongoContainerUsers.save(newUser);

passport.use('login', new passportStrategy (
    (username, password, done)=>{
        
        (async ()=>{
            console.log('login 132')
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
        })()
    }
))

passport.use('register', new passportStrategy ({passReqToCallback:true},
    async function(req, username, password, done){
        try {
            const user = await mongoContainerUsers.getUserByUsername(username);
            //console.log("Usuario: ", user)
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

passport.serializeUser((user, done)=>{
    console.log("serializo: ", user)
    done(null, user.username);
})

passport.deserializeUser(async (username, done)=>{
    console.log("de serializo")
    const user = await mongoContainerUsers.getUserByUsername(username);
    done(null, user);
});

app.use(passport.initialize());
app.use(passport.session());
serverRouter(app,passport)

server.listen(PORT, err =>{
    if(err) throw new Error(`Error en servidor ${err}`)
    console.log(`El servidor se está ejecutando en el puerto ${PORT}`);
})