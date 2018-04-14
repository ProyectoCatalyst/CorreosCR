(() => {
    'use strict';
    angular
      .module('correosCR')
      .service('servicioConvenio', servicioConvenio);
  
    servicioConvenio.$inject = ['$q', '$log', '$http', 'dataStorageFactoy'];
  
    function servicioConvenio($q, $log, $http, dataStorageFactoy) {
  
      const listaConvenios = 'listaConveniosLS';
  
      let publicAPI = {
        agregarConvenio: _agregarConvenio,
        retornarConvenio: _retornarConvenio,
        eliminarConvenio: _eliminarConvenio,
        editarConvenio: _editarConvenio
      }
      return publicAPI;
  
      function _agregarConvenio(pconvenioNuevo) {
        let conveniosLS = _retornarConvenio(),
              repetido = false;
  
        for(let i=0; i<conveniosLS.length; i++){
          if(conveniosLS[i].getCodigo() == pconvenioNuevo.codigoConvenio){
            repetido = true
          }
        }
  
        if(!repetido){
          conveniosLS.push(pconvenioNuevo);
          dataStorageFactoy.registrarConvenio(pconvenioNuevo);
        }
  
        return repetido
      }
  
      function _retornarConvenio() {
        let listaConveniosTemporal = [],
            conveniosLS = dataStorageFactoy.retornarConvenios();
  
        if (conveniosLS.length == 0) {
         listaConveniosTemporal = [];
        } else {
          conveniosLS.forEach(obj => {
  
            let objConvenio = new Convenio(obj.codigoConvenio, obj.nombreConvenio, obj.descripcionConvenio, obj.institucionConvenio, obj.costoConvenio);
  
            listaConveniosTemporal.push(objConvenio)
          });
        }
        return listaConveniosTemporal;
      }
  
      function _eliminarConvenio(pconvenioEliminar){
        let conveniosLS = _retornarConvenio(),
            actualizarLista = [];
  
        for(let i=0; i<conveniosLS.length; i++){
          if(conveniosLS[i].getCodigo() != pconvenioEliminar.codigoConvenio){
            actualizarLista.push(conveniosLS[i]);
          }
        }
        let exito = actualizarConvenios(actualizarLista);
  
        return exito
      }
  
      function _editarConvenio(pconvenioMod){
        let conveniosLS = _retornarConvenio(),
            exito;
  
        for(let i=0; i<conveniosLS.length; i++){
          if(conveniosLS[i].getCodigo() == pconvenioMod.codigoConvenio){
            exito = actualizarConvenios(pconvenioMod);
          }
        }
        return exito
      }
  
  
      function actualizarConvenios(pconvenioActualizar){
        let exito = dataStorageFactoy.actualizarConvenios(pconvenioActualizar);
  
        return exito
      }
  
    }
  })();