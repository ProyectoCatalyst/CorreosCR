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
            $state.go('main.inicio');
        }

        const paqueteActivo = servicioPaquetes.consultarDatosSession();
        if (paqueteActivo == undefined) {
            $state.go('main.listarPaquetes');
        }

        vm.paqueteMostrar = paqueteActivo;
        vm.rol = userAuth.getRol();

        vm.modificarEstadoPaquete = (pestadoPaquete) => {
            $state.go('main.modificarEstadoPaquete');
        }

        vm.regresar = () => {
            servicioPaquetes.removerDatosSession();
            $state.go('main.listarPaquetes');
        }
    }
})();