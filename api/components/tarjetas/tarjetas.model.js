//Requerimos mongoose
let mongoose = require('mongoose');

//Esquema de Licencias
let creditCardSchema = new mongoose.Schema({
  tipoTarjeta   : {type: String, require: true},
  nombreTarjeta : {type: String, require: true},
  numeroTarjeta : {type: String, require: true},
  cvvTarjeta    : {type: String, require: true},
  mesTarjeta    : {type: String, require: true},
  annoTarjeta   : {type: String, required: true},
  idCliente     : {type: String, required: true},
});

//nombre del modelo dentro del back end y el userSchema es el nombre dentro de mongoose
module.exports = mongoose.model('CreditCard', creditCardSchema); 
//User va en mayúscula y singular aunque en la bd todo se pone en minúscula y plural