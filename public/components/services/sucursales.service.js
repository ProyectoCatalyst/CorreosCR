(() => {
  'use strict';
  angular
    .module('correosCR')
    .service('servicioSucursales', servicioSucursales);

  servicioSucursales.$inject = ['$q', '$log', '$http','dataStorageFactory'];

  function servicioSucursales($q, $log, $http, dataStorageFactory) {

    let publicAPI = {
      agregarSucursal: _agregarSucursal,
      retornarSucursal: _retornarSucursal,
      editarSucursal: _editarSucursal,
      retornarSucursalesDesact: _retornarSucursalesDesact,
      retornarSucursalesAct: _retornarSucursalesAct,
      retornarNombreSucursalesLS: _retornarNombreSucursalesLS
    }

    return publicAPI;

    function _agregarSucursal(psucursalNueva) {

      let listaSucursales = _retornarSucursal();
      let validarCodigo = true;
      let tamanno = listaSucursales.length;
      for (let i = 0; i < tamanno; i++) {
        if (psucursalNueva.codigoSucursal == listaSucursales[i].getCodigoSucursal()) {
          validarCodigo = false;
        }
      }

      if (validarCodigo == true) {
        dataStorageFactory.setSucursalesData(psucursalNueva);
        
      }
      return validarCodigo;
    }// fin función agregarSucursal

    function _retornarSucursal() {

      let listaSucursalesDB = dataStorageFactory.getSucursalesData(),
        sucursalesTemp = [];

      if (listaSucursalesDB == null) {

        return sucursalesTemp;
      } else {
        listaSucursalesDB.forEach(obj => {

          let objSucursalesAct = new Sucursal(obj.codigoSucursal, 
            obj.nombreSucursal, obj.provincia, obj.canton, obj.distrito, 
            obj.estadoSucursal);

          sucursalesTemp.push(objSucursalesAct);
        });
      }

      return sucursalesTemp;
    }// fin función retornarSucursal


    function _editarSucursal(pcarrierEditado) {
      let modificacionExitosa = false;

      modificacionExitosa = dataStorageFactory.updateSucursal(pcarrierEditado);

      return modificacionExitosa;

    }// fin función actualizarSucursal

    function _retornarSucursalesAct() {
      let sucursalesDB = dataStorageFactory.getSucursalesData(),
        sucursalesAct = [],
        sucursalesActLS = [];

      if (sucursalesDB == null) {
        return sucursalesActLS;
      } else {
        for (let i = 0; i < sucursalesDB.length; i++) {
          if (sucursalesDB[i].estadoSucursal == true) {
            sucursalesAct.push(sucursalesDB[i]);
          }
        }
        sucursalesAct.forEach(objTemp => {
          let objSucursalesAct = new Sucursal(objTemp.codigoSucursal, objTemp.nombreSucursal, objTemp.provincia, objTemp.canton, objTemp.distrito, objTemp.estadoSucursal);

          sucursalesActLS.push(objSucursalesAct);
        });
        return sucursalesActLS;
      }
    }

    function _retornarSucursalesDesact() {
      let sucursalesDB = dataStorageFActory.getSucursalesData(),
        sucursalesDesact = [],
        sucursalesDesactLS = [];

      if (sucursalesLS == null) {
        return sucursalesDesactLS;
      } else {
        for (let i = 0; i < sucursalesLS.length; i++) {
          if (sucursalesLS[i].estadoSucursal == false) {
            sucursalesDesact.push(sucursalesLS[i]);
          }
        }

        sucursalesDesact.forEach(objTemp => {
          let objSucursalesDesact = new Sucursal(objTemp.codigoSucursal, objTemp.nombreSucursal, objTemp.provincia, objTemp.canton, objTemp.distrito, objTemp.estadoSucursal);

          sucursalesDesactLS.push(objSucursalesDesact);
        });
        return sucursalesDesactLS
      }
    }

    function _agregarSucursalDesact(psucursalesLS) {
      localStorage.setItem('listaSucursales', JSON.stringify(psucursalesLS));
    }


    function _retornarNombreSucursalesLS() {
      let listaSucursalesActivas = _retornarSucursalesAct(),
          datosTodasSucursales = [];

      listaSucursalesActivas.forEach(objSucursalTemp => {
        let datos = new Sucursal (objSucursalTemp.codigoSucursal, objSucursalTemp.nombreSucursal);

        datosTodasSucursales.push(datos)
      })
      return datosTodasSucursales;
    }// fin _retornarNombreSucursalesLS

  }// fin servicioSucursales
})();