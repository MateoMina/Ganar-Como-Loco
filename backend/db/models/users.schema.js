const { Schema, model } = require("mongoose");

const user = new Schema(
    {
        userId: { type: Number },
        nombre: { type: String, require: true },
        contrasena: { type: String, require: true },
        cedula: { type: String, required:false },
        celular: { type: String, required:false },
        ciudad: { type: String, required:false },
        correo: { type: String, required:false }
    }
)

const usuario = model('usuarios', user);

module.exports = {usuario}