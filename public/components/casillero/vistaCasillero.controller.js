(() => {
    'use strict';
    angular
      .module('correosCR')
      .controller('controladorCasillero', controladorCasillero);
  
      controladorCasillero.$inject = ['$http', '$state', 'servicioInicioSesion']; 
  
    function controladorCasillero($http, $state, servicioInicioSesion) {
      
      const userAuth = servicioInicioSesion.getAuthUser();
      
      let vm = this;
  
      vm.casillero = {};
      

      vm.casillero = userAuth;

      
        
      
    }
  })();