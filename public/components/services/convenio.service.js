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
        editarConvenio: _editarConvenio
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
  
            let objConvenio = new Convenio(obj.codigoConvenio, obj.nombreConvenio, obj.descripcionConvenio, obj.institucionConvenio, obj.costoConvenio);
  
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
  
  
      function actualizarConvenios(pconvenioActualizar){
        let exito = dataStorageFactory.actualizarConvenios(pconvenioActualizar);
  
        return exito
      }
  
    }
  })();