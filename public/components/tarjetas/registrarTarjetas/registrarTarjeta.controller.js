(() => {
  'use strict';
  angular
    .module('correosCR')
    .controller('controladorRegistrarTarjeta', controladorRegistrarTarjeta);

    controladorRegistrarTarjeta.$inject = ['$http', '$stateParams', '$state', 'servicioTarjetas', 'servicioInicioSesion', 'servicioUsuarios']; 

  function controladorRegistrarTarjeta($http, $stateParams, $state, servicioTarjetas, servicioInicioSesion, servicioUsuarios) {
    
    const userAuth = servicioInicioSesion.getAuthUser();
    
    let vm = this;

    vm.tarjetaNueva = {};
    
    vm.registrarTarjeta= (pTarjetaNueva) => {

      let idCliente = userAuth.getCorreo();
      let fechaTarjeta = pTarjetaNueva.mes + ' / ' + pTarjetaNueva.anno;
      let objNuevaTarjeta = new Tarjeta(pTarjetaNueva.tipoTarjeta, pTarjetaNueva.nombreTarjeta, pTarjetaNueva.numeroTarjeta, pTarjetaNueva.cvvTarjeta, fechaTarjeta, idCliente);

      // userAuth.agregarTarjetas(objNuevaTarjeta.numeroTarjeta);
      // servicioUsuarios.actualizarUsuario(userAuth);

      let registro = servicioTarjetas.agregarTarjetas(objNuevaTarjeta);

      if(registro == true){
        swal({
          title: "Registro exitoso",
          text: "Tarjeta registrada correctamente",
          icon: "success",
          button: "Aceptar"
        });
        vm.tarjetaNueva = null;
        $state.go('main.inicio');
      }else{
        swal({
          title: "Ha ocurrido un Error",
          text: "La tarjeta no ha sido registrada",
          icon: "error",
          button: "Aceptar"
        });
      }
    }
  }
})();