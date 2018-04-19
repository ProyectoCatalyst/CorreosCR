(() => {
  'use strict';
  angular
    .module('correosCR')
    .controller('controladorListarTarjeta', controladorListarTarjeta);

    controladorListarTarjeta.$inject = ['$http', '$stateParams', '$state', 'servicioTarjetas', 'servicioInicioSesion']; 

  function controladorListarTarjeta($http, $stateParams, $state, servicioTarjetas, servicioInicioSesion) {
    
    const userAuth = servicioInicioSesion.getAuthUser();
    
    let vm = this;

    vm.listaDeTarjetas = servicioTarjetas.obtenerlistadetarjetas(userAuth.getCorreo());
    vm.cedulaCliente = userAuth.getCedula();

    vm.modificarTarjetas = (pNumeroTarjeta) => {
      servicioTarjetas.agregarDatosSession(pNumeroTarjeta);
      $state.go('main.editarTarjetas');
    }

    vm.eliminarTarjeta = (pNumeroTarjeta) => {
      
      swal({
        title: "¿Desea eliminar la tarjeta?",
        text: "¿Está seguro que desea eliminar la tarjeta: " + pNumeroTarjeta + " ?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          swal("La tarjeta ha sido eliminada", {
            icon: "success",
          });
          
          servicioTarjetas.eliminarTarjeta(pNumeroTarjeta);
          $state.go('main.inicio');
        }
      });
      
    }
  }
})();