(() => {
    'use strict';

    angular
        .module('correosCR')
        .controller('controladorConsultarEstado', controladorConsultarEstado);

    controladorConsultarEstado.$inject = ['$stateParams', '$state', '$http', 'servicioPaquetes', 'servicioInicioSesion'];
    function controladorConsultarEstado($stateParams, $state, $http, servicioPaquetes, servicioInicioSesion) {

        let vm = this;
        const userAuth = servicioInicioSesion.getAuthUser();
        if (userAuth == undefined) {
            $state.go('inicioSesion');
        }
        let rolCliente = userAuth.rol;
        if (rolCliente == 5) {

            //vm.rolUsuario = true;
        }

        let objPaqueteSinFormato = JSON.parse($stateParams.objPaqueteEstado);

        let objPaqueteTemp = new Paquete(objPaqueteSinFormato.trackingPaquete, 
            objPaqueteSinFormato.tipoPaquete, objPaqueteSinFormato.precioPaquete,
            objPaqueteSinFormato.pesoPaquete, objPaqueteSinFormato.costoTotalPaquete, 
            objPaqueteSinFormato.estadoPaquete, objPaqueteSinFormato.idSucursal,
            objPaqueteSinFormato.precioPaquete, objPaqueteSinFormato.idCliente,
            objPaqueteSinFormato.precioPaquete.costoEnvio);

        vm.paqueteActivo = objPaqueteSinFormato.idCliente;
        vm.mostrarPaquete = objPaqueteSinFormato;

        vm.modificarEstadoPaquete = (pestadoPaquete) => {
            $state.go('main.modificarEstadoPaquete', { objPaqueteModEstado: JSON.stringify(pestadoPaquete) });
        }
    }
})();