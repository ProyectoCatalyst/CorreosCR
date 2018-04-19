const carrierModel = require('./carrier.model');

module.exports.registrar = (req, res) => {
  let newCarrier = new carrierModel({
    codigoCarrier  : req.body.codigoCarrier,
    nombreCarrier  : req.body.nombreCarrier,
    estadoCarrier  : req.body.estadoCarrier
  });

  newCarrier.save((err) => {
    if(err){
      res.json({success:false, msg: 'Ha ocurrido un error en el registro de mensajeros' + err});
    }else{
      res.json({success:true, msg:'Se registró el mensajero correctamente'});
    }
  });
};

module.exports.listarTodos = (req,res) => {
  carrierModel.find().then((carrier) => {
    res.send(carrier);
  });
};

module.exports.actualizar = (req,res) => {
  carrierModel.update({codigoCarrier: req.body.codigoCarrier}, req.body, (err, carrier) => {
    if (err){
      res.json({success:false,msg:'No se ha actualizado.' + handleError(err)});

    } else{
      res.json({success:true,msg:'Se ha actualizado correctamente.' + res});
    }
  });
};