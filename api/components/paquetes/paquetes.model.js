
//Requerimos mongoose
let mongoose = require('mongoose');

//Esquema de usuarios
let packageSchema = new mongoose.Schema({
    trackingPaquete     : {type: String, required: true},
    tipoPaquete         : {type: String, required: true},
    pesoPaquete         : {type: String, required: true},
    precioPaquete       : {type: String, required: true},
    costoTotalPaquete   : {type: String, required: true},
    estadoPaquete       : {type: String, required: true},
    idRepartidor        : {type: String, required: true},
    idSucursal          : {type: String, required: true},
    idCliente           : {type: String, required: true},
});

//nombre del modelo dentro del back end y el userSchema es el nombre dentro de mongoose
module.exports = mongoose.model('Package', packageSchema); 
//User va en mayúscula y singular aunque en la bd todo se pone en minúscula y plural