(() => {
    'use strict';
    angular
        .module('correosCR')
        .controller('controladorPrealertar', controladorPrealertar);
    controladorPrealertar.$inject = ['$http', '$stateParams', '$state', 'servicioPaquetes', 'servicioInicioSesion'];

    function controladorPrealertar($http, $stateParams, $state, servicioPaquetes, servicioInicioSesion) {

        const userAuth = servicioInicioSesion.getAuthUser();

        let vm = this;

        vm.tipoPaquetes = $http({
            method: 'GET',
            url: './sources/data/tipoPaquete.json'
        }).then(function (success) {
            vm.tipoPaquetes = success.data;
        }, function (error) { }); //tipoPaquete

        vm.paqueteNuevo = {};
        vm.paqueteNuevo.trackingPaquete = servicioPaquetes.numeroTracking();

        vm.prealertarPaquete = (pPaqueteNuevo) => {

            let idCliente = userAuth.getCorreo(),
                idSucursal = 400,
                idRepartidor = 0,
                estadoPaquete = 'Prealertado',
                costoEnvio = 3500;
                pPaqueteNuevo.costoTotalPaquete = 3000;

            let objNuevoPaquete = new Paquete(pPaqueteNuevo.trackingPaquete, pPaqueteNuevo.tipoPaquete._id, 
                pPaqueteNuevo.pesoPaquete, pPaqueteNuevo.precioPaquete, costoEnvio, pPaqueteNuevo.costoTotalPaquete,
                estadoPaquete, idRepartidor, idSucursal, idCliente, pPaqueteNuevo.idMensajero);

            let prealerta = servicioPaquetes.prealertarPaquete(objNuevoPaquete);



            if (prealerta == true) {
                swal({
                    title: "Pre-alerta exitosa",
                    text: "Paquete pre-alertado correctamente",
                    icon: "success",
                    button: "Aceptar"
                });
                vm.paquete = null;
                $state.go('main.inicio');
            } else {
                swal({
                    title: "Ha ocurrido un Error",
                    text: "El paquete no ha sido pre-alertado",
                    icon: "error",
                    button: "Aceptar"
                });
            }
        }
    }
})()