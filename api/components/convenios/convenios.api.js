const ConvenioModel = require('./convenios.model');

module.exports.registrar = (req, res) => {
    var newConvenio = new ConvenioModel({
        codigoConvenio  : req.body.codigoConvenio,
        costoConvenio  : req.body.costoConvenio,
        descripcionConvenio  : req.body.descripcionConvenio,
        institucionConvenio  : req.body.institucionConvenio,
        nombreConvenio  : req.body.nombreConvenio
    });

    newConvenio.save((err) => {
        if(err){
            res.json({success:false, msj: 'Algo anda mal...' + err});
        }else{
            res.json({success:true, msj: 'Se registro correctamente'});
        }
    });
}

module.exports.retornar = (req,res) => {
    ConvenioModel.find().then((convenios) => {
        res.send(convenios);
    })
}

/**
 * funcion que recibe un request (donde viene la info a actualizar)
 * @param {request} req 
 * @param {response} res 
 */
module.exports.actualizar = (req,res) => {
    ConvenioModel.findByIdAndUpdate(req.body.codigoConvenio, { $set: req.body }, (err, user) => {
      if (err){ // no se logra, error siempre viene como true
        res.json({success:false,msg:'No se ha actualizado.' + handleError(err) } );
  
      } else{
        res.json({success:true,msg:'Se ha actualizado correctamente.' + res});
      }
    });
  };