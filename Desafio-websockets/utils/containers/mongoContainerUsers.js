const Users = require('../../models/user');

class MongoContainerUsers{
    constructor(){

    }

    async save(user){
        let userSaved = await Users.create(user);
        console.log("guardado mongoose: ", userSaved);
        return userSaved;
    }

    async getUserByUsername(username){
        console.log("leido")
        let user = await Users.findOne({username});
        if(user == null){
            throw new Error(`El usuario no se encuentra.`);
        }

        return user;
    }
}

module.exports = new MongoContainerUsers