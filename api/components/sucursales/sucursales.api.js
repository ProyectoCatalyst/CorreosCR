const carrierModel = require('./sucursales.model');

module.exports.registrar = (req, res) => {
  let newSucursales = new sucursalesModel({
    codigoSucursal  : req.body.codigoSucursal,
    nombreSucursal  : req.body.nombreSucursal,
    provincia  : req.body.provincia,
    canton  : req.body.canton,
    distrito  : req.body.distrito,
    estadoSucursal  : req.body.estadoSucursal,

  });

  newSucursales.save((err) => {
    if(err){
      res.json({success:false, msg: 'Ha ocurrido un error en el registro de sucursales' + err});
    }else{
      res.json({success:true, msg:'Se registró la sucursal correctamente'});
    }
  });
};

module.exports.listarTodos = (req,res) => {
  sucursalesModel.find().then((sucursales) => {
    res.send(sucursales);
  });
};

module.exports.actualizar = (req,res) => {
  sucursalesModel.update({codigoSucursal: req.body.codigoSucursal}, req.body, (err, sucursales) => {
    if (err){
      res.json({success:false,msg:'No se ha actualizado.' + handleError(err)});

    } else{
      res.json({success:true,msg:'Se ha actualizado correctamente.' + res});
    }
  });
};