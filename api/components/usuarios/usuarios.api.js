const UserModel = require('./usuarios.model');

module.exports.save = (req, res) => {
  let newUser = new UserModel({
    primerNombre      : req.body.primerNombre,
    segundoNombre     : req.body.segundoNombre,
    primerApellido    : req.body.primerApellido,
    segundoApellido   : req.body.segundoApellido,
    cedula            : req.body.cedula,
    fecha             : req.body.fecha,
    genero            : req.body.genero,
    ubicacion         : req.body.ubicacion,
    provincia         : req.body.provincia,
    canton            : req.body.canton,
    distrito          : req.body.distrito,
    direccion         : req.body.direccion,
    correo            : req.body.correo,
    contrasenna       : req.body.contrasenna,
    rol               : req.body.rol,
    estado            : req.body.estado,
    // Encargado de aduana
    // Encargado de sucursal
    // CLient
    telefono          : req.body.telefono,
    tarjeta           : req.body.tarjeta,
    // Repartidor
    paqueteAsignado   : req.body.paqueteAsignado,
    licencia          : req.body.licencia,
    telefono          : req.body.telefono,
    telefonoAdicional : req.body.telefonoAdicional,
    estado            : req.body.estado,
    razonDesact       : req.body.razonDesact,
    sucursal          : req.body.sucursal,
  });

  newUser.registrar((err) => {
    if(err){
      res.json({success:false, msg: 'Ha ocurrido un error en el registro de usuarios' + err});
    }else{
      res.json({success:true, msg:'Se registró el usuario correctamente'});
    }
  });
};

module.exports.listarTodos = (req,res) => {
  UserModel.find().then((user) => {
    res.send(user);
  });
};

module.exports.actualizar = (req,res) => {
  UserModel.findByIdAndUpdate(req.body.correo, { $set: req.body}, (err, user) => {
    if (err){
      res.json({success:false,msg:'No se ha actualizado.' + handleError(err)});

    } else{
      res.json({success:true,msg:'Se ha actualizado correctamente.' + res});
    }
  });
};