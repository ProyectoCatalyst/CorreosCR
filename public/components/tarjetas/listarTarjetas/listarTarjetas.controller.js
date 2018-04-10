(() => {
  'use strict';
  angular
    .module('correosCR')
    .controller('controladorListarTarjeta', controladorListarTarjeta);

    controladorListarTarjeta.$inject = ['$http', '$stateParams', '$state', 'servicioTarjetas', 'servicioInicioSesion']; 

  function controladorListarTarjeta($http, $stateParams, $state, servicioTarjetas, servicioInicioSesion) {
    
    const userAuth = servicioInicioSesion.getAuthUser();
    
    let vm = this;

    vm.listaDeTarjetas = servicioTarjetas.obtenerlistadetarjetas(userAuth.getCedula());
    
  }
})();