'use strict';

/**
 * Exportamos todas las dependencias necesarias para establecer la conexión
 */
const express = require('express'),
      app = express(),
      path = require('path'),
      bodyParser = require('body-parser'),
      morgan = require('morgan'),
      mongoose = require('mongoose');

/**
 * Se definen las variables necesarias para la conexión con MongoDB
 */
let db = mongoose.connection,
    dburl = 'mongodb://admin:admin@ds235609.mlab.com:35609/db_correos_costa_rica',
    port = 4000;

let server = app.listen(port,_server());



/**
 * Se define la conexión con Mongoose, enviándole como parámetro la url de la base de datos
 */
mongoose.connect(dburl);

/**
 * Si la conexión falla, imprime en consola el error
 */
db.on('error', console.error.bind(console, 'Error de conexión: '));

/**
 * Si la conexión es exitosa nos imprime en la consola que se ha establecido conexión con Mongo
 */
db.once('open', () => {
  console.log('Base de datos conectada correctamente');
});



app.use(express.static(path.join(__dirname, 'public')));

/**
 * Le indicamos a la aplicación que el formato de los datos va a ser JSON
 */

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(morgan('dev'));//////invest

app.use( (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-Response-Time, X-PINGOTHER, X-CSRF-Token,Authorization');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

/**
 * Exportamos las funcionalidades
 */
const index = require('./index'),
      usuarios = require('./components/usuarios/usuarios.route'),
      convenios = require('./components/convenios/convenios.route'),
      tramite = require('./components/tramite/tramite.route'),
      tarjetas = require('./components/tarjetas/tarjetas.route'),
      mail = require('./components/mail/mail.route'),
      carrier = require('./components/carrier/carrier.route'),
      sucursales = require('./components/sucursales/sucursales.route.js' ),
      licencias = require('./components/licencias/licencias.route'),
      paquetes = require('./components/paquetes/paquetes.route');

/**
 * Se definien las rutas de ExpressJS
 */
app.use('/api', carrier);
app.use('/api', sucursales);
app.use('/api', licencias);
app.use('/api', convenios);
app.use('/api', tramite);
app.use('/api', paquetes);
app.use('/api', tarjetas);
app.use('/api', mail);
app.use('/api', usuarios);
app.use('/', index);



/// Se guarda todo lo que se ha realizado
module.exports = app;

function _server(){
  console.log('Conexión establecida en el puerto ' + port);
};