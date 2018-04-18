//Requerimos mongoose
let mongoose = require('mongoose');

//Esquema de Licencias
let creditCardSchema = new mongoose.Schema({
  tipoTarjeta   : {type: String, required: true},
  nombreTarjeta : {type: String, required: true},
  numeroTarjeta : {type: String, required: true},
  cvvTarjeta    : {type: String, required: true},
  mesTarjeta    : {type: String, required: true},
  annoTarjeta   : {type: String, required: true},
  idCliente     : {type: String, required: true},
});

//nombre del modelo dentro del back end y el userSchema es el nombre dentro de mongoose
module.exports = mongoose.model('CreditCard', creditCardSchema); 
//User va en mayúscula y singular aunque en la bd todo se pone en minúscula y plural