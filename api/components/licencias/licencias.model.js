//Requerimos mongoose
let mongoose = require('mongoose');

//Esquema de usuarios
let licensesSchema = new mongoose.Schema({
  codigo            : {type: String, required: true},
  fechaVencimiento  : {type: String, required: true}, 
  estado            : {type: Boolean, required: true},
  idRepartidor      : {type: String, required: true},
});

//nombre del modelo dentro del back end y el userSchema es el nombre dentro de mongoose
module.exports = mongoose.model('License', licensesSchema); 
//User va en mayúscula y singular aunque en la bd todo se pone en minúscula y plural