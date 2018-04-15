(() => {
  'use strict';
  angular
    .module('correosCR')
    .controller('controladorModificarTarjeta', controladorModificarTarjeta);

  controladorModificarTarjeta.$inject = ['$http', '$stateParams', '$state', 'servicioTarjetas', 'servicioInicioSesion'];

  function controladorModificarTarjeta($http, $stateParams, $state, servicioTarjetas, servicioInicioSesion) {

    const userAuth = servicioInicioSesion.getAuthUser();
    const tarjetaActiva = servicioTarjetas.consultarDatosSession();

    if (tarjetaActiva == undefined) {
      $state.go('main.listarTarjetas');
    }
    let vm = this;

    vm.tarjetaEditada = tarjetaActiva;

    vm.editarTarjeta = (ptarjetaEditada) => {

      let editar = servicioTarjetas.editarTarjetas(ptarjetaEditada);

      if (editar == true) {
        swal({
          title: "Actualización exitosa",
          text: "Tarjeta actualizada correctamente",
          icon: "success",
          button: "Aceptar"
        });
        vm.tarjetaNueva = null;
        servicioTarjetas.removerDatosSession();
        $state.go('main.inicio');
      } else {
        swal({
          title: "Ha ocurrido un Error",
          text: "La tarjeta no ha sido actualizada",
          icon: "error",
          button: "Aceptar"
        });
      }
    }
    
    vm.regresar = () => {
      servicioTarjetas.removerDatosSession();
      $state.go('main.listarTarjetas');
    }

  }
})();