const express = require('express'),
      router = express.Router(),
      tarjetas = require('./paquetes.api');

/**
 * 
 */
router.param('id', (req, res, next, id) => {
  req.body.id = id;
  next();
});

/**
 * Función que se encarga de registrar los paquetes dentro del local storage
 */
router.route('/save_package')
  .post((req, res) => {
    paquetes.registrar(req,res);
});

/**
 * Función que obtiene todos los paquetes
 */
router.route('/get_all_package')
  .get((req, res) => {
    paquetes.listarTodos(req,res);
});

/**
 * Función que actualiza los paquetes
 */
router.route('/update_package')
  .put((req, res) => {
    paquetes.actualizar(req,res);
});

module.exports = router;