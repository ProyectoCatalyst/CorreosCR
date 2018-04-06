//Requerimos mongoose
let mongoose = require('mongoose');

//Esquema de usuarios
let UserSchema = new mongoose.Schema({
  primerNombre      : {type: String, require: true},
  segundoNombre     : {type: String},
  primerApellido    : {type: String, require: true},
  segundoApellido   : {type: String},
  cedula            : {type: String, require: true},
  fecha             : {type: String, require: true},
  genero            : {type: String, require: true},
  ubicacion         : {type: String, require: true},
  provincia         : {type: String, require: true},
  canton            : {type: String, require: true},
  distrito          : {type: String, require: true},
  direccion         : {type: String, require: true},
  correo            : {type: String, require: true},
  contrasenna       : {type: String, require: true},
  rol               : {type: String, require: true, maxlength: 1, minlength: 1},
  estado            : {type: Boolean, require: true},
  // Encargado de aduana
  // Encargado de sucursal
  // CLiente
  telefono          : {type: String},
  tarjeta           : {type: Array},
  // Repartidor
  paqueteAsignado   : {type: Array},
  licencia          : {type: Array},
  telefono          : {type: String},
  telefonoAdicional : {type: String},
  estado            : {type: String},
  razonDesact       : {type: String},
  sucursal          : {type: String},
});

//nombre del modelo dentro del back end y el userSchema es el nombre dentro de mongoose
module.exports = mongoose.model('User', UserSchema); 
//User va en mayúscula y singular aunque en la bd todo se pone en minúscula y plural