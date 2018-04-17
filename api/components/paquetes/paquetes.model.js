//Requerimos mongoose
let mongoose = require('mongoose');

//Esquema de usuarios
let packageSchema = new mongoose.Schema({
    trackingPaquete     : {type: String, require: true},
    tipoPaquete         : {type: String, require: true},
    pesoPaquete         : {type: Number, require: true},
    precioPaquete       : {type: Number, require: true},
    costoEnvio          : {type: Number, require: true},
    costoTotalPaquete   : {type: Number, require: true},
    estadoPaquete       : {type: String, require: true},
    idRepartidor        : {type: String, require: true},
    idSucursal          : {type: String, require: true},
    idCliente           : {type: String, require: true},
    idMensajero         : {type: String, require: true}
});

//nombre del modelo dentro del back end y el packageSchema es el nombre dentro de mongoose
module.exports = mongoose.model('Package', packageSchema); 
//Package va en mayúscula y singular aunque en la bd todo se pone en minúscula y plural