(() => {
  'use strict';
  angular
  .module('correosCR')
  .controller('perfilController', perfilController);

  perfilController.$inject = ['$stateParams', '$state', '$http','servicioUsuarios', 'servicioInicioSesion']

  function perfilController($stateParams, $state, $http, servicioUsuarios, servicioInicioSesion){
    const vm = this;

    const userAuth = servicioInicioSesion.getAuthUser();

    if(userAuth == undefined){
      $state.go('inicioSesion');
    }

    vm.usuarioActivo = userAuth;
    vm.rol = userAuth.getRol();

    vm.editar = () => {
      $state.go('main.editarUsuario');
    }
  };
})();