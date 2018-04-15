(() => {
  'use strict';
  angular
    .module('correosCR')
    .controller('controladorModificarTarjeta', controladorModificarTarjeta);

    controladorListcontroladorModificarTarjetaarTarjeta.$inject = ['$http', '$stateParams', '$state', 'servicioTarjetas', 'servicioInicioSesion']; 

  function controladorModificarTarjeta($http, $stateParams, $state, servicioTarjetas, servicioInicioSesion) {
    
    const userAuth = servicioInicioSesion.getAuthUser();
    
    let vm = this;

    vm.modificarTarjetas = (pIdCliente) => {
      $state.go('main.editarTarjetas', {objUsuario : JSON.stringify(pusuario)});
    }
    
  }
})();