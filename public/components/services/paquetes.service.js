(() => {
  'use strict';
  angular
    .module('correosCR')
    .service('servicioPaquetes', servicioPaquetes);

  servicioPaquetes.$inject = ['$q', '$log', '$http', 'servicioInicioSesion', 'servicioUsuarios', 'dataStorageFactory', 'localStorageFactory'];
  function servicioPaquetes($q, $log, $http, servicioInicioSesion, servicioUsuarios, dataStorageFactory, localStorageFactory) {

    let publicAPI = {
      prealertarPaquete: _prealertarPaquete,
      retornarPaquetesPrealertados: _retornarPaquetesPrealertados,
      listarPaquetesPrealertados: _listarPaquetesPrealertados,
      retornarPaquetesPorRepartidor: _retornarPaquetesPorRepartidor,
      retornarPaquetesPorCliente: _retornarPaquetesPorCliente,
      numeroTracking: _numeroTracking,
      encontrarEstadoActivo: _encontrarEstadoActivo,
      modificarEstado: _modificarEstado,
      costoPaquete: _costoPaquete,
      buscarPaquete: _buscarPaquete,
      agregarDatosSession: _agregarDatosSession,
      consultarDatosSession: _consultarDatosSession,
      removerDatosSession: _removerDatosSession
    }
    return publicAPI;

    function _prealertarPaquete(pPaqueteNuevo) {

      let listaPaquetesPrealertados = _retornarPaquetesPrealertados(),
        registrovalido = true,
        paqueteRepetido = false;

      for (let i = 0; i < listaPaquetesPrealertados.length; i++) {

        if (listaPaquetesPrealertados[i].getTracking() == pPaqueteNuevo.trackingPaquete) {
          paqueteRepetido = true;
        }
      }

      if (paqueteRepetido == true) {
        registrovalido = false;
      } else {
        registrovalido = dataStorageFactory.setPackage(pPaqueteNuevo);
      }

      return registrovalido;
    }//fin prealertar paquete

    function _listarPaquetesPrealertados(pusuarioRol, psucursalID) {
      let listaPaquetesPrealertados = [];
      let listaPaquetesPrealertadosLocal = _retornarPaquetesPrealertados();

      if (listaPaquetesPrealertadosLocal == null) {
        listaPaquetesPrealertados = [];
      } else {
        listaPaquetesPrealertadosLocal.forEach(obj => {
          let objPaquetesPrealertados = new Paquete(obj.trackingPaquete, obj.tipoPaquete, obj.pesoPaquete,
            obj.precioPaquete, obj.costoEnvio, obj.costoTotalPaquete, obj.estadoPaquete, obj.idRepartidor,
            obj.idSucursal, obj.idCliente, obj.idMensajero);
          switch (pusuarioRol) {
            case "1":
              listaPaquetesPrealertados.push(objPaquetesPrealertados);
              break;
            case "2":
              if (objPaquetesPrealertados.estadoPaquete == "Prealertado") {
                listaPaquetesPrealertados.push(objPaquetesPrealertados);
              }
              break;
            case "3":
              if (objPaquetesPrealertados.estadoPaquete == "Saliendo de aduana") {
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

    function _retornarPaquetesPorRepartidor(pusuarioCorreo) {
      let listaPaquetesPorRepartidor = [];
      let listaPaquetesPrealertadosLocal = _retornarPaquetesPrealertados();

      if (listaPaquetesPrealertadosLocal == null) {
        listaPaquetesPorRepartidor = [];
      } else {

        listaPaquetesPrealertadosLocal.forEach(obj => {
          let objPaquetesPrealertados = new Paquete(obj.trackingPaquete, obj.tipoPaquete, obj.pesoPaquete,
            obj.precioPaquete, obj.costoEnvio, obj.costoTotalPaquete, obj.estadoPaquete, obj.idRepartidor,
            obj.idSucursal, obj.idCliente);
          if (objPaquetesPrealertados.estadoPaquete == "Entregado a repartidor") {
            listaPaquetesPorRepartidor.push(objPaquetesPrealertados);
          }
        });
      }
      return listaPaquetesPorRepartidor;
    }//fin retornar _retornarPaquetesPorRepartidor


    //--sesion activa cliente lista paquetes de su perfil--//
    function _retornarPaquetesPorCliente(pusuarioCorreo) {
      let listaPaquetesPorCliente = [];
      let listaPaquetesPrealertadosLocal = _retornarPaquetesPrealertados();

      if (listaPaquetesPrealertadosLocal == null) {
        listaPaquetesPorCliente = [];
      } else {

        listaPaquetesPrealertadosLocal.forEach(obj => {
          let objPaquetesPrealertados = new Paquete(obj.trackingPaquete, obj.tipoPaquete, obj.pesoPaquete,
            obj.precioPaquete, obj.costoEnvio, obj.costoTotalPaquete, obj.estadoPaquete, obj.idRepartidor,
            obj.idSucursal, obj.idCliente, obj.idMensajero);

          if (objPaquetesPrealertados.idCliente == pusuarioCorreo) {
            listaPaquetesPorCliente.push(objPaquetesPrealertados);
          }
        });
      }
      return listaPaquetesPorCliente;
    }//fin retornar _retornarPaquetesPorCliente


    //prueba devolver todos los paquetes
    function _retornarPaquetesPrealertados() {

      let ListaPaquetesBD = dataStorageFactory.getPackage();
      let listaPaquetesPrealertados = [];

      if (ListaPaquetesBD == null) {
        listaPaquetesPrealertados = [];
      } else {
        ListaPaquetesBD.forEach(obj => {
          let objPaquetesPrealertados = new Paquete(obj.trackingPaquete, obj.tipoPaquete, obj.pesoPaquete,
            obj.precioPaquete, obj.costoEnvio, obj.costoTotalPaquete, obj.estadoPaquete, obj.idRepartidor,
            obj.idSucursal, obj.idCliente, obj.idMensajero);

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
        if (pobjPaqueteTemp.estadoPaquete == listaPaquetesPrealertados[i].getTracking()) {
          paqueteEncontrado = listaPaquetesPrealertados[i].getEstadoPaquete()
        }
      }
      return paqueteEncontrado;
    }

    function _modificarEstado(pPaquetesPrealertadosMod) { // recibo el nueva informacion

      let modificacionExitosa = false;

      modificacionExitosa = dataStorageFactory.updatePackage(pPaquetesPrealertadosMod);

      return modificacionExitosa;
    }// fin función actualizarEstado


    function actualizarListaPaquetes(listaPaquetes) {
      localStorage.setItem('listaPaquetesPrealertadosLS', JSON.stringify(listaPaquetes));
    }

    function _buscarPaquete(pTrakingPaquete) {
      let listaPaquetes = _retornarPaquetesPrealertados(),
        paquete;

      for (let i = 0; i < listaPaquetes.length; i++) {
        if (listaPaquetes[i].getTracking() == pTrakingPaquete) {
          paquete = listaPaquetes[i];
        }
      };

      return paquete;
    };

    function _agregarDatosSession(pTrakingPaquete) {
      dataStorageFactory.setData(pTrakingPaquete);
    };

    function _consultarDatosSession() {
      let datosPaquete = dataStorageFactory.getData(),
        paqueteActivo;

      if (!datosPaquete) {
        paqueteActivo = undefined;
      } else {
        paqueteActivo = _buscarPaquete(datosPaquete);
      }

      return paqueteActivo;
    };

    function _removerDatosSession() {
      dataStorageFactory.removeData();
    };
  }
})();
