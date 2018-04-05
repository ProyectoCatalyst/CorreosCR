(() => {
  'use strict';
  angular
    .module('correosCR')
    .controller('controladorInicioSesion', controladorInicioSesion);

  controladorInicioSesion.$inject = ['$stateParams', '$state', '$window', 'servicioUsuarios', 'servicioInicioSesion'];

  function controladorInicioSesion($stateParams, $state, $window, servicioUsuarios, servicioInicioSesion) {
    let vm = this;

    vm.usuario = {};

    vm.iniciarSesion = (pusuario) => {

      let inicioCorrecto = servicioInicioSesion.logIn(pusuario);

      if (inicioCorrecto == true){
        $state.go('main');
      }else{
        swal({
          title: "Verifique su información",
          text: "Los datos ingresados son incorrectos",
          icon: "error",
          button: "Aceptar"
        });
      }
    }

    vm.registrar = () => {
      $state.go('registrarCliente');
    }
    
  }
})();