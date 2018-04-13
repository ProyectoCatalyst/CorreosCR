let express = require('express'),
  router = express.Router(),
  mailApi = require('./mail.api');

router.route('/mail')
  .post( (req, res) => {
    mailApi.enviarCorreo(req, res);
  });

module.exports = router;