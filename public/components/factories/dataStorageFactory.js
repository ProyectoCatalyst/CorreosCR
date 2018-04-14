(() => {
    'use strict'

    angular
    .module('correosCR')
    .service('dataStorageFactoy', dataStorageFactoy);

    function dataStorageFactoy($q, $log, $http){
        const localAPI = {
            registrarConvenio: _registrarConvenio,
            retornarConvenios: _retornarConvenios,
            actualizarConvenios: _actualizarConvenios
        }
        return localAPI

        function  _registrarConvenio(data){
            let respuesta;

            let peticion = $.ajax({
                url: 'http://localhost:4000/api/save_agreement',
                type: 'post',
                contentType: 'application/x-www-form-urlencoded; charset=utf-8',
                dataType: 'json',
                async: false,
                data: {
                    'codigoConvenio': data.codigoConvenio,
                    'nombreConvenio': data.nombreConvenio,
                    'descripcionConvenio': data.descripcionConvenio,
                    'institucionConvenio': data.institucionConvenio,
                    'costoConvenio': data.costoConvenio
                }
            });
            peticion.done((datos) => {
                respuesta = datos.msj;
                console.log('Petición realizada con éxito')
            });
            peticion.fail((error) => {
                respuesta = error;
                console.log('Error en la petición')
            });
            return respuesta;
        }

        function _retornarConvenios(){
            let conveniosLS = [];

            let peticion = $.ajax({
                url: 'http://localhost:4000/api/get_all_agreement_data',
                type: 'get',
                contentType: 'application/x-www-form-urlencoded; charset=utf-8',
                dataType: 'json',
                async: false,
                data: {}
            });

            peticion.done((convenios) => {
                conveniosLS = convenios
            });
            peticion.fail(() => {
                conveniosLS = []
                console.log('error')
            });
            return conveniosLS
        }

        function _actualizarConvenios(data){
            let respuesta;

            let peticion = $.ajax({
                url: 'http://localhost:4000/api/update_agreement',
                type: 'put',
                contentType: 'application/x-www-form-urlencoded; charset=utf-8',
                dataType: 'json',
                async: false,
                data: {
                    'codigoConvenio': data.codigoConvenio,
                    'nombreConvenio': data.nombreConvenio,
                    'descripcionConvenio': data.descripcionConvenio,
                    'institucionConvenio': data.institucionConvenio,
                    'costoConvenio': data.costoConvenio
                }
            });
            peticion.done((datos) => {
                respuesta = datos.msj;
                console.log('Petición realizada con éxito')
            });
            peticion.fail((error) => {
                respuesta = error;
                console.log('Error en la petición')
            });
            return respuesta;
        }
    }
 
})();