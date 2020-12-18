const {Schema, model} = require('mongoose')

const UserSchema = new Schema({
    id: {type: String},
    name: {type: String},
    email: {type: String, required: true},
    password: {type: String},
    avatar: {type: String},
    about: {type: String},
    birth: {type: String}
})

module.exports = model('UserModel', UserSchema)
