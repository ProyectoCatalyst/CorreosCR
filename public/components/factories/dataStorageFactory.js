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
      addCreditCard: _addCreditCard,
      sendMail: _sendMail,

      getCreditCardData: _getCreditCardData,
      setCreditCardData: _setCreditCardData,
      updateCreditCard: _updateCreditCard,
      deleteCreditCard: _deleteCreditCard,
      setData: _setData,
      removeData: _removeData,
      getData: _getData,

      getCarrierData: _getCarrierData,
      setCarrierData: _setCarrierData,
      updateCarrierData: _updateCarrierData,

      getSucursalData: _getSucursalData,
      setSucursalData: _setSucursalData,
      updateSucursalData: _updateSucursalData,

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
        // console.log('Datos que vienen desde la base de datos')
        // console.log(usuarios);
        listaUsuarios = usuarios;
      });
      peticion.fail(() => {
        listaUsuarios = [];
        console.log('Ocurrió un error');
      });

      return listaUsuarios;
    }

    /**
     * Toma el objejeto y o envía al backend por una petición de $ajax
     * @param {objeto usuario} data 
     */
    function _setUserData(data) {
      let response;

      let peticion = $.ajax({
        url: 'http://localhost:4000/api/save_user',
        type: 'post',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {
          //Inicio del esquema basico
          'primerNombre': data.primerNombre,
          'segundoNombre': data.segundoNombre,
          'primerApellido': data.primerApellido,
          'segundoApellido': data.segundoApellido,
          'foto' : data.foto,
          'cedula': data.cedula,
          'fecha': data.fecha,
          'genero': data.genero,
          'provincia': data.provincia,
          'canton': data.canton,
          'distrito': data.distrito,
          'direccion': data.direccion,
          'correo': data.correo,
          'contrasenna': data.contrasenna,
          'rol': data.rol,
          'estado': data.estado,
          // Final del esquema basico
          // Repartidor
          'paqueteAsignado': data.paqueteAsignado,
          'licencia': data.licencia,
          'telefono': data.telefono,
          'telefonoAdicional': data.telefonoAdicional,
          'razonDesact': data.razonDesact,
          'sucursal': data.sucursal,
          // Cliente
          'tarjeta': data.tarjeta,
          'paquetes': data.paquetes,
          'latitud' : data.latitud,
          'longitud' : data.longitud,
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

    function _addCreditCard(pCorreoTarjeta) {
      let response;
      let peticion = $.ajax({
        url: 'http://localhost:4000/api/add_creditCard',
        type: 'put',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {
          correo: pCorreoTarjeta.correo,
          numeroTarjeta: pCorreoTarjeta.numeroTarjeta,
        }
      });

      peticion.done((datos) => {
        response = datos.success;
        console.log('Petición realizada con éxito');
      });
      peticion.fail((error) => {
        response = error;
        console.log('Ocurrió un error con la tarjeta');
      });

      return response;
    }

    /**
     * Función que recibe el correo electrónico y el mensaje a enviar.
     * @param {Correo y contrasenna, informacion que se va a enviar por mail} data 
     */
    function _sendMail (data){
      let response;

      let peticion = $.ajax({
        url: 'http://localhost:4000/api/mail',
        type: 'post',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {
         'to': data.to,
         'subject': data.subject,
         'text': data.text
        }
      });

      peticion.done((datos) => {
        console.log(datos);
      });
      peticion.fail((error) => {
        response = error;
        console.log(error);
      });
    }

    function _getCreditCardData() {
      let listaTarjetas = [];

      let peticion = $.ajax({
        url: 'http://localhost:4000/api/get_all_creditCard',
        type: 'get',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {

        }
      });

      peticion.done((datos) => {
        listaTarjetas = datos;
        console.log('Petición realizada con éxito');
      });
      peticion.fail(() => {
        listaTarjetas = [];
        console.log('Ocurrió un error');
      });

      return listaTarjetas;
    }

    function _setCreditCardData(pnuevatarjeta) {
      let response;

      let peticion = $.ajax({
        url: 'http://localhost:4000/api/save_creditCard',
        type: 'post',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {
          tipoTarjeta    : pnuevatarjeta.tipoTarjeta,
          nombreTarjeta  : pnuevatarjeta.nombreTarjeta,
          numeroTarjeta  : pnuevatarjeta.numeroTarjeta,
          cvvTarjeta     : pnuevatarjeta.cvvTarjeta,
          mesTarjeta     : pnuevatarjeta.mesTarjeta,
          annoTarjeta    : pnuevatarjeta.annoTarjeta,
          idCliente      : pnuevatarjeta.idCliente
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

    function _updateCreditCard(ptarjetaActualizada) {
      let response;

      let peticion = $.ajax({
        url: 'http://localhost:4000/api/update_creditCard',
        type: 'put',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {
          tipoTarjeta    : ptarjetaActualizada.tipoTarjeta,
          nombreTarjeta  : ptarjetaActualizada.nombreTarjeta,
          numeroTarjeta  : ptarjetaActualizada.numeroTarjeta,
          cvvTarjeta     : ptarjetaActualizada.cvvTarjeta,
          mesTarjeta     : ptarjetaActualizada.mesTarjeta,
          annoTarjeta    : ptarjetaActualizada.annoTarjeta,
          idCliente      : ptarjetaActualizada.idCliente
        }
      });

      peticion.done((datos) => {
        response = datos.success;
        // console.log('Petición realizada con éxito');
      });
      peticion.fail((error) => {
        response = error;
        // console.log('Ocurrió un error');
      });

      return response;
    }

    function _deleteCreditCard(pNumeroTarjeta) {
      let response;

      let peticion = $.ajax({
        url: 'http://localhost:4000/api/delete_creditCard',
        type: 'delete',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {
          numeroTarjeta  : pNumeroTarjeta
        }
      });

      peticion.done((datos) => {
        response = datos.success;
        // console.log('Petición realizada con éxito');
      });
      peticion.fail((error) => {
        response = error;
        // console.log('Ocurrió un error');
      });

      return response;
    }

    function _getCarrierData() {
      let listaCarrier = [];

      let peticion = $.ajax({
        url: 'http://localhost:4000/api/get_all_carrier',
        type: 'get',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {}
      });

      peticion.done((carrier) => {
        console.log('Datos que vienen desde la base de datos')
        console.log(datos);
        listaCarrier = datos;
      });
      peticion.fail(() => {
        listaCarrier = [];
        console.log('Ocurrió un error');
      });

      return listaCarrier;
    }

    function _setCarrierData(pnuevoCarrier) {
      let response;

      let peticion = $.ajax({
        url: 'http://localhost:4000/api/save_carrier',
        type: 'post',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {
          'codigoCarrier'  : pnuevoCarrier.codigoCarrier,
          'nombreCarrier'  : pnuevoCarrier.nombreCarrier,
          'estadoCarrier'  : pnuevoCarrier.estadoCarrier
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

    function _updateCarrierData(data){
      let respuesta;

      let peticion = $.ajax({
          url: 'http://localhost:4000/api/update_carrier',
          type: 'put',
          contentType: 'application/x-www-form-urlencoded; charset=utf-8',
          dataType: 'json',
          async: false,
          data: {
              'codigoCarrier': data.codigoCarrier,
              'nombreCarrier': data.nombreCarrier,
              'estadoCarrier': data.estadoCarrier
          }
      });
      peticion.done((datos) => {
          respuesta = datos.msg;
          console.log('Petición realizada con éxito')
      });
      peticion.fail((error) => {
          respuesta = error;
          console.log('Error en la petición')
      });
      return respuesta;
  }



    /**
   * Función que almacena las datos dentro del session Storage
   */
  function _setData(value) {
    let response = true;
    sessionStorage.setItem('userData', JSON.stringify(value));
    return response;
  }

  /**
   * Función que elimina los datos de la sesión activa
   */
  function _removeData() {
    let response = true;
    sessionStorage.removeItem('userData');
    return response;
  };

  /**
   * Función que retorna los datos almacenados dentro del sessionStorage
   */
  function _getData() {
    let userData = JSON.parse(sessionStorage.getItem('userData'));
    return userData;
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