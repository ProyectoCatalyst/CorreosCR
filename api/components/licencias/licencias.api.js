const licenciasModel = require('./licencias.model');

module.exports.registrar = (req, res) => {
  let newLicence = new licenceModel({
    codigo            : req.body.codigo,
    fechaVencimiento  : req.body.fechaVencimiento,
    estado            : req.body.estado,
    idRepartidor      : req.body.idRepartidor
  });

  newLicense.save((err) => {
    if(err){
      res.json({success:false, msg: 'Ha ocurrido un error en el registro de licencias' + err});
    }else{
      res.json({success:true, msg:'Se registró la licencia correctamente'});
    }
  });
};

module.exports.listarTodos = (req,res) => {
  licenciasModel.find().then((licencias) => {
    res.send(licencias);
  });
};

module.exports.actualizar = (req,res) => {
  licenciasModel.findByIdAndUpdate(req.body.licencias, { $set: req.body}, (err, licencias) => {
    if (err){
      res.json({success:false,msg:'No se ha actualizado.' + handleError(err)});

    } else{
      res.json({success:true,msg:'Se ha actualizado correctamente.' + res});
    }
  });
};