const Joi = require('joi');

let username = Joi.string().min(3);
let password = Joi.string().min(3);

const userSchema = {
    username:username.required(),
    password:password.required()
}

module.exports = {userSchema}