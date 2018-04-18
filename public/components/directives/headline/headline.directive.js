(() => {
  'use strict';
  angular
    .module('correosCR')
    .directive('cabeceraPrincipal', cabeceraPrincipal);

  cabeceraPrincipal.$inject = ['$state', 'servicioInicioSesion'];

  function cabeceraPrincipal($state, servicioInicioSesion) {

    let headlineController = function () {
      let vm = this;
      vm.cerrarSesion = () => {
        swal("¿Desea cerrar la sesión?", {
            buttons: {
              cancel: "Cancelar",
              cerrarSesion: {
                text: "Cerrar sesión",
                value: "cerrarSesion",
              },
            },
          })
          .then((value) => {
            switch (value) {
              case "cerrarSesion":
                servicioInicioSesion.logOut();
                $state.go('paginaInicio');
                swal({
                  title: "Sesión cerrada correctamente",
                  text: "Se ha finalizado su sesión correctamente",
                  icon: "success",
                  button: "Aceptar",
                });
              break;

              default:
                break;
            }
          });
      };
    };

    let headline = {
      templateUrl: '/components/directives/headline/headline.view.html',
      restrict: 'EA',
      require: "ngClick",
      controller: headlineController,
      controllerAs: 'vm',
    };
    return headline;
  }
})();