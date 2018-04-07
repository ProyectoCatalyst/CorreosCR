(() => {
  'use strict';
  angular
    .module('correosCR')
    .service('servicioUsuarios', servicioUsuarios);

  servicioUsuarios.$inject = ['$q', '$log', '$http', 'localStorageFactory'];

  function servicioUsuarios($q, $log, $http, localStorageFactory) {

    const listaUsuarios = 'usuariosLS'; // este es el key

    let publicAPI = {
      agregarUsuario: _agregarUsuario,
      obtenerlistadeusuarios: _obtenerlistadeusuarios,
      obtenerlistadeFiltrada: _obtenerListaFiltrada,
      retornarCorreosUsuarios:  _retornarCorreosUsuarios,
      actualizarUsuario: _actualizarUsuario
    };
    return publicAPI; 


    function _agregarUsuario(pNuevoCliente) {
      let listadeusuarios = _obtenerlistadeusuarios(),
          registrovalido,
          usuariorepetido = false;

      for(let i=0; i<listadeusuarios.length; i++){
        if(listadeusuarios[i].getCorreo() == pNuevoCliente.getCorreo()){
          usuariorepetido = true;
        }  
      }

      if (usuariorepetido == true){
        registrovalido = false;
      } else{
        listadeusuarios.push(pNuevoCliente);
        registrovalido = localStorageFactory.setItem(listaUsuarios, listadeusuarios);
      }

      return registrovalido;
    };

    function _obtenerlistadeusuarios() {
      let listadeusuarioslocal = localStorageFactory.getItem(listaUsuarios),
          listadeusuarios = [];
      
      if (listadeusuarioslocal == []){
        listadeusuarios = []
      }else{
        listadeusuarioslocal.forEach(obj => {
          let tempfecha = new Date(obj.fecha);

          switch(obj.rol){
            case 2:
              let tempEncargadoAduana = new EncargadoAduanas(obj.primerNombre, obj.segundoNombre, obj.primerApellido, obj.segundoApellido, obj.cedula, tempfecha, obj.genero, obj.ubicacion, obj.provincia, obj.canton, obj.distrito, obj.direccion, obj.correo, obj.contrasenna, obj.rol, obj.estado);

              listadeusuarios.push(tempEncargadoAduana);
            break;

            case 3:
              let tempEncargadoSucursal = new EncargadoSucursales(obj.primerNombre, obj.segundoNombre, obj.primerApellido, obj.segundoApellido, obj.cedula, tempfecha, obj.genero, obj.ubicacion, obj.provincia, obj.canton, obj.distrito, obj.direccion, obj.correo, obj.contrasenna, obj.rol, obj.estado);

              listadeusuarios.push(tempEncargadoSucursal);
            break;

            case 4:

                if(obj.estado == true){
                    let repartidoresTemp = new Repartidor(obj.primerNombre, obj.segundoNombre, obj.primerApellido, obj.segundoApellido, obj.cedula, obj.fecha, obj.genero, obj.ubicacion, obj.provincia, obj.canton, obj.distrito, obj.direccion,obj.correo, obj.contrasenna, obj.rol, obj.telefono, obj.telefonoAdicional, obj.estado, obj.razonDesact, obj.sucursal);
                
                    listadeusuarios.push(repartidoresTemp);
                }

            break;

            case 5:
              let tempCliente = new Cliente(obj.primerNombre, obj.segundoNombre, obj.primerApellido, obj.segundoApellido, obj.cedula, tempfecha, obj.genero, obj.ubicacion, obj.provincia, obj.canton, obj.distrito, obj.direccion, obj.correo, obj.contrasenna, obj.rol, obj.estado, obj.telefono);

              listadeusuarios.push(tempCliente);
            break;

            default:

              let tempUsuario = new Usuario(obj.primerNombre, obj.segundoNombre, obj.primerApellido, obj.segundoApellido, obj.cedula, tempfecha, obj.genero, obj.ubicacion, obj.provincia, obj.canton, obj.distrito, obj.direccion, obj.correo, obj.contrasenna, obj.rol, obj.estado);

              listadeusuarios.push(tempUsuario);
            break;
          }
        });
      }

      return listadeusuarios;
    }

    function _actualizarUsuario (pusuarioModificado){
      let listadeusuarios = _obtenerlistadeusuarios();

      for (let i = 0; i < listadeusuarios.length; i++){
        if(listadeusuarios[i].getCorreo() == pusuarioModificado.getCorreo()){
          listadeusuarios[i] = pusuarioModificado;
        }
      }

      let modificacionExitosa = localStorageFactory.setItem(listaUsuarios, listadeusuarios);
      
      return modificacionExitosa;
    }

    function _obtenerListaFiltrada(pnumrol){
      let listadeusuarios = _obtenerlistadeusuarios(),
          listaFiltrada = [];

      for(let i = 0; i < listadeusuarios.length; i++){
        if(listadeusuarios[i].getRol() == pnumrol){
          listaFiltrada.push(listadeusuarios[i]);
        }
      }

      return listaFiltrada;
    }

    function _retornarCorreosUsuarios(){
        let usuariosLS = localStorageFactory.getItem(listaUsuarios),
            cedulasSistema = [];

        for(let i=0; i<usuariosLS.length; i++){
            cedulasSistema.push( usuariosLS[i].correo );
        }

        return cedulasSistema
    }
    
  };

})();