(() => {
  'use strict';
  angular
    .module('correoCR')
    .controller('controladorRegistrarCarrier', controladorRegistrarCarrier);

  controladorRegistrarCarrier.$inject = ['$stateParams', '$state', '$http', 'servicioCarrier'];

  function controladorRegistrarCarrier($stateParams, $state, $http, servicioCarrier) {
    let vm = this;
    vm.CarrierNuevo = {};

    vm.listaCarrier = servicioCarrier.retornarCarrier();

    vm.registrarCarrier = (pCarrierNuevo) => {
      if (pCarrierNuevo.estadoCarrier == null) {
        pCarrierNuevo.estadoCarrier = true;
      }
      let objCarrierNuevo = new Carriers(pCarrierNuevo.codigoCarrier, pCarrierNuevo.nombreCarrier,
        pCarrierNuevo.estadoCarrier);

      let codigoValidado = servicioCarrier.agregarCarrier(objCarrierNuevo);

      if (codigoValidado == true) {
        swal({
          title: "Registro exitoso",
          text: "Mensajero registrado correctamente",
          icon: "success",
          button: "Aceptar"
        });
      } else {
        swal({
          title: "Registro fallido",
          text: "El mensajero que intenta registrar ha sido ingresado anteriormente correspondiente al código de monsajero: " + pCarrierNuevo.codigoCarrier,
          icon: "error",
          button: "Aceptar"
        });
      }//fin else

      vm.CarrierNuevo = null;

    }// fin vm.registrarCarriers

    vm.listarCarrier = () => {
      $state.go('main.listarCarrier')
    }

    function listarCarriers() {
      vm.listaCarrier = servicioCarrier.retornarCarrier();
    }
  }
})();