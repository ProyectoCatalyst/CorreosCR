(() => {
    'use strict'
    
    angular
    .module('correosCR')
    .service('servicioTramite', servicioTramite);
  
    servicioTramite.$inject = ['dataStorageFactory'];
    function servicioTramite(dataStorageFactory){
  
      const listaTramite = 'tramitesLS';
  
      let publicAPI = {
        agregarTramite:  _agregarTramite,
        retornarTramites:  _retornarTramites
      };
      return publicAPI;
  
      /**
       *  esta funcion compara el nuevo tramite y verificara si se repite, retorna true o false
       * @param {el tramite con formato de objeto que se va a agregar} ptramite 
       */
      function _agregarTramite(ptramite){
        let tramitesLS = _retornarTramites(),
            repetido = false;
  
        for(let i=0; i<tramitesLS.length; i++){
          if(tramitesLS[i].getCodigo() == ptramite.getCodigo() && tramitesLS[i].getCedula() == ptramite.getCedula()){
            repetido = true
          }
        }
  
        if(!repetido){
          dataStorageFactory.registrarTramite(ptramite)
        }
        return !repetido
      }
  
      function _retornarTramites(){
        let tramitesLS = dataStorageFactory.retornarTramite(),
            todosLosTramites = [];
  
        if(tramitesLS.length == 0){
  
        }else{
          tramitesLS.forEach(objTemp => {
            let tramiteTem = new Tramite(objTemp.codigoTramite, objTemp.nombreTramite, objTemp.descripcionTramite, objTemp.institucionTramite, objTemp.costoTramite, objTemp.cedulaCliente, objTemp.correoCliente);
  
          todosLosTramites.push(tramiteTem)
          })
        }
        return todosLosTramites
      }
  
    }
  })()