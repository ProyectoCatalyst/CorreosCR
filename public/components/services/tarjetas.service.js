(() => {
  'use strict';
  angular
    .module('correosCR')
    .service('servicioTarjetas', servicioTarjetas);

  servicioTarjetas.$inject = ['$q', '$log', '$http', 'dataStorageFactory'];

  function servicioTarjetas($q, $log, $http, dataStorageFactory) {


    let publicAPI = {
      agregarTarjetas: _agregarTarjetas,
      obtenerlistadetarjetas: _obtenerlistadetarjetas,
      buscarTarjeta: _buscarTarjeta,
      editarTarjetas: _editarTarjetas,
      eliminarTarjeta: _eliminarTarjeta,
      agregarDatosSession: _agregarDatosSession,
      consultarDatosSession: _consultarDatosSession,
      removerDatosSession: _removerDatosSession
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
        // listadetarjetas.push(pNuevaTarjeta);
        registrovalido = dataStorageFactory.setCreditCardData(pNuevaTarjeta);
      }

      return registrovalido;
    };

    function _obtenerlistadetarjetas(idCliente) {
      let listadetarjetasDB = dataStorageFactory.getCreditCardData(),
        listadetarjetas = [];

      if (listadetarjetasDB == []) {
        listadetarjetas = []
      } else {
        listadetarjetasDB.forEach(obj => {
          let tempTarjeta = new Tarjeta(obj.tipoTarjeta, obj.nombreTarjeta, obj.numeroTarjeta, obj.cvvTarjeta, obj.mesTarjeta, obj.annoTarjeta, obj.idCliente);

          if (idCliente == null) {
            listadetarjetas.push(tempTarjeta);
          } else {
            if (idCliente == obj.idCliente) {
              listadetarjetas.push(tempTarjeta);
            }
          }

        });
      }

      return listadetarjetas;
    };

    function _buscarTarjeta(pNumeroTarjeta) {
      let listadetarjetas = _obtenerlistadetarjetas(),
        tarjeta;

      for (let i = 0; i < listadetarjetas.length; i++) {
        if (listadetarjetas[i].getNumeroTarjeta() == pNumeroTarjeta) {
          tarjeta = listadetarjetas[i];
        }
      };

      return tarjeta;
    };

    function _editarTarjetas(ptarjetaModificada) {
      let modificacionExitosa = false;

      modificacionExitosa = dataStorageFactory.updateCreditCard(ptarjetaModificada);

      return modificacionExitosa;
    }

    function _eliminarTarjeta(pNumeroTarjeta) {
      let eliminarExitosa = false;

      modificacionExitosa = dataStorageFactory.deleteCreditCard(pNumeroTarjeta);

      return eliminarExitosa;
    }

    function _agregarDatosSession(pNumeroTarjeta) {
      dataStorageFactory.setData(pNumeroTarjeta);
    };

    function _consultarDatosSession() {
      let datosTarjeta = dataStorageFactory.getData(),
        tarjetaActiva;

      if (!datosTarjeta) {
        tarjetaActiva = undefined;
      } else {
        tarjetaActiva = _buscarTarjeta(datosTarjeta);
      }

      return tarjetaActiva;
    };

    function _removerDatosSession() {
      dataStorageFactory.removeData();
    };
  };
})();