const packageModel = require('./paquetes.model');

module.exports.registrar = (req, res) => {
    let newPackage = new packageModel({
        trackingPaquete: req.body.trackingPaquete,
        tipoPaquete: req.body.tipoPaquete,
        pesoPaquete: req.body.pesoPaquete,
        precioPaquete: req.body.precioPaquete,
        costoTotalPaquete: req.body.costoTotalPaquete,
        estadoPaquete: req.body.estadoPaquete,
        idRepartidor: req.body.idRepartidor,
        idSucursal: req.body.idSucursal,
        idCliente: req.body.idCliente,
    });

    newPackage.save((err) => {
        if (err) {
            res.json({ success: false, msg: 'Ha ocurrido un error en la pre-alerta del paquete' + err });
        } else {
            res.json({ success: true, msg: 'El paquete se ha pre-alertado correctamente' });
        }
    });
};

module.exports.listarTodos = (req, res) => {
    packageModel.find().then((package) => {
        res.send(package);
    });
};

module.exports.actualizar = (req, res) => {
    packageModel.findByIdAndUpdate(req.body.trackingPaquete, { $set: req.body }, (err, package) => {
        if (err) {
            res.json({ success: false, msg: 'No se ha actualizado.' + handleError(err) });

        } else {
            res.json({ success: true, msg: 'Se ha actualizado correctamente.' + res });
        }
    });
};