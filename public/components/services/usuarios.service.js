(() => {
  'use strict';
  angular
    .module('correosCR')
    .service('servicioUsuarios', servicioUsuarios);

  servicioUsuarios.$inject = ['$q', '$log', '$http', 'dataStorageFactory', 'localStorageFactory'];

  function servicioUsuarios($q, $log, $http, dataStorageFactory, localStorageFactory) {

    const listaUsuarios = 'usuariosLS'; // este es el key

    let publicAPI = {
      agregarUsuario: _agregarUsuario,
      obtenerlistadeusuarios: _obtenerlistadeusuarios,
      obtenerlistadeFiltrada: _obtenerListaFiltrada,
      retornarCorreosUsuarios: _retornarCorreosUsuarios,
      actualizarUsuario: _actualizarUsuario
    };
    return publicAPI;

    
    /**
     * Función que se comunica con el dataStorage para guardar el cliente.
     * @param {Objeto Usuario de cualquier tipo que va a ser almacenado en el backend} pNuevoUsuario 
     */
    function _agregarUsuario(pNuevoUsuario) {
      let listadeusuarios = _obtenerlistadeusuarios(),
        registrovalido,
        usuariorepetido = false;

      for (let i = 0; i < listadeusuarios.length; i++) {
        if (listadeusuarios[i].getCorreo() == pNuevoUsuario.getCorreo()) {
          usuariorepetido = true;
        }
      }

      if (usuariorepetido == true) {
        registrovalido = false;
      } else {
        let objEmail = {
          to : pNuevoUsuario.getCorreo(),
          subject: 'Contraseña temporal de la aplicación de Correos de Costa Rica',
          text: pNuevoUsuario.getContrasenna()
        };
        dataStorageFactory.sendMail(objEmail);
        registrovalido = dataStorageFactory.setUserData(pNuevoUsuario);
      }

      return registrovalido;
    };
    
    /**
     * función que obtiene la lista de usuarios del backend
     */
    function _obtenerlistadeusuarios() {
      let listadeusuarioslocal = dataStorageFactory.getUsersData(),
        listadeusuarios = [];

      listadeusuarioslocal.forEach(obj => {
        let tempfecha = new Date(obj.fecha);

        switch (obj.rol) {
          case '2':
            let tempEncargadoAduana = new Encargado(obj.primerNombre, obj.segundoNombre, obj.primerApellido, obj.segundoApellido, obj.foto, obj.cedula, tempfecha, obj.genero, obj.provincia, obj.canton, obj.distrito, obj.direccion, obj.correo, obj.contrasenna, obj.rol, obj.estado, obj.telefono, obj.telefonoAdicional, obj.sucursal, obj.rolAduana);

            listadeusuarios.push(tempEncargadoAduana);
            break;

          case '3':
            let tempEncargadoSucursal = new Encargado(obj.primerNombre, obj.segundoNombre, obj.primerApellido, obj.segundoApellido, obj.foto, obj.cedula, tempfecha, obj.genero, obj.provincia, obj.canton, obj.distrito, obj.direccion, obj.correo, obj.contrasenna, obj.rol, obj.estado, obj.telefono, obj.telefonoAdicional, obj.sucursal, obj.rolAduana);

            listadeusuarios.push(tempEncargadoSucursal);
            break;

          case 4:

            if (obj.estado == true) {
              let repartidoresTemp = new Repartidor(obj.primerNombre, obj.segundoNombre, obj.primerApellido, obj.segundoApellido, obj.cedula, obj.fecha, obj.genero, obj.ubicacion, obj.provincia, obj.canton, obj.distrito, obj.direccion, obj.correo, obj.contrasenna, obj.rol, obj.telefono, obj.telefonoAdicional, obj.estado, obj.razonDesact, obj.sucursal);

              obj.licencia.forEach(objLicenciaTemp => {
                let objLicencia = new Licencia(objLicenciaTemp.codigo, objLicenciaTemp.fechaVencimiento, objLicenciaTemp.tipo, objLicenciaTemp.estado);

                repartidoresTemp.setLicencia(objLicencia);
              });

              listadeusuarios.push(repartidoresTemp);
            }

            break;

          case 5:
            let tempCliente = new Cliente(obj.primerNombre, obj.segundoNombre, obj.primerApellido, obj.segundoApellido, obj.foto, obj.cedula, tempfecha, obj.genero, obj.ubicacion, obj.provincia, obj.canton, obj.distrito, obj.direccion, obj.correo, obj.contrasenna, obj.rol, obj.estado, obj.telefono);

            listadeusuarios.push(tempCliente);
            break;

          default:

            let tempUsuario = new Usuario(obj.primerNombre, obj.segundoNombre, obj.primerApellido, obj.segundoApellido, obj.cedula, tempfecha, obj.genero, obj.ubicacion, obj.provincia, obj.canton, obj.distrito, obj.direccion, obj.correo, obj.contrasenna, obj.rol, obj.estado);

            listadeusuarios.push(tempUsuario);
            break;
        }
      });
      return listadeusuarios;
    }

    function _actualizarUsuario(pusuarioModificado) {
      let modificacionExitosa = dataStorageFactory.updateUserData(pusuarioModificado);
      return modificacionExitosa;
    }

    function _obtenerListaFiltrada(pnumrol) {
      let listadeusuarios = _obtenerlistadeusuarios(),
        listaFiltrada = [];

      for (let i = 0; i < listadeusuarios.length; i++) {
        if (listadeusuarios[i].getRol() == pnumrol) {
          listaFiltrada.push(listadeusuarios[i]);
        }
      }

      return listaFiltrada;
    }

    function _retornarCorreosUsuarios() {
      let usuariosLS = localStorageFactory.getItem(listaUsuarios),
        cedulasSistema = [];

      for (let i = 0; i < usuariosLS.length; i++) {
        cedulasSistema.push(usuariosLS[i].correo);
      }

      return cedulasSistema
    }

  };

})();