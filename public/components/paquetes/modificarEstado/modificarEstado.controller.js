(() => {
    'use strict';
    angular
        .module('correosCR')
        .controller('controladorModificarEstadoPaquete', controladorModificarEstadoPaquete);

    controladorModificarEstadoPaquete.$inject = ['$stateParams', '$state', '$http', 'servicioPaquetes', 'servicioInicioSesion'];

    function controladorModificarEstadoPaquete($stateParams, $state, $http, servicioPaquetes, servicioInicioSesion) {
        
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


        vm.actualizarPaquete = (PaquetesPrealertadosMod) => {

            let objPaqueteFormato = new Paquete(PaquetesPrealertadosMod.trackingPaquete, PaquetesPrealertadosMod.tipoPaquete,
                PaquetesPrealertadosMod.pesoPaquete, PaquetesPrealertadosMod.precioPaquete, PaquetesPrealertadosMod.costoEnvio,
                PaquetesPrealertadosMod.costoTotalPaquete, estadoNuevo, PaquetesPrealertadosMod.idRepartidor,
                PaquetesPrealertadosMod.idSucursal, PaquetesPrealertadosMod.idCliente, PaquetesPrealertadosMod.idMensajero);
            servicioPaquetes.modificarEstado(objPaqueteFormato); // envia todo el objeto, compara cada paquete ne el sistema con el codigo del paquete nuevo pmodificarEstado.convenio = paqueteLS[i].convenio


            swal({
                title: "Actualización exitosa",
                text: "estado actualizado correctamente",
                icon: "success",
                button: "Aceptar"
            });

            $state.go('main.listarPaquetesPrealertados');
        }

        vm.regresar = () => {
            servicioPaquetes.removerDatosSession();
            $state.go('main.listarPaquetes');
        }
    }
})();