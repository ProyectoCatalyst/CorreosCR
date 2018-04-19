(() => {
  'use strict';
  angular
    .module('correosCR')
    .service('servicioCarrier', servicioCarrier);

  servicioCarrier.$inject = ['$q', '$log', '$http','dataStorageFactory','localStorageFactory'];

  function servicioCarrier($q, $log, $http, dataStorageFactory,localStorageFactory) {

    let publicAPI = {
      agregarCarrier: _agregarCarrier,
      retornarCarrier: _retornarCarrier,
      editarCarrier: _editarCarrier, 
      cambiarEstado: _cambiarEstado,
      retornarCarrierDesact: _retornarCarrierDesact,
      retornarCarrierAct: _retornarCarrierAct

    }

    return publicAPI;


    function _retornarCarrierAct() {
      let carrierLS = dataStorageFactory.getCarrierData(),
        carrierAct = [],
        carrierActLS = [];

      if (carrierLS == null) {
        return carrierActLS;
      } else {
        for (let i = 0; i < carrierLS.length; i++) {
          if (carrierLS[i].estadoCarrier == true) {
            carrierAct.push(carrierLS[i]);
          }
        }
        carrierAct.forEach(objTemp => {
          let objCarrierAct = new Carriers(objTemp.codigoCarrier, objTemp.nombreCarrier, objTemp.estadoCarrier);

          carrierActLS.push(objCarrierAct);
        });
        return carrierActLS;
      }
    }
    function _retornarCarrierDesact() {
      let carrierLS = dataStorageFactory.getCarrierData(),
        carrierDesact = [],
        carrierDesactLS = [];

      if (carrierLS == null) {
        return carrierDesactLS;
      } else {
        for (let i = 0; i < carrierLS.length; i++) {
          if (carrierLS[i].estadoCarrier == false) {
            carrierDesact.push(carrierLS[i]);
          }
        }

        carrierDesact.forEach(objTemp => {
          let objCarrierDesact = new Carriers(objTemp.codigoCarrier, objTemp.nombreCarrier, objTemp.estadoCarrier);

          carrierDesactLS.push(objCarrierDesact);
        });
        return carrierDesactLS
      }
    }

    function _cambiarEstado(pobjCarrier) {
      let carrierLS = _retornarCarrier();

      if(pobjCarrier.estadoCarrier){
        pobjCarrier.estadoCarrier = false;
      }else{
        pobjCarrier.estadoCarrier = true;
      }
      actualizarLista(pobjCarrier);
    }

    function _agregarCarrier(pCarrierNuevo) {

      let listaCarrier = _retornarCarrier();
      let validarCodigo = true;
      let tamanno = listaCarrier.length;
      for (let i = 0; i < tamanno; i++) {
        if (pCarrierNuevo.getCodigo() == listaCarrier[i].getCodigo()) {
          validarCodigo = false;
        }
      }

      if (validarCodigo == true) {
        // listaCarrier.push(pCarrierNuevo);
        // lgetCarrierData(listaCarrier);
        dataStorageFactory.setCarrierData(pCarrierNuevo);
      }
      return validarCodigo;
    }// fin función agregar

    function _retornarCarrier() {

      let listaCarrierLocal = dataStorageFactory.getCarrierData(),
        carrierTemp = [];

      if (listaCarrierLocal == null) {

        return carrierTemp;
      } else {
        listaCarrierLocal.forEach(obj => {

          let objCarrierNuevo = new Carriers(obj.codigoCarrier, obj.nombreCarrier, obj.estadoCarrier);

          carrierTemp.push(objCarrierNuevo);
        });
      }

      return carrierTemp;
    }// fin función retornar


    function _editarCarrier(pcarrierEditar) {
      dataStorageFactory.updateCarrierData(pcarrierEditar);
    }// fin función actualizar


    function actualizarLista(pcarrierLS) {
      dataStorageFactory.updateCarrierData(pcarrierLS);
    }

  }// fin servicio
})();