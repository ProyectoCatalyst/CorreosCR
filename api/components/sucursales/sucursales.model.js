//Requerimos mongoose
let mongoose = require('mongoose');

//Esquema 
let sucursalesSchema = new mongoose.Schema({
  codigoSucursal   : {type: String, required: true},
  nombreSucursal : {type: String, required: true},
  provincia : {type: String, required: true},
  canton : {type: String, required: true},
  distrito : {type: String, required: true},
  estadoSucursal : {type: String, required: true},
  
});

//nombre del modelo dentro del back end y el userSchema es el nombre dentro de mongoose
module.exports = mongoose.model('Sucursales', sucursalesSchema); 
//User va en mayúscula y singular aunque en la bd todo se pone en minúscula y plural