//Requerimos mongoose
let mongoose = require('mongoose');

//Esquema de Licencias
let carrierSchema = new mongoose.Schema({
  codigoCarrier   : {type: String, required: true, unique: true},
  nombreCarrier   : {type: String, required: true},
  estadoCarrier   : {type: Boolean, required: true}
});

//nombre del modelo dentro del back end y el userSchema es el nombre dentro de mongoose
module.exports = mongoose.model('Carrier', carrierSchema);
//User va en mayúscula y singular aunque en la bd todo se pone en minúscula y plural