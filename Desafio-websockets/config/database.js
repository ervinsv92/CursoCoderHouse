const mongoose = require('mongoose');
const updateDenormalized = require('@meanie/mongoose-update-denormalized');
const {configMongoDB} = require('../config');
//mongoose.plugin(updateDenormalized);
let connectionMongoDB;

(async ()=>{
    try {
        connectionMongoDB = mongoose.connect(`${configMongoDB.mongoUri}`, {useNewUrlParser:true, useUnifiedTopology:true});
        console.log("Conexión establecida con mongodb")
    } catch (error) {
        console.log(error)
    }
})();

module.exports = {connectionMongoDB, mongoose};