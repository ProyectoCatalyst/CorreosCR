const express = require('express'),
        router = express.Router(),
        tramites = require('./tramite.api');

router.param('id', (req, res, next, id) => {
    req.body.id = id;
    next();
});

router.route('/save_procedure')
    .post((req, res) => {
        tramites.registrar(req, res);
});

router.route('/get_all_procedure_data')
    .get((req, res) => {
        tramites.retornar(req,res);
});

module.exports = router;