const UserModel = require('./usuarios.model');

module.exports.registrar = (req, res) => {
  let newUser = Object.assign(new UserModel(), req.body);

  switch (newUser.rol) {
    case '2':

    break;
    case '3':

    break;
    case '4': // Repartidor
      newUser.paqueteAsignado = req.body.paqueteAsignado;
      newUser.licencia = req.body.licencia;
      newUser.telefono = req.body.telefono;
      newUser.telefonoAdicional = req.body.telefonoAdicional;
      newUser.estado = req.body.estado;
      newUser.razonDesact = req.body.razonDesact;
      newUser.sucursal = req.body.sucursal;
    break;
    case '5': // Cliente
      newUser.telefono = req.body.telefono;
      newUser.tarjeta = req.body.tarjeta;
    break;
    default:
    break;
  }

  newUser.save((err) => {
    if (err) {
      res.json({ success: false, msj: 'Ha ocurrido un error en el registro de usuarios' + err });
    } else {
      res.json({ success: true, msj: 'Se registró el usuario correctamente' });
    }
  });
};

module.exports.listarTodos = (req, res) => {
  UserModel.find().then((user) => {
    res.send(user);
  });
};

module.exports.actualizar = (req, res) => {
  UserModel.findByIdAndUpdate(req.body.correo, { $set: req.body }, (err, user) => {
    if (err) {
      res.json({ success: false, msg: 'No se ha actualizado.' + handleError(err) });

    } else {
      res.json({ success: true, msg: 'Se ha actualizado correctamente.' + res });
    }
  });
};