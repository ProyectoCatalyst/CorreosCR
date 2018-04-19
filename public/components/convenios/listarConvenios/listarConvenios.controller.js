(() => {
    'use strict'
  
    angular
    .module('correosCR')
    .controller('controladorListarConvenios', controladorListarConvenios)
  
    controladorListarConvenios.$inject = ['$state', '$stateParams', 'servicioConvenio', 'servicioInicioSesion', 'servicioTramite' ];
    function controladorListarConvenios($state, $stateParams, servicioConvenio, servicioInicioSesion, servicioTramite){
    
      let vm = this;
  
      vm.listarConveniosAct = servicioConvenio.retornarConvenioEstado(false);

      vm.listarConveniosDesact = servicioConvenio.retornarConvenioEstado(true);
  
      vm.usuarioActivo = servicioInicioSesion.getAuthUser();
  
      vm.prealertarTramite = (tramite) => {
        let cedula = servicioInicioSesion.getAuthUser().cedula,
            correo = servicioInicioSesion.getAuthUser().correo,
            tramiteTem = new Tramite(tramite.codigoConvenio, tramite.nombreConvenio, tramite.descripcionConvenio, tramite.institucionConvenio, tramite.costoConvenio, cedula, correo);
  
            let exito = servicioTramite.agregarTramite(tramiteTem);
  
            if(exito){
              swal({
                title: 'Trámite prealertado',
                text: 'Gracias',
                icon: 'success',
                button: 'Aceptar'
              })
            }else{
              swal({
                title: 'Error',
                text: 'Ya has prealertado este tramite',
                icon: 'error',
                button: 'Aceptar'
              })
            }
      }
  
      vm.desactConvenio = (pconvenioDesact) => {
        let confirm = swal({
          title: '¿Quiere desactivar este convenio?',
          text: 'Una vez desactivado no podrá ser visualizado por los usuarios',
          buttons: ['Cancelar', 'Continuar'],
          icon: 'warning',
          dangerMode: 'true'
        }).then((confirmacion) => {
          if(confirmacion){

            pconvenioDesact.desact = true;
  
            let desactivacion = servicioConvenio.editarConvenio(pconvenioDesact);
  
            if(desactivacion){
              $state.reload()
            }else{
              swal({
                title: "Hubo un problema en la eliminación",
                text: "Intente de nuevo mas tarde",
                icon: "error",
                button: "Aceptar :("
              });
            }
  
          }else{
            swal({
              title: "Hubo un problema en la eliminación",
              text: "La información no se elimino",
              icon: "error",
              button: "Aceptar"
            });
          }
        });
       
      }

      vm.reactConvenio = (pconvenioReact) => {
        pconvenioReact.desact = false;
        servicioConvenio.editarConvenio(pconvenioReact);
        $state.reload();
      }
  
      vm.editarConvenio = (convenioMod) => {
        $state.go('editarConvenios', {convenioMod: JSON.stringify(convenioMod)});
      }
  
      vm.agregarConvenio = () => {
        $state.go('main.registrarConvenio')
      }
  
    }
  
  })();