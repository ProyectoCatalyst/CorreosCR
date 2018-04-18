//Requerimos mongoose
const bcryptjs = require('bcryptjs');
let mongoose = require('mongoose');

//Esquema de usuarios
let UserSchema = new mongoose.Schema({
  primerNombre      : {type: String, require: true},
  segundoNombre     : {type: String},
  primerApellido    : {type: String, require: true},
  segundoApellido   : {type: String},
  foto              : {type: String, require: true},
  cedula            : {type: String, require: true},
  fecha             : {type: String, require: true},
  genero            : {type: String, require: true},
  provincia         : {type: String, require: true},
  canton            : {type: String, require: true},
  distrito          : {type: String, require: true},
  direccion         : {type: String, require: true},
  correo            : {type: String, require: true},
  contrasenna       : {type: String, require: true},
  rol               : {type: String, require: true, maxlength: 1, minlength: 1},
  estado            : {type: Boolean, require: true},
  // Repartidor
  paqueteAsignado   : {type: String},
  licencia          : {type: Array},
  telefono          : {type: String},
  telefonoAdicional : {type: String},
  razonDesact       : {type: String},
  sucursal          : {type: String},
  // Cliente
  tarjeta           : [{
    numeroTarjeta : {type: String},
  }],
  paquetes          : {type: Array},
  latitud           : {type: String},
  longitud          : {type: String}
});

/**
 * Función que compara la contraseña
 */
UserSchema.methods.compararContrasenna = (candidatePassword, cb) => {
  bcryptjs.compare(candidatePassword, this.contrasenna, (err, isMatch) => {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

//nombre del modelo dentro del back end y el userSchema es el nombre dentro de mongoose
module.exports = mongoose.model('User', UserSchema); 
//User va en mayúscula y singular aunque en la bd todo se pone en minúscula y plural