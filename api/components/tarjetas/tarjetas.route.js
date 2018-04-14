const express = require('express'),
      router = express.Router(),
      tarjetas = require('./tarjetas.api');

/**
 * 
 */
router.param('id', (req, res, next, id) => {
  req.body.id = id;
  next();
});

/**
 * Función que se encarga de registrar los usuarios dentro del local storage
 */
router.route('/save_creditCard')
  .post((req, res) => {
    tarjetas.registrar(req,res);
});

/**
 * Función que obtiene todos los usuarios
 */
router.route('/get_all_creditCard')
  .get((req, res) => {
    tarjetas.listarTodos(req,res);
});

/**
 * Función que actualiza los usuarios
 */
router.route('/update_creditCard')
  .put((req, res) => {
    tarjetas.actualizar(req,res);
});

module.exports = router;