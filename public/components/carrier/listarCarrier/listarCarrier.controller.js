(() => {
    'use strict';

    angular
        .module('correosCR')
        .controller('controladorlistaCarrier', controladorlistaCarrier)

    controladorlistaCarrier.$inject = ['$state', '$stateParams', 'servicioCarrier']
    function controladorlistaCarrier($state, $stateParams, servicioCarrier) {
        let vm = this;


        vm.listarCarrierAct = servicioCarrier.retornarCarrierAct();
        vm.listarCarrierDesact = servicioCarrier.retornarCarrierDesact();

        vm.desactivarCarrier = (pcarriers) => {
            let objCarrier = new Carriers (pcarriers.codigoCarrier, pcarriers.nombreCarrier, pcarriers.estadoCarrier);
            servicioCarrier.cambiarEstado(objCarrier);
            $state.reload();
        }//

        vm.activarCarrier = (pcarriers) => {
            let objCarrier = new Carriers(pcarriers.codigoCarrier, pcarriers.nombreCarrier, pcarriers.estadoCarrier);
            servicioCarrier.cambiarEstado(objCarrier);
            $state.reload();
        }//
        

        vm.editarCarrier = (pcarrier) => {
            $state.go('main.editarCarrier', { objCarrierMod: JSON.stringify(pcarrier) });
        }

        /**
         * recibir carrier a desactivar y cambia el estado a el opuesto del que ya tiene
         * @param {carrier a modificar} pcarrier 
         */
  
        

        vm.editarCarrier = (pcarrier) => {
            $state.go('main.editarCarrier', { objCarrier: JSON.stringify(pcarrier) });
        }// fin Editar 

        vm.agregarCarrier = () => {
            $state.go('main.registroCarrier');
        }



        //vm.retornarDatosCarrier = servicioCarrier.retornarNombreCarrierLS();

        //   vm.listarRepartidores = () => {
        //       return codigoSeleccionado
        //   }

    }
})();