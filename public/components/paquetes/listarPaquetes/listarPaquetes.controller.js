(() => {
    'use strict';

    angular
        .module('correosCR')
        .controller('controladorListarPaquetes', controladorListarPaquetes)

    controladorListarPaquetes.$inject = ['$stateParams', '$state', 'servicioPaquetes','servicioInicioSesion']
    function controladorListarPaquetes($stateParams, $state, servicioPaquetes, servicioInicioSesion) {

        let vm = this;
        const userAuth = servicioInicioSesion.getAuthUser();
        if (userAuth == undefined) {
            $state.go('inicioSesion');
        }

        vm.retornarPaquetesPrealertados = servicioPaquetes.retornarPaquetesPrealertados();

        vm.nombreUsuario = userAuth.primerNombre;
        vm.apellidoUsuario = userAuth.primerApellido;
        vm.rol = userAuth.getRol();
        let usuarioCorreo = userAuth.correo;
        let usuarioRol = userAuth.rol;
        let sucursalID = userAuth.idSucursal;

        switch (usuarioRol) {
            case "1":
                vm.listarPaquetesPrealertados = servicioPaquetes.listarPaquetesPrealertados(usuarioRol);
                break;
            case "2":
                vm.listarPaquetesPrealertados = servicioPaquetes.listarPaquetesPrealertados(usuarioRol);
                break;
            case"3":
                vm.listarPaquetesPrealertados = servicioPaquetes.listarPaquetesPrealertados(usuarioRol, sucursalID);
                break;
            case "4":
                vm.listarPaquetesPrealertados = servicioPaquetes.retornarPaquetesPorRepartidor(usuarioCorreo);
                break;
            case "5":
                vm.listarPaquetesPrealertados = servicioPaquetes.retornarPaquetesPorCliente(usuarioCorreo);
                break;
            default:

                break;
        }

        vm.estadoPaquete = (ppaquetesPrealertados) => {
            servicioPaquetes.agregarDatosSession(ppaquetesPrealertados);
            $state.go('main.estadoPaquete');
        }

    }
})();