let nodemailer = require('nodemailer');

module.exports.enviarCorreo = (req,res) => {

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'catalyst.proyecto@gmail.com',
      pass: 'Prograweb2018'
    }
  });

  let mailOptions = {
    from: 'catalyst.proyecto@gmail.com',
    to: req.body.from,
    subject: req.body.subject,
    text: req.body.text,
  };

  transporter.sendMail(mailOptions, (error, info) =>{
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}