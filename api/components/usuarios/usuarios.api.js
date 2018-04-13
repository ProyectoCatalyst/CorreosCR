const UserModel = require('./usuarios.model');

module.exports.registrar = (req, res) => {
  let newUser = Object.assign(new UserModel(), req.body);

  let objtemp = req.body;

  console.log('----------------------------------------------------------------------------------------------------------')
  console.log('Esquema sin armar');
  console.log(objtemp);
  console.log('----------------------------------------------------------------------------------------------------------')

  switch (newUser.rol) {
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
      console.log('es un cliente');
      newUser.latitud = req.body.latitud;
      newUser.longitud = req.body.longitud;
      newUser.telefono = req.body.telefono;
      console.log('----------------------------------------------------------------------------------------------------------')
      console.log('Esquema ya armado');
      console.log(newUser);
      console.log('----------------------------------------------------------------------------------------------------------')
      break;
    default:

  }
  console.log(newUser.latitud);
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