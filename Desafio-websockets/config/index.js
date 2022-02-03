require("dotenv").config();

const configMongoDB ={
    mongoUri: process.env.MONGO_DB_URI || 'mongodb+srv://esv:esv@cluster0.nssrw.mongodb.net/codersockets'
}

module.exports = {configMongoDB};