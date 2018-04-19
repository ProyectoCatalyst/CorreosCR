const mongoose = require('mongoose');

var ConvenioSchema = new mongoose.Schema({
    codigoConvenio: {type: String, required: true},
    costoConvenio: {type: String, required: true},
    descripcionConvenio: {type: String, required: true},
    institucionConvenio: {type: String, required: true},
    nombreConvenio: {type: String, required: true},
    desact: {type: String, required: true}
});

module.exports = mongoose.model('Convenio', ConvenioSchema);