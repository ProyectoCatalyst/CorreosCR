const express = require('express'),
        router = express.Router(),
        convenios = require('./convenios.api');

router.param('id', (req, res, next, id) => {
    req.body.id = id;
    next();
});

router.route('/save_agreement')
    .post((req, res) => {
        convenios.registrar(req, res);
});

router.route('/get_all_agreement_data')
    .get((req, res) => {
        convenios.retornar(req,res);
});

router.route('/update_agreement')
    .put((req, res) => {
        convenios.actualizar(req,res)
});

module.exports = router;