(() => {
    'use strict';
    angular
      .module('correosCR')
      .service('servicioConvenio', servicioConvenio);
  
    servicioConvenio.$inject = ['$q', '$log', '$http', 'dataStorageFactory'];
  
    function servicioConvenio($q, $log, $http, dataStorageFactory) {
  
      const listaConvenios = 'listaConveniosDB';
  
      let publicAPI = {
        agregarConvenio: _agregarConvenio,
        retornarConvenio: _retornarConvenio,
        eliminarConvenio: _eliminarConvenio,
        editarConvenio: _editarConvenio,
        retornarConvenioEstado: _retornarConvenioEstado
      }
      return publicAPI;
  
      function _agregarConvenio(pconvenioNuevo) {
        let conveniosDB = _retornarConvenio(),
              repetido = false;
  
        for(let i=0; i<conveniosDB.length; i++){
          if(conveniosDB[i].getCodigo() == pconvenioNuevo.codigoConvenio){
            repetido = true
          }
        }
  
        if(!repetido){
          conveniosDB.push(pconvenioNuevo);
          dataStorageFactory.registrarConvenio(pconvenioNuevo);
        }
  
        return repetido
      }
  
      function _retornarConvenio() {
        let listaConveniosTemporal = [],
            conveniosDB = dataStorageFactory.retornarConvenios();
  
        if (conveniosDB.length == 0) {
         listaConveniosTemporal = [];
        } else {
          conveniosDB.forEach(obj => {
  
            let objConvenio = new Convenio(obj.codigoConvenio, obj.nombreConvenio, obj.descripcionConvenio, obj.institucionConvenio, obj.costoConvenio, obj.desact);
  
            listaConveniosTemporal.push(objConvenio)
          });
        }
        return listaConveniosTemporal;
      }
  
      function _eliminarConvenio(pconvenioEliminar){
        let conveniosDB = _retornarConvenio(),
            actualizarLista = [];
  
        for(let i=0; i<conveniosDB.length; i++){
          if(conveniosDB[i].getCodigo() != pconvenioEliminar.codigoConvenio){
            actualizarLista.push(conveniosDB[i]);
          }
        }
        let exito = actualizarConvenios(actualizarLista);
  
        return exito
      }
  
      function _editarConvenio(pconvenioMod){
        let conveniosDB = _retornarConvenio(),
            exito;
  
        for(let i=0; i<conveniosDB.length; i++){
          if(conveniosDB[i].getCodigo() == pconvenioMod.codigoConvenio){
            exito = actualizarConvenios(pconvenioMod);
          }
        }
        return exito
      }

      function _retornarConvenioEstado(pestado){
        let conveniosBD = _retornarConvenio(),
            conveniosEstado = [];

        for(let i=0; i<conveniosBD.length; i++){
          if(conveniosBD[i].desact == String(pestado)){
            conveniosEstado.push(conveniosBD[i]);
          }
        }
        return conveniosEstado
      }
  
  
      function actualizarConvenios(pconvenioActualizar){
        let exito = dataStorageFactory.actualizarConvenios(pconvenioActualizar);
  
        return exito
      }
  
    }
  })();