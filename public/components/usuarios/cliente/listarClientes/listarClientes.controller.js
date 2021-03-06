(() => {
  'use strict';
  angular
    .module('correosCR')
    .controller('controladorListarClientes', controladorListarClientes);

    controladorListarClientes.$inject = ['$http', '$stateParams', '$state', 'servicioUsuarios', 'servicioInicioSesion']; 

  function controladorListarClientes($http, $stateParams, $state, servicioUsuarios, servicioInicioSesion) {
    
    const userAuth = servicioInicioSesion.getAuthUser();
    
    let vm = this;

    let clientesRol = 5;

    vm.listaDeUsuarios = servicioUsuarios.obtenerlistaFiltrada(clientesRol);
   
  }
})();