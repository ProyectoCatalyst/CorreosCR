(() => {
    'use strict'
  
    angular
    .module('correosCR')
    .controller('controladorListarConvenios', controladorListarConvenios)
  
    controladorListarConvenios.$inject = ['$state', '$stateParams', 'servicioConvenio', 'servicioInicioSesion', 'servicioTramite' ];
    function controladorListarConvenios($state, $stateParams, servicioConvenio, servicioInicioSesion, servicioTramite){
    
      let vm = this;
  
      vm.listarConvenios = servicioConvenio.retornarConvenio();
  
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
  
      vm.eliminarConvenio = (pconvenioEliminar) => {
        let confirm = swal({
          title: '¿Quiere eliminar este convenio?',
          text: 'Una vez eliminado se perderá la informacion',
          buttons: ['Cancelar', 'Continuar'],
          icon: 'warning',
          dangerMode: 'true'
        }).then((confirmacion) => {
          if(confirmacion){
  
            let eliminacion = servicioConvenio.eliminarConvenio(pconvenioEliminar);
  
            if(eliminacion){
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
  
      vm.editarConvenio = (convenioMod) => {
        $state.go('editarConvenios', {convenioMod: JSON.stringify(convenioMod)});
      }
  
      vm.agregarConvenio = () => {
        $state.go('main.registrarConvenio')
      }
  
    }
  
  })();