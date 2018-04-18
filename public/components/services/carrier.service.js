(() => {
  'use strict';
  angular
    .module('correosCR')
    .service('servicioCarrier', servicioCarrier);

  servicioCarrier.$inject = ['$q', '$log', '$http','dataStorageFactory'];

  function servicioCarrier($q, $log, $http,dataStorageFactory) {


    let publicAPI = {
      agregarCarrier: _agregarCarrier,
      retornarCarrierAct: _retornarCarrierAct,
      editarCarrier: _editarCarrier, 
    }

    return publicAPI;

    function _agregarCarrier(pCarrierNuevo) {

      let listaCarrier = _retornarCarrierAct();
      let validarCodigo = true;
      let tamanno = listaCarrier.length;
      for (let i = 0; i < tamanno; i++) {
        if (pCarrierNuevo.getCodigo() == listaCarrier[i].getCodigo()) {
          validarCodigo = false;
        }
      }

      if (validarCodigo == true) {
         dataStorageFactory.setCarrierData(pCarrierNuevo);

      }
      return validarCodigo;
    }// fin función agregar

    function _retornarCarrierAct() {

      let listaCarrierDB = dataStorageFactory.getCarrierData(),
        carrierTemp = [];

      if (listaCarrierDB == null) {

        return carrierTemp;
      } else {
        listaCarrierDB.forEach(obj => {

          let objCarrierNuevo = new Carriers(obj.codigoCarrier, obj.nombreCarrier, obj.estadoCarrier);

          carrierTemp.push(objCarrierNuevo);
        });
      }

      return carrierTemp;
    }// fin función retornar



    function _editarCarrier(pcarrierEditado) {
      let modificacionExitosa = false;

      modificacionExitosa = dataStorageFactory.updateCarrier(pcarrierEditado);

      return modificacionExitosa;
    }



    function _retornarCarrierAct() {
        let carrierDB = dataStorageFactory.getCarrierData(),
        carrierAct = [],
        carrierActLS = [];

      if (carrierDB == null) {
        return carrierActLS;
      } else {
        for (let i = 0; i < carrierDB.length; i++) {
          if (carrierDB[i].estadoCarrier == true) {
            carrierAct.push(carrierDB[i]);
          }
        }
        carrierAct.forEach(objTemp => {
          let objCarrierAct = new Carriers(objTemp.codigoCarrier, objTemp.nombreCarrier, objTemp.estadoCarrier);

          carrierActLS.push(objCarrierAct);
        });
        return carrierAct;
      }
    }

    function _retornarCarrierDesact() {
        let carrierDB = dataStorageFactory.getCarrierData(),
        carrierDesact = [],
        carrierDesactLS = [];


      if (carrierDB == null) {
        return carrierDesactLS;
      } else {
        for (let i = 0; i < carrierDB.length; i++) {
          if (carrierDB[i].estadoCarrier == false) {
            carrierDesact.push(carrierDB[i]);
          }
        }

        carrierDesact.forEach(objTemp => {
          let objCarrierDesact = new Carriers(objTemp.codigoCarrier, objTemp.nombreCarrier, objTemp.estadoCarrier);

          carrierDesactLS.push(objCarrierDesact);
        });
        return carrierDesactLS
      }
    }
  }// fin servicio
})();