const express = require('express'),
      router = express.Router(),
      carrier = require('./carrier.api');

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
router.route('/save_carrier')
  .post((req, res) => {
    carrier.registrar(req,res);
});

/**
 * Función que obtiene todos los usuarios
 */
router.route('/get_all_carrier')
  .get((req, res) => {
    carrier.listarTodos(req,res);
});

/**
 * Función que actualiza los usuarios
 */
router.route('/update_carrier')
  .put((req, res) => {
    carrier.actualizar(req,res);
});

module.exports = router;