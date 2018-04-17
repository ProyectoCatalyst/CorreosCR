(() => {
    'use strict';
    angular
        .module('correosCR')
        .controller('controladorModificarEstadoPaquete', controladorModificarEstadoPaquete);

        controladorModificarEstadoPaquete.$inject = ['$stateParams', '$state', '$http', 'servicioPaquetes', 'servicioInicioSesion'];

    function controladorModificarEstadoPaquete($stateParams, $state, $http, servicioPaquetes, servicioInicioSesion) {

        if (!$stateParams.objPaqueteModEstado) {
            $state.go('main.listarPaquete'); // que vaya a otra vista cuando no encuntre la info transferida.
        }

        let vm = this;

        let objPaqueteModSinFormato = JSON.parse($stateParams.objPaqueteModEstado);

        let objPaquetesModTemp = new Paquete(objPaqueteModSinFormato.trackingPaquete, objPaqueteModSinFormato.tipoPaquete,
            objPaqueteModSinFormato.pesoPaquete, objPaqueteModSinFormato.precioPaquete, objPaqueteModSinFormato.costoEnvio,
            objPaqueteModSinFormato.costoTotalPaquete, objPaqueteModSinFormato.estadoPaquete, objPaqueteModSinFormato.idRepartidor,
            objPaqueteModSinFormato.idSucursal, objPaqueteModSinFormato.idCliente, objPaqueteModSinFormato.idMensajero);

        //--capturar una lista de repartidores y la sucursal del paquete--//
        let repartidorSucursal = 100;
        let sucursalActiva = objPaquetesModTemp.idSucursal;
        let arrRepartidores = [];

        //--recorrer la lista de repartidores capturados y luego filtrar la lista según la sucursal del paquete--//
        for (let i = 0; i < repartidorSucursal.length; i++) {
            let validar = repartidorSucursal[i].sucursal;

            if (validar == sucursalActiva) {
                arrRepartidores.push(repartidorSucursal[i]);
            }
        }

        vm.repartidoresActivos = arrRepartidores;


        vm.informacionPaquete = objPaqueteModSinFormato;

        vm.PaquetesPrealertadosMod = {};

        vm.estadosPaquetes = $http({
            method: 'GET',
            url: './sources/data/estadosPaquetes.json'
        }).then(function (success) {
            vm.estadosPaquetes = success.data
        }, function (error) {
        });//estadoPaquete

        vm.actualizarPaquete = (PaquetesPrealertadosMod) => {

            PaquetesPrealertadosMod.trackingPaquete = objPaquetesModTemp.trackingPaquete;
            PaquetesPrealertadosMod.tipoPaquete = objPaquetesModTemp.tipoPaquete;
            PaquetesPrealertadosMod.pesoPaquete = objPaquetesModTemp.pesoPaquete;
            PaquetesPrealertadosMod.precioPaquete = objPaquetesModTemp.precioPaquete;
            PaquetesPrealertadosMod.costoEnvio = objPaquetesModTemp.costoEnvio;
            PaquetesPrealertadosMod.costoTotalPaquete = objPaquetesModTemp.costoTotalPaquete;
            PaquetesPrealertadosMod.idRepartidor = 1;
            PaquetesPrealertadosMod.idSucursal = objPaquetesModTemp.idSucursal;
            PaquetesPrealertadosMod.idCliente = objPaquetesModTemp.idCliente;
            PaquetesPrealertadosMod.idMensajero = objPaquetesModTemp.idMensajero;

let estadoNuevo = PaquetesPrealertadosMod.estadoPaquete.name;

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
            $state.go('main.listarPaquetesPrealertados');
        }
    }
})();