(() =>{
  'use strict';
  angular
  .module('correosCR')
  .controller('mainController', mainController);

  mainController.$inject = ['$state', 'servicioInicioSesion'];

  function mainController($state, servicioInicioSesion){

    const userAuth = servicioInicioSesion.getAuthUser();

    if(userAuth == undefined){
      $state.go('paginaInicio');
    }

    const vm = this;
  };
})();