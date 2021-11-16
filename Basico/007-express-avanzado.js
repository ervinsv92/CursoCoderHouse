/**
 * Express Avanzado
 */

//thunderclient llamadas http en vs code como postman

let express = require("express");
let app = express();

//middleware
app.use(express.json());//parsea las peticiones a json
app.use(express.urlencoded({extended:true}));//ayuda a interpretar los objetos en formato de string

const PORT = 3000;
const FRASE = "Hola mundo para todos los programadores de JS";

app.get('/', (req, res, next)=>{
    //maneras de recibir datos
    console.log(req.query) // ?nombre='Ervin'
    console.log(req.params)// /ervin/10
    console.log(req.body)  // /usuario y por post se envia el body
    res.json({ok:true});
    //res.send("{ok:true}");
    //res.render();
})

app.get("/letras/:num", (req, res, next)=>{
    let {num} = req.params;
    let response = null;

    if(Number(num)){
        let frase = FRASE.split("");
        let final_num = num-1;
        if(num < (frames.length+1)){
            response = frase[final_num];
        }else{
            response = "El parametro esta fuera del rango"
        }
    }else{
        response = "El parametro no es numero"
    }

    res.json({response});
})

app.get('/producto', (req, res, next)=>{

})

app.post('/producto', (req, res, next)=>{
    
})

app.put('/producto', (req, res, next)=>{
    
})

app.delete('/producto', (req, res, next)=>{
    
})

app.listen(PORT, ()=>{
    console.log(`Conectado con el servidor http://localhost:${PORT}`);
});

