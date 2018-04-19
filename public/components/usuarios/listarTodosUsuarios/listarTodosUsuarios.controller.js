(() => {
  'use strict';
  angular
    .module('correosCR')
    .controller('controladorListarUsuarios', controladorListarUsuarios);

    controladorListarUsuarios.$inject = ['$http', '$stateParams', '$state', 'servicioUsuarios', 'servicioInicioSesion']; 

  function controladorListarUsuarios($http, $stateParams, $state, servicioUsuarios, servicioInicioSesion) {
    
    const userAuth = servicioInicioSesion.getAuthUser();
    
    let vm = this;

    vm.listarUsuarios = servicioUsuarios.obtenerListaPorEstados(true);

    vm.filtrarUsuario = (pclientesRol) => {
      vm.listarUsuarios = servicioUsuarios.obtenerlistaFiltrada(pclientesRol);
    }

  }
})();