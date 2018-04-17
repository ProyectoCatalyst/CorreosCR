const express = require('express'),
      router = express.Router(),
      licencias = require('./licencias.api');

/**
 * 
 */
router.param('id', (req, res, next, id) => {
  req.body.id = id;
  next();licences
});

/**
 * Función que se encarga de registrar los usuarios dentro del local storage
 */
router.route('/save_licences')
  .post((req, res) => {
    licencias.registrar(req,res);
});

/**
 * Función que obtiene todos los usuarios
 */
router.route('/get_all_licences')
  .get((req, res) => {
    licencias.listarTodos(req,res);
});

/**
 * Función que actualiza los usuarios
 */
router.route('/update_licences')
  .put((req, res) => {
    licencias.actualizar(req,res);
});

router.route('/delete_licences')
  .delete((req, res) => {
    licencias.eliminar(req,res);
});

module.exports = router;