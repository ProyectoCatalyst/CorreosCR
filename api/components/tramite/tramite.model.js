const mongoose = require('mongoose');

var TramiteSchema = new mongoose.Schema({
    codigoTramite: {type: String, required: true},
    costoTramite: {type: String, required: true},
    descripcionTramite: {type: String, required: true},
    institucionTramite: {type: String, required: true},
    nombreTramite: {type: String, required: true},
    cedulaCliente: {type: String, required: true},
    correoCliente: {type: String, required: true}
});

module.exports = mongoose.model('Tramite', TramiteSchema);