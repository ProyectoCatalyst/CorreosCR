(() => {
  'use strict';
  angular
    .module('correosCR')
    .service('servicioTarjetas', servicioTarjetas);

  servicioTarjetas.$inject = ['$q', '$log', '$http', 'localStorageFactory'];

  function servicioTarjetas($q, $log, $http, localStorageFactory) {

    const listaTarjetas = 'tarjetasLS'; // este es el key

    let publicAPI = {
      agregarTarjetas: _agregarTarjetas,
      obtenerlistadetarjetas: _obtenerlistadetarjetas
    };
    return publicAPI;

    function _agregarTarjetas(pNuevaTarjeta) {
      let listadetarjetas = _obtenerlistadetarjetas(),
        registrovalido,
        tarjetarepetida = false;

      for (let i = 0; i < listadetarjetas.length; i++) {
        if (listadetarjetas[i].getNumeroTarjeta() == pNuevaTarjeta.getNumeroTarjeta()) {
          tarjetarepetida = true;
        }
      }

      if (tarjetarepetida == true) {
        registrovalido = false;
      } else {
        listadetarjetas.push(pNuevaTarjeta);
        registrovalido = localStorageFactory.setItem(listaTarjetas, listadetarjetas);
      }

      return registrovalido;
    };

    function _obtenerlistadetarjetas(idCliente) {
      let listadetarjetaslocal = localStorageFactory.getItem(listaTarjetas),
        listadetarjetas = [];

      if (listadetarjetaslocal == []) {
        listadetarjetas = []
      } else {
        listadetarjetaslocal.forEach(obj => {
          let tempTarjeta = new Tarjeta(obj.tipoTarjeta, obj.nombreTarjeta, obj.numeroTarjeta, obj.cvvTarjeta, obj.fechaTarjeta, obj.idCliente);

          if (idCliente == null) {
            listadetarjetas.push(tempTarjeta);
          } else {
            if (idCliente == obj.idCliente ) {
              listadetarjetas.push(tempTarjeta); 
            }  
          }

        });
      }

      return listadetarjetas;
    }

  }

})();