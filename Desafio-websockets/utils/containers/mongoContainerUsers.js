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
        let user = await Users.findOne({username});
        return user;
    }
}

module.exports = new MongoContainerUsers