(() => {
    'use strict';
  
    angular
      .module('correosCR')
      .controller('controladorlistaPaquetesPrealertados', controladorlistaPaquetesPrealertados)
  
    controladorlistaPaquetesPrealertados.$inject = ['$stateParams', '$state', 'servicioPaquetes']
    function controladorlistaPaquetesPrealertados($stateParams, $state, servicioPaquetes) {
  
      let vm = this;
      const userAuth = servicioPaquetes.getAuthUser();
      if (userAuth == undefined) {
        $state.go('inicioSesion');
      }
  
      let usuarioCedula = userAuth.cedula;
      let usuarioRol = userAuth.rol;
      let sucursalID = userAuth.idSucursal;
      
      switch (usuarioRol) {
        case 1:
          vm.listarPaquetesPrealertados = servicioPaquetes.listarPaquetesPrealertados(usuarioRol);
          break;
        case 2:
          vm.listarPaquetesPrealertados = servicioPaquetes.listarPaquetesPrealertados(usuarioRol);
          break;
        case 3:
          vm.listarPaquetesPrealertados = servicioPaquetes.listarPaquetesPrealertados(usuarioRol,sucursalID);
          break;
        case 4:
          vm.listarPaquetesPrealertados = servicioPaquetes.retornarPaquetesPorRepartidor(usuarioCedula);
          break;
        case 5:
          vm.listarPaquetesPrealertados = servicioPaquetes.retornarPaquetesPorCliente(usuarioCedula);
          break;
        default:
  
          break;
      }
  
      vm.estadoPaquete = (ppaquetesPrealertados) => {
  
        $state.go('main.estadoPaquete', { objPaqueteEstado: JSON.stringify(ppaquetesPrealertados) });
      }
  
      vm.agregarPaquetes = () => {
        $state.go('main.prealertarPaquetes')
      }
  
      vm.retornarPaquetesPrealertados = servicioPaquetes.retornarPaquetesPrealertados();
  
    }
  })();