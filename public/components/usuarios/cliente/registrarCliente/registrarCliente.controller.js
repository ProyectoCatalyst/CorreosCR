(() => {
  'use strict';
  angular
    .module('correosCR')
    .controller('controladorRegistrarCliente', controladorRegistrarCliente);

  controladorRegistrarCliente.$inject = ['$http', '$stateParams', '$state', 'servicioUsuarios', 'imageUploadService', 'Upload', 'NgMap'];

  function controladorRegistrarCliente($http, $stateParams, $state, servicioUsuarios, imageUploadService, Upload, NgMap) {

    const vm = this;


    NgMap.getMap("map").then(function (map) {
      vm.map = map;
    });

    vm.callbackFunc = function (param) {
      vm.latitude = vm.map.getCenter().lat();
      vm.longitude = vm.map.getCenter().lng();
    };

    // Funcion que optiene las provincias
    vm.provincias = $http({
      method: 'GET',
      url: './sources/data/provincias.json'
    }).then((success) => {
      vm.provincias = success.data;
    }, (error) => {
    });

    // Funcion que rellena los los cantones
    vm.rellenarCantones = (pidProvincia) => {
      vm.cantones = $http({
        method: 'GET',
        url: './sources/data/cantones.json'
      }).then((success) => {
        let cantones = [];
        for (let i = 0; i < success.data.length; i++) {
          if (pidProvincia == success.data[i].idProvincia) {
            cantones.push(success.data[i]);
          }
        }
        vm.cantones = cantones;
      }, (error) => {
      });
    }

    vm.rellenarDistrito = (pidCanton) => {
      vm.distritos = $http({
        method: 'GET',
        url: './sources/data/distritos.json'
      }).then((success) => {
        let distritos = [];
        for (let i = 0; i < success.data.length; i++) {
          if (pidCanton == success.data[i].idCanton) {
            distritos.push(success.data[i]);
          }
        }
        vm.distritos = distritos;
      }, (error) => {
      });
    }

    vm.clienteNuevo = {};

    vm.cloudObj = imageUploadService.getConfiguration();

    vm.preRegistrarCliente = (pclienteNuevo) => {

      pclienteNuevo.latitud = vm.latitude;
      pclienteNuevo.longitud = vm.longitude;

      vm.cloudObj.data.file = pclienteNuevo.photo[0];
      Upload.upload(vm.cloudObj).success((data) => {
        vm.registrarCliente(pclienteNuevo, data.url);
      });
    }

    vm.registrarCliente = (pclienteNuevo, urlImagen) => {

      let rol = 5;
      let estado = true;

      let chars = "abcdefghijklmnopqrstuvwxyz!@#$%^&*-+<>ABCDEFGHIJKLMNOP1234567890";
      let contrasenna = "";
      for (let i = 0; i < 10; i++) {
        let x = Math.floor(Math.random() * chars.length);
        contrasenna += chars.charAt(x);
      }

      let objNuevoCliente = new Cliente(pclienteNuevo.nombre, pclienteNuevo.segundoNombre, pclienteNuevo.primerApellido, pclienteNuevo.segundoApellido, urlImagen, pclienteNuevo.cedula, pclienteNuevo.fecha, pclienteNuevo.sexo, pclienteNuevo.provincia.name, pclienteNuevo.canton.name, pclienteNuevo.distrito.name, pclienteNuevo.direccion, pclienteNuevo.correo, contrasenna, rol, estado, pclienteNuevo.telefono, pclienteNuevo.latitud, pclienteNuevo.longitud);

      console.log(objNuevoCliente);

      let registro = servicioUsuarios.agregarUsuario(objNuevoCliente);

      if (registro == true) {
        swal({
          title: "Registro exitoso",
          text: "Cliente registrado correctamente, se ha enviado un correo electrónico con una contraseña provisional",
          icon: "success",
          button: "Aceptar"
        });
        // vm.clienteNuevo = null;
        // $state.go('paginaInicio');
      } else {
        swal({
          title: "Ha ocurrido un Error",
          text: "No sea tonto, el cliente ya se encuentra registrado",
          icon: "error",
          button: "Aceptar"
        });
      }
    }

  }
})();