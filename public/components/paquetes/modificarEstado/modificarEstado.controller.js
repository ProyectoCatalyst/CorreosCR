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

        vm.rolUsuario = userAuth.getRol();

        const paqueteActivo = servicioPaquetes.consultarDatosSession();
        if (paqueteActivo == undefined) {
            $state.go('main.listarPaquetes');
        }

        vm.paqueteMostrar = paqueteActivo;

        vm.cambioEstado = (pEstado, idRepartidor) => {
            let estadoDatos = [pEstado, idRepartidor],
                estado = '';

            switch (estadoDatos[0]) {
                case 0:
                    estado = "Prealertado";
                    paqueteActivo.setEstadoPaquete(estado);
                    break;
                case 1:
                    estado = "Saliendo de aduana";
                    paqueteActivo.setEstadoPaquete(estado);
                    break;
                case 2:
                    estado = "Entregado a repartidor";
                    paqueteActivo.setEstadoPaquete(estado);
                    break;
                case 3:
                    estado = "Entregado a cliente";
                    paqueteActivo.setEstadoPaquete(estado);
                    paqueteActivo.setRepartidor(estadoDatos[1]); 
                    break;
                default:
                    
                    break;
            }
            let registro = servicioPaquetes.modificarEstado(paqueteActivo); // envia todo el objeto, compara cada paquete ne el sistema con el codigo del paquete nuevo pmodificarEstado.convenio = paqueteLS[i].convenio
            if(registro == true){
                swal({
                  title: "Cambio exitoso",
                  text: "Se actualizo el estado del paquete correctamente",
                  icon: "success",
                  button: "Aceptar"
                });
                vm.tarjetaNueva = null;
              }else{
                swal({
                  title: "Ha ocurrido un Error",
                  text: "No se ha realizado el cambio",
                  icon: "error",
                  button: "Aceptar"
                });
              }
        }

        vm.regresar = () => {
            servicioPaquetes.removerDatosSession();
            $state.go('main.listarPaquetes');
        }
    }
})();