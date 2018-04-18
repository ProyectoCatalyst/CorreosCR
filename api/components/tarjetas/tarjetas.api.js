const creditCardModel = require('./tarjetas.model');

module.exports.registrar = (req, res) => {
  let newCreditCard = new creditCardModel({
    tipoTarjeta    : req.body.tipoTarjeta,
    nombreTarjeta  : req.body.nombreTarjeta,
    numeroTarjeta  : req.body.numeroTarjeta,
    cvvTarjeta     : req.body.cvvTarjeta,
    mesTarjeta     : req.body.mesTarjeta,
    annoTarjeta    : req.body.annoTarjeta,
    idCliente      : req.body.idCliente
  });

  newCreditCard.save((err) => {
    if(err){
      res.json({success:false, msg: 'Ha ocurrido un error en el registro de tarjetas' + err});
    }else{
      res.json({success:true, msg:'Se registró la tarjeta correctamente'});
    }
  });
};

module.exports.listarTodos = (req,res) => {
  creditCardModel.find().then((creditCard) => {
    res.send(creditCard);
  });
};

module.exports.actualizar = (req,res) => {
  creditCardModel.update({numeroTarjeta: req.body.numeroTarjeta}, req.body, (err, creditCard) => {
    if (err){
      res.json({success:false,msg:'No se ha actualizado.' + handleError(err)});

    } else{
      res.json({success:true,msg:'Se ha actualizado correctamente.' + res});
    }
  });
};

module.exports.eliminar = (req,res) => {
  creditCardModel.remove({numeroTarjeta: req.body.numeroTarjeta}, (err, creditCard) => {
    if (err){
      res.json({success:false,msg:'No se ha actualizado.' + handleError(err)});

    } else{
      res.json({success:true,msg:'Se ha actualizado correctamente.' + res});
    }
  });
};