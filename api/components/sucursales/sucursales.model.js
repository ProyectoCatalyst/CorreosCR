//Requerimos mongoose
let mongoose = require('mongoose');

//Esquema 
let sucursalesSchema = new mongoose.Schema({
  codigoSucursal   : {type: String, require: true},
  nombreSucursal : {type: String, require: true},
  provincia : {type: String, require: true},
  canton : {type: String, require: true},
  distrito : {type: String, require: true},
  estadoSucursal : {type: String, require: true},
  
});

//nombre del modelo dentro del back end y el userSchema es el nombre dentro de mongoose
module.exports = mongoose.model('Sucursales', sucursalesSchema); 
//User va en mayúscula y singular aunque en la bd todo se pone en minúscula y plural