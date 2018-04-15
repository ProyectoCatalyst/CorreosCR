(() => {
    'use strict';
    angular
        .module('correosCR')
        .controller('controladorPrealertarPaquete', controladorPrealertarPaquete);

    controladorPrealertarPaquete.$inject = ['$http','$stateParams', '$state', 'servicioPaquetes', 'servicioUsuarios'];

    function controladorPrealertarPaquete($http, $stateParams, $state, servicioPaquetes, servicioUsuarios) {

        let vm = this;

        const userAuth = servicioPaquetes.getAuthUser();
        if (userAuth == undefined) {
            $state.go('inicioSesion');
        }
        vm.usuarioActivo = userAuth;

        vm.tipoPaquetes = $http({
            method: 'GET',
            url: './sources/data/tipoPaquete.json'
        }).then(function (success) {
            vm.tipoPaquetes = success.data;
        }, function (error) { }); //tipoPaquete

        vm.tipoMensajero = $http({
            method: 'GET',
            url: './sources/data/tipoMensajero.json'
        }).then(function (success) {
            vm.tipoMensajero = success.data
        }, function (error) {
        }); //tipoMensajero


        vm.nuevoPaquetePrealertado = {};

        vm.nuevoPaquetePrealertado.trackingPaquete = servicioPaquetes.numeroTracking();

        listarPaquetesPrealertados();
        vm.prealertarPaquete = (pnuevoPaquetePrealertado) => {

            pnuevoPaquetePrealertado.usuarioPaquete = userAuth.cedula;
            pnuevoPaquetePrealertado.usuarioSucursal = userAuth.idSucursal;
            pnuevoPaquetePrealertado.estadoPaquete = 'Prealertado';
            pnuevoPaquetePrealertado.idRepartidorPaquete = 0;


            let objNuevoPaquetePrealertado = new Paquete(pnuevoPaquetePrealertado.trackingPaquete, pnuevoPaquetePrealertado.usuarioPaquete, pnuevoPaquetePrealertado.tipoPaquete, pnuevoPaquetePrealertado.pesoPaquete, pnuevoPaquetePrealertado.precioPaquete, pnuevoPaquetePrealertado.costoTotalPaquete, pnuevoPaquetePrealertado.estadoPaquete, pnuevoPaquetePrealertado.usuarioSucursal, pnuevoPaquetePrealertado.idRepartidorPaquete);

            let codigoValidado = servicioPaquetes.prealertarPaquete(objNuevoPaquetePrealertado);

            if (codigoValidado == true) {
                swal({
                    title: "Paquete prealertado!",
                    text: "El paquete se ha prealertado exitosamente",
                    icon: "success",
                    button: "Aceptar"
                });
                $state.reload();
            } else {
                swal({
                    title: "Error",
                    text: "ha ocurrido un error interno por favor vuelva intentarlo",
                    icon: "error",
                    button: "Aceptar"
                });
                $state.reload();
            } //fin else

            vm.nuevoPaquetePrealertado = null;
            listarPaquetesPrealertados();

        } // fin vm.prealertar paquetes

        vm.costo = () => {

            let
                pesoPaquete = vm.nuevoPaquetePrealertado.pesoPaquete,
                impuestoCalcular = vm.nuevoPaquetePrealertado.tipoPaquete._id,
                precioPaquete = vm.nuevoPaquetePrealertado.precioPaquete;

            vm.nuevoPaquetePrealertado.costoTotalPaquete = "₡ " + servicioPaquetes.costoPaquete(pesoPaquete, precioPaquete, impuestoCalcular);
        }

        vm.listarPaquetesPrealertados = () => {
            $state.go('main.listarPaquetesPrealertados')
        }

        function listarPaquetesPrealertados() {
            vm.listaPaquetesPrealertados = servicioPaquetes.retornarPaquetesPrealertados();
        }
    } // fin de la función controladorPrealertarPaquete
})();