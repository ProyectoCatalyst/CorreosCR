(() => {
    'use strict'
  
    angular
    .module('correosCR')
    .controller('controladorEditarConvenios', controladorEditarConvenios);
  
    controladorEditarConvenios.$inject = ['$state', '$stateParams', 'servicioConvenio'];
  
    function controladorEditarConvenios($state, $stateParams, servicioConvenio){
      let vm = this;
  
      if(!$stateParams.convenioMod){
        $state.go('main.listaConvenios');
      }
  
      let previoConvenio = JSON.parse($stateParams.convenioMod);
  
      vm.convenioMod = {
        codigoConvenio: Number(previoConvenio.codigoConvenio),
        costoConvenio: Number(previoConvenio.costoConvenio),
        descripcionConvenio: previoConvenio.descripcionConvenio,
        institucionConvenio: previoConvenio.institucionConvenio,
        nombreConvenio: previoConvenio.nombreConvenio
      }
  
      vm.editarConvenio = (pactualizarConvenio) => {
        pactualizarConvenio.desact = previoConvenio.desact;
        let exito = servicioConvenio.editarConvenio(pactualizarConvenio);
  
        if(exito){
          $state.go('main.listaConvenios');
        }else{
          swal({
            title: "No se puede actualizar",
            text: "Intente más tarde",
            icon: "error",
            button: "Aceptar"
          })
        }
      }
      
    }
  })();