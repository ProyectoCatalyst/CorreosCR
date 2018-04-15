(() => {
    'use strict';
    angular
      .module('correosCR')
      .service('servicioPaquetes', servicioPaquetes);
  
    servicioPaquetes.$inject = ['$q', '$log', '$http', 'servicioUsuarios', 'localStorageFactory'];
    function servicioPaquetes($q, $log, $http, servicioUsuarios, localStorageFactory) {
  
        const listaPaquetesPrealertados = 'listaPaquetesPrealertadosLS'; // este es el key

      let publicAPI = {
        getAuthUser: _getAuthUser,
        prealertarPaquete: _prealertarPaquete,
        retornarPaquetesPrealertados: _retornarPaquetesPrealertados,
        listarPaquetesPrealertados: _listarPaquetesPrealertados,
        retornarPaquetesPorRepartidor: _retornarPaquetesPorRepartidor,
        retornarPaquetesPorCliente: _retornarPaquetesPorCliente,
        numeroTracking: _numeroTracking,
        encontrarEstadoActivo: _encontrarEstadoActivo,
        modificarEstado: _modificarEstado,
        costoPaquete: _costoPaquete
      }
      return publicAPI;
  
      function _getAuthUser() {
        let sessionActiva = localStorageFactory.getSession(),
          usuarioActivo;
  
        if (!sessionActiva) {
          usuarioActivo = undefined;
        } else {
          usuarioActivo = obtenerDatosUsuarioActivo(sessionActiva);
        }
  
        return usuarioActivo;
      };
  
      function obtenerDatosUsuarioActivo(pcorreo) {
        let listaUsuarios = servicioUsuarios.obtenerlistadeusuarios(),
          datosUsuario;
  
        for (let i = 0; i < listaUsuarios.length; i++) {
          if (listaUsuarios[i].getCorreo() == pcorreo) {
            datosUsuario = listaUsuarios[i];
          }
        };
  
        return datosUsuario;
      }
  
      function _prealertarPaquete(pnuevoPaquetePrealertado) {
  
        let listaPaquetesPrealertados = _retornarPaquetesPrealertados();
        let tamanno = listaPaquetesPrealertados.length;
        let validarCodigo = true;
        for (let i = 0; i < tamanno; i++) {
          if (pnuevoPaquetePrealertado.capturarTrackingPaquete() == listaPaquetesPrealertados[i].capturarTrackingPaquete()) {
            validarCodigo == false;
          }
        }
        if (validarCodigo == true) {
          listaPaquetesPrealertados.push(pnuevoPaquetePrealertado);
          localStorage.setItem('listaPaquetesPrealertadosLS', JSON.stringify(listaPaquetesPrealertados));
        }
        return validarCodigo;
      }//fin prealertar paquete
  
      function _listarPaquetesPrealertados(pusuarioRol, psucursalID) {
        let listaPaquetesPrealertados = [];
        let listaPaquetesPrealertadosLocal = JSON.parse(localStorage.getItem("listaPaquetesPrealertadosLS"));
  
        if (listaPaquetesPrealertadosLocal == null) {
          listaPaquetesPrealertados = [];
        } else {
          listaPaquetesPrealertadosLocal.forEach(obj => {
            let objPaquetesPrealertados = new Paquete(obj.trackingPaquete, obj.usuarioPaquete, obj.tipoPaquete, obj.pesoPaquete, obj.precioPaquete, obj.costoTotalPaquete, obj.estadoPaquete, obj.idSucursalPaquete, obj.idRepartidorPaquete);
            switch (pusuarioRol) {
              case 1:
                listaPaquetesPrealertados.push(objPaquetesPrealertados);
                break;
              case 2:
                if (objPaquetesPrealertados.estadoPaquete == "Prealertado") {
                  listaPaquetesPrealertados.push(objPaquetesPrealertados);
                }
                break;
              case 3:
                if (objPaquetesPrealertados.estadoPaquete == "Saliendo de aduana" && objPaquetesPrealertados.idSucursalPaquete == psucursalID) {
                  listaPaquetesPrealertados.push(objPaquetesPrealertados);
                }
                break;
  
  
              default:
  
                break;
            }
          });
        }
        return listaPaquetesPrealertados;
      }//fin retornar PaquetesPrealertados
  
      function _retornarPaquetesPorRepartidor(pusuarioCedula) {
        let listaPaquetesPorRepartidor = [];
        let listaPaquetesPrealertadosLocal = JSON.parse(localStorage.getItem("listaPaquetesPrealertadosLS"));
  
        if (listaPaquetesPrealertadosLocal == null) {
          listaPaquetesPorRepartidor = [];
        } else {
  
          listaPaquetesPrealertadosLocal.forEach(obj => {
            let objPaquetesPrealertados = new Paquete(obj.trackingPaquete, obj.usuarioPaquete, obj.tipoPaquete, obj.pesoPaquete, obj.precioPaquete, obj.costoTotalPaquete, obj.estadoPaquete, obj.idSucursalPaquete, obj.idRepartidorPaquete);
            if (objPaquetesPrealertados.estadoPaquete == "Entregado a repartidor" && objPaquetesPrealertados.idRepartidorPaquete == pusuarioCedula) {
              listaPaquetesPorRepartidor.push(objPaquetesPrealertados);
            }
          });
        }
        return listaPaquetesPorRepartidor;
      }//fin retornar _retornarPaquetesPorRepartidor
  
  
      //--sesion activa cliente lista paquetes de su perfil--//
      function _retornarPaquetesPorCliente(pusuarioCedula) {
        let listaPaquetesPorCliente = [];
        let listaPaquetesPrealertadosLocal = JSON.parse(localStorage.getItem("listaPaquetesPrealertadosLS"));
  
        if (listaPaquetesPrealertadosLocal == null) {
          listaPaquetesPorCliente = [];
        } else {
  
          listaPaquetesPrealertadosLocal.forEach(obj => {
            let objPaquetesPrealertados = new Paquete(obj.trackingPaquete, obj.usuarioPaquete, obj.tipoPaquete, obj.pesoPaquete, obj.precioPaquete, obj.costoTotalPaquete, obj.estadoPaquete, obj.idSucursalPaquete, obj.idRepartidorPaquete);
            if (objPaquetesPrealertados.usuarioPaquete == pusuarioCedula) {
              listaPaquetesPorCliente.push(objPaquetesPrealertados);
            }
          });
        }
        return listaPaquetesPorCliente;
      }//fin retornar _retornarPaquetesPorCliente
  
  
      //prueba devolver todos los paquetes
      function _retornarPaquetesPrealertados() {
        let listaPaquetesPrealertados = [];
        let listaPaquetesPrealertadosLocal = JSON.parse(localStorage.getItem("listaPaquetesPrealertadosLS"));
  
        if (listaPaquetesPrealertadosLocal == null) {
          listaPaquetesPrealertados = [];
        } else {
          listaPaquetesPrealertadosLocal.forEach(obj => {
            let objPaquetesPrealertados = new Paquete(obj.trackingPaquete, obj.usuarioPaquete, obj.tipoPaquete, obj.pesoPaquete, obj.precioPaquete, obj.costoTotalPaquete, obj.estadoPaquete, obj.idSucursalPaquete, obj.idRepartidorPaquete);
  
            listaPaquetesPrealertados.push(objPaquetesPrealertados)
          });
        }
        return listaPaquetesPrealertados;
      }//fin retornar PaquetesPrealertados
  
      function _numeroTracking() {
        let numeroTracking = 0;
        numeroTracking = Math.round((Math.random() * 93979293));
        return numeroTracking;
      }
  
      function _costoPaquete(ppesoPaquete, pprecioPaquete, pimpuestoCalcular) {
        let impuesto = 0, subtotal = 0, montoConImpuesto = 0, costoTotal = 0;
        switch (pimpuestoCalcular) {
          case "0":
            impuesto = 49.27;
            break;
          case "1":
            impuesto = 29.95;
            break;
          case "2":
            impuesto = 14.13;
            break;
          case "3":
            impuesto = 29.95;
            break;
          case "4":
            impuesto = 19.78;
            break;
          case "5":
            impuesto = 42.78;
            break;
          case "6":
            impuesto = 29.95;
            break;
          case "7":
            impuesto = 29.95;
            break;
          case "8":
            impuesto = 29.95;
            break;
          case "9":
            impuesto = 14.13;
            break;
          case "10":
            impuesto = 14.13;
            break;
          case "11":
            impuesto = 29.95;
            break;
          case "12":
            impuesto = 14.13;
            break;
          default:
            impuesto = 0;
            break;
        }
        subtotal = Math.round(ppesoPaquete + pprecioPaquete);
        montoConImpuesto = Math.round((subtotal * impuesto) / 100)
        costoTotal = Math.round(subtotal + montoConImpuesto);
        return costoTotal;
      }
  
      function _encontrarEstadoActivo(pobjPaqueteTemp) {
        let paqueteEncontrado = [];
        let listaPaquetesPrealertados = _retornarPaquetesPrealertados();
        let tamanno = listaPaquetesPrealertados.length;
        for (let i = 0; i < tamanno; i++) {
          if (pobjPaqueteTemp.estadoPaquete == listaPaquetesPrealertados[i].capturarTrackingPaquete()) {
            paqueteEncontrado = listaPaquetesPrealertados[i].capturarEstadoPaquete()
          }
        }
        return paqueteEncontrado;
      }
  
      function _modificarEstado(PaquetesPrealertadosMod) { // recibo el nueva informacion
        let listaPaquetes = _retornarPaquetesPrealertados(); // recibo todos los paquetes del sistema
  
        for (let i = 0; i < listaPaquetes.length; i++) {
          if (PaquetesPrealertadosMod.trackingPaquete == listaPaquetes[i].capturarTrackingPaquete()) {
            listaPaquetes[i] = PaquetesPrealertadosMod;
          }
        }
        actualizarListaPaquetes(listaPaquetes);
      }// fin función actualizarEstado
  
  
      function actualizarListaPaquetes(listaPaquetes) {
        localStorage.setItem('listaPaquetesPrealertadosLS', JSON.stringify(listaPaquetes));
      }
    }
  })();