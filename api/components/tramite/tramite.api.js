const TramiteModel = require('./tramite.model');

module.exports.registrar = (req, res) => {
    var newTramite = new TramiteModel({
        codigoTramite: req.body.codigoTramite,
        costoTramite: req.body.costoTramite,
        descripcionTramite: req.body.descripcionTramite,
        institucionTramite: req.body.institucionTramite,
        nombreTramite: req.body.nombreTramite,
        cedulaCliente: req.body.cedulaCliente,
        correoCliente: req.body.correoCliente
    });

    newTramite.save((err) => {
        if(err){
            res.json({success:false, msj: 'Problemas con la peticion' + err});
        }else{
            res.json({success:true, msj: 'Trámite registrado' + err});
        }
    })
}

module.exports.retornar = (req,res) => {
    TramiteModel.find().then((tramite) => {
        res.send(tramite);
    })
}