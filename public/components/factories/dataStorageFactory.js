(() => {
  'use strict';
  angular
    .module('correosCR')
    .factory('dataStorageFactory', dataStorageFactory);

  dataStorageFactory.$inject = ['$q', '$log', '$http'];

  function dataStorageFactory($q, $log, $http) {
    const dataAPI = {
      getUsersData: _getUsersData,
      setUserData: _setUserData,
      setSession: _setSession,
      closeSession: _closeSession,
      getSession: _getSession
    };
    return dataAPI;

    /**
    * Funcion que obtiene los datos de los usuarios del back end y los retorna
    */
    function _getUsersData() {
      let listaUsuarios = [];

      let peticion = $.ajax({
        url: 'http://localhost:4000/api/get_all_users',
        type: 'get',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {}
      });

      peticion.done((usuarios) => {
        console.log('Datos que vienen desde la base de datos')
        console.log(usuarios);
        listaUsuarios = usuarios;
      });
      peticion.fail(() => {
        listaUsuarios = [];
        console.log('Ocurrió un error');
      });

      return listaUsuarios;
    }

    function _setUserData(data) {
      let response;

      let peticion = $.ajax({
        url: 'http://localhost:4000/api/save_user',
        type: 'post',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {
          'primerNombre': data.nombre,
          'segundoNombre': data.segundoNombre,
          'primerApellido': data.primerApellido,
          'segundoApellido': data.segundoApellido,
          'cedula': data.cedula,
          'fecha': data.fecha,
          'genero': data.genero,
          'ubicacion': data.ubicacion,
          'provincia': data.provincia,
          'canton': data.canton,
          'distrito': data.distrito,
          'direccion': data.direccion,
          'correo': data.correo,
          'contrasenna': data.contrasenna,
          'rol': data.rol,
          'telefono': data.telefono,
          'tarjeta': data.tarjeta,
          'paqueteAsignado': data.paqueteAsignado,
          'licencia': data.licencia,
          'telefono': data.telefono,
          'tarjeta': data.tarjeta,
          'paqueteAsignado': data.paqueteAsignado,
          'licencia': data.licencia,
          'telefono': data.telefono,
          'telefonoAdicional': data.telefonoAdicional,
          'razonDesact': data.razonDesact,
          'sucursal': data.sucursal
        }
      });

      peticion.done((datos) => {
        response = datos.success;
        console.log('Petición realizada con éxito');
      });
      peticion.fail((error) => {
        response = error;
        console.log('Ocurrió un error');
      });

      return response;
    }

    /**
   * Función que almacena las credenciales dentro del session Storage
   * @param {Credenciales} value 
   */
    function _setSession(value) {
      let response = true;
      sessionStorage.setItem('session', JSON.stringify(value));
      return response;
    }

    /**
     * Función que elimina los datos de la sesión activa
     */
    function _closeSession() {
      let response = true;
      sessionStorage.removeItem('session');
      return response;
    };

    /**
     * Función que retorna los datos almacenados dentro del sessionStorage
     */
    function _getSession() {
      let sessionActive = JSON.parse(sessionStorage.getItem('session'));

      return sessionActive;
    }
  }
})();