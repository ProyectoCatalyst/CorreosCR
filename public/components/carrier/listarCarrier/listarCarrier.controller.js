(() => {
  'use strict';

  angular
      .module('correosCR')
      .controller('controladorlistaCarrier', controladorlistaCarrier)

  controladorlistaCarrier.$inject = ['$state', '$stateParams', 'servicioCarrier']
  function controladorlistaCarrier($state, $stateParams, servicioCarrier) {
      let vm = this;

      let codigoSeleccionado; // ejemplo

      vm.listarCarrierAct = () => {
          let carrierBD = servicioCarrier.retornarCarrierAct(),
                carrierAct = [];

          for(let i=0; i<carrierBD.length; i++){
            if(carrierBD[i].estado){
                carrierAct.push(carrierBD[i]);
            }
          }
        return carrierAct
      }
      vm.listarCarrierDesact = () => {
        let carrierBD = servicioCarrier.retornarCarrierAct(),
        carrierDesact = [];

        for(let i=0; i<carrierBD.length; i++){
            if(!carrierBD[i].estado){
                carrierDesact.push(carrierBD[i]);
            }
        }
        return carrierDesact
      }

      vm.editarCarrier = (pcarrier) => {
          $state.go('main.editarCarrier', { objCarrierMod: JSON.stringify(pcarrier) });
      }

      /**
       * recibir carrier a desactivar y cambia el estado a el opuesto del que ya tiene
       * @param {carrier a modificar} pcarrier 
       */
      vm.cambiarEstado = (pcarrier) => {
          pcarrier.estado = !pcarrier.estado;

          servicioCarrier.editarCarrier(objCarrier);

          $state.reload();
      }


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