(() => {
  'use strict';
  angular
    .module('correosCR')
    .controller('controladorEditarCarrier', controladorEditarCarrier);

  controladorEditarCarrier.$inject = ['$stateParams', '$state', '$http', 'servicioCarrier'];

  function controladorEditarCarrier($stateParams, $state, $http, servicioCarrier) {
    let vm = this;

    if (!$stateParams.objCarrier) {
      $state.go('main.listarCarrier');
    }

    let objCarrierSinFormato = JSON.parse($stateParams.objCarrier);

    let objCarrierTemp = new Carriers (objCarrierSinFormato.codigoCarrier, objCarrierSinFormato.nombreCarrier);

    vm.carrierActiva = objCarrierTemp.nombreCarrier;

    vm.CarrierMod = {};

    vm.CarrierMod.codigoCarrier = objCarrierTemp.codigoCarrier;
    vm.CarrierMod.nombreCarrier = objCarrierTemp.nombreCarrier;
    
    vm.listaCarrier = listarCarriers();

    listarCarriers();

   

    vm.editarCarrier = (pcarrierEditar) => {
      if(pcarrierEditar.estadoCarrier==null){
        pcarrierEditar.estadoCarrier = true;
      }

      let objCarrierFormato = new Carriers(pcarrierEditar.codigoCarrier, pcarrierEditar.nombreCarrier, pcarrierEditar.estadoCarrier);

      let updateValido = servicioCarrier.editarCarrier(objCarrierFormato);

      if (updateValido == true) {
        swal({
          title: "Actualización exitosa",
          text: "Mensajero actualizado correctamente",
          icon: "success",
          button: "Aceptar"
        });

        $state.go('main.listarCarriers');
      }
      vm.CarrierNueva = null;
      listarCarriers();
    }

    function listarCarriers() {
      vm.listaCarrier = servicioCarrier.retornarCarrier();
    }

    vm.regresar = () => {
      $state.go('main.listarCarrier');
    }
  }
})();