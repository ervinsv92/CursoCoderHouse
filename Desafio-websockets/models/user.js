const {mongoose} = require('../config/database');
const {userSchema} = require('./schemas/user');

const {Schema, model} = mongoose;

let userSchemaModel = new Schema(userSchema);
let Users = new model('users', userSchemaModel);

module.exports = Users;