const { Schema, model } = require("mongoose");

const rifaSchema = new Schema(
    {
        numeroRifa: {
            type: String,
            required: true,
        },
        estado: { type: String },
        idUsuario: { type: Number },
        fecha: { type: String },
        hora: { type: String },
        premio: { type: String,default: "Sin premio" }
    }
)

const rifa = model('rifa', rifaSchema);

module.exports = {rifa}