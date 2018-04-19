(() => {
  'use strict';
  angular
    .module('appRoutes', ['ui.router', 'oc.lazyLoad', 'uiRouterTitle'])
    .config(routing);
  routing.$inject = ['$stateProvider', '$urlRouterProvider'];

  function routing($stateProvider, $urlRouterProvider, $oclazyLoad) {

    $stateProvider
      .state('paginaInicio', {
        url: '/',
        templateUrl: './components/paginaInicio/paginaInicio.view.html',
        data: {
          pageTitle: 'Correos de Costa Rica'
        },
        resolve: {
          load: ['$ocLazyLoad', ($ocLazyLoad) => {
            return $ocLazyLoad.load('./components/paginaInicio/inicioSesion.controller.js')
          }]
        },
        controller: 'controladorInicioSesion',
        controllerAs: 'vm'
      })

      .state('404', {
        url: '/404',
        templateUrl: './404.html',
        data: {
          pageTitle: 'Error 404'
        }
      })

      .state('main', {
        url: '/main',
        templateUrl: './components/main/main.view.html',
        data: {
          pageTitle: 'Perfil de usuario'
        },
        resolve: {
          load: ['$ocLazyLoad', ($ocLazyLoad) => {
            return $ocLazyLoad.load('./components/main/main.controller.js')
          }]
        },
        controller: 'mainController',
        controllerAs: 'vm'
      })

      .state('main.inicio', {
        url: '/inicio',
        templateUrl: './components/main/inicio/inicio.view.html',
        data: {
          pageTitle: 'Inicio'
        }
      })

      .state('main.perfil', {
        url: '/miPerfil',
        templateUrl: './components/usuarios/perfil/perfil.view.html',
        data: {
          pageTitle: 'Mi perfil'
        },
        resolve: {
          load: ['$ocLazyLoad', ($ocLazyLoad) => {
            return $ocLazyLoad.load('./components/usuarios/perfil/perfil.controller.js')
          }]
        },
        controller: 'perfilController',
        controllerAs: 'vm'
      })

      .state('main.registrarTarjetas', {
        url: '/registrarTarjetas',
        templateUrl: './components/tarjetas/registrarTarjetas/registrarTarjeta.view.html',
        data: {
          pageTitle: 'Registrar tarjeta'
        },
        resolve: {
          load: ['$ocLazyLoad', ($ocLazyLoad) => {
            return $ocLazyLoad.load('./components/tarjetas/registrarTarjetas/registrarTarjeta.controller.js')
          }]
        },
        controller: 'controladorRegistrarTarjeta',
        controllerAs: 'vm'
      })

      .state('main.listarTarjetas', {
        url: '/listarTarjetas',
        templateUrl: './components/tarjetas/listarTarjetas/listarTarjetas.view.html',
        data: {
          pageTitle: 'Listar tarjetas'
        },
        resolve: {
          load: ['$ocLazyLoad', ($ocLazyLoad) => {
            return $ocLazyLoad.load('./components/tarjetas/listarTarjetas/listarTarjetas.controller.js')
          }]
        },
        controller: 'controladorListarTarjeta',
        controllerAs: 'vm'
      })

      .state('main.editarTarjetas', {
        url: '/editarTarjetas',
        templateUrl: './components/tarjetas/modificarTarjetas/modificarTarjetas.view.html',
        data: {
          pageTitle: 'Editar tarjetas'
        },
        resolve: {
          load: ['$ocLazyLoad', ($ocLazyLoad) => {
            return $ocLazyLoad.load('./components/tarjetas/modificarTarjetas/modificarTarjetas.controller.js')
          }]
        },
        controller: 'controladorModificarTarjeta',
        controllerAs: 'vm'
      })

      .state('main.listarClientes', {
        url: '/listarClientes',
        templateUrl: './components/usuarios/cliente/listarClientes/listarClientes.view.html',
        data: {
          pageTitle: 'Listar clientes'
        },
        resolve: {
          load: ['$ocLazyLoad', ($ocLazyLoad) => {
            return $ocLazyLoad.load('./components/usuarios/cliente/listarClientes/listarClientes.controller.js')
          }]
        },
        controller: 'controladorListarClientes',
        controllerAs: 'vm'
      })

      .state('registrarCliente', {
        url: '/registrarCliente',
        templateUrl: './components/usuarios/cliente/registrarCliente/registrarCliente.view.html',
        data: {
          pageTitle: 'Registrar cliente'
        },
        resolve: {
          load: ['$ocLazyLoad', ($ocLazyLoad) => {
            return $ocLazyLoad.load('./components/usuarios/cliente/registrarCliente/registrarCliente.controller.js')
          }]
        },
        controller: 'controladorRegistrarCliente',
        controllerAs: 'vm'
      })

      .state('main.registrarConvenio', {
        url: '/agreementRegistration',
        templateUrl: './components/convenios/registrarConvenio//registrarConvenio.view.html',
        data: {
          pageTitle: 'Registro de Convenios | Correos de Costa Rica'
        },
        resolve: {
          load: ['$ocLazyLoad', ($ocLazyLoad) => {
            return $ocLazyLoad.load('./components/convenios/registrarConvenio/registrarConvenio.controller.js')
          }]
        },
        controller: 'controladorRegistrarConvenio',
        controllerAs: 'vm'
      })
      
      .state('main.listaConvenios', {
        url: '/agreementList',
        templateUrl: './components/convenios/listarConvenios/listarConvenios.view.html',
        data: {
          pageTitle: 'Lista de convenios | Correos CR'
        },
        resolve: {
          load: ['$ocLazyLoad', ($oclazyLoad) => {
            return $oclazyLoad.load ('./components/convenios/listarConvenios/listarConvenios.controller.js')
          }]
        },
        controller : 'controladorListarConvenios',
        controllerAs: 'vm'
      })
      
      .state('editarConvenios', {
        url: '/agreementModify',
        templateUrl: './components/convenios/editarConvenios/editarConvenios.view.html',
        data: {
          pageTitle: 'Edición de convenios | Correos CR'
        },
        resolve: {
          load: ['$ocLazyLoad', ($oclazyLoad) => {
            return $oclazyLoad.load ('./components/convenios/editarConvenios/editarConvenios.controller.js')
          }]
        },
        params: {
          convenioMod: ''
        },
        controller : 'controladorEditarConvenios',
        controllerAs: 'vm'
      })

      .state('main.registrarEncargado', {
        url: '/registerManager',
        templateUrl: './components/usuarios/encargados/registrarEncargado/registrarEncargado.view.html',
        resolve: {
          load: ['$ocLazyLoad', ($ocLazyLoad) => {
            return $ocLazyLoad.load('./components/usuarios/encargados/registrarEncargado/registrarEncargado.controller.js')
          }]
        },
        data: {
          pageTitle: 'Registrar encargado | Correos CR'
        },
        controller: 'controladorRegistroEncargado',
        controllerAs: 'vm'
      })

      .state('main.listarEncargados', {
        url: '/listManager',
        templateUrl: './components/usuarios/encargados/listarEncargados/listarEncargados.view.html',
        resolve: {
          load: ['$ocLazyLoad', ($ocLazyLoad) => {
            return $ocLazyLoad.load('./components/usuarios/encargados/listarEncargados/listarEncargados.controller.js')
          }]
        },
        data: {
          pageTitle: 'Listar encargados | Correos CR'
        },
        controller: 'controladorListarEncargados',
        controllerAs: 'vm'
      })

      .state('main.editarEncargados', {
        url: '/modifyManager',
        templateUrl: './components/usuarios/encargados/editarEncargado/editarEncargado.view.html',
        resolve: {
          load: ['$ocLazyLoad', ($ocLazyLoad) => {
            return $ocLazyLoad.load('./components/usuarios/encargados/editarEncargado/editarEncargado.controller.js')
          }]
        },
        params: {
          datosMod: ''
        },
        data: {
          pageTitle: 'Editar encargado | Correos CR'
        },
        controller: 'controladorEditarEncargado',
        controllerAs: 'vm'
      })
      .state('main.prealerta', {
        url: '/prealertarPaquetes',
        templateUrl: './components/paquetes/prealertarPaquete/prealertarPaquete.view.html',
        data: {
          pageTitle: 'Prealerta de paquetes'
        },
        resolve: {
          load: ['$ocLazyLoad', ($ocLazyLoad) => {
            return $ocLazyLoad.load('./components/paquetes/prealertarPaquete/prealertarPaquete.controller.js')
          }]
        },
        controller: 'controladorPrealertar',
        controllerAs: 'vm'
      })
         
      .state('main.listarPaquetes', {
        url: '/listarPaquetes',
        templateUrl: './components/paquetes/listarPaquetes/listarPaquetes.view.html',
        data: {
          pageTitle: 'Listar Paquetes'
        },
        resolve: {
          load:['$ocLazyLoad', ($oclazyLoad)=>{
            return $oclazyLoad.load('./components/paquetes/listarPaquetes/listarPaquetes.controller.js')
          }]
        },
        controller:'controladorListarPaquetes',
        controllerAs: 'vm'
      })
      .state('main.estadoPaquete', {
        url: '/estadoPaquete',
        templateUrl: './components/paquetes/consultarEstado/consultarEstado.view.html',
        data: {
          pageTitle: 'Estado del paquete'
        },
        resolve: {
          load: ['$ocLazyLoad', ($ocLazyLoad) => {
            return $ocLazyLoad.load('./components/paquetes/consultarEstado/consultarEstado.controller.js')
          }]
        },
        controller: 'controladorConsultarEstado',
        controllerAs: 'vm'
      })

      .state('main.modificarEstadoPaquete', {
        url: '/modificarEstadoPaquete',
        templateUrl: './components/paquetes/modificarEstado/modificarEstado.view.html',
        data: {
          pageTitle: 'Modificar estado de paquete'
        },
        resolve: {
          load: ['$ocLazyLoad', ($ocLazyLoad) => {
            return $ocLazyLoad.load('./components/paquetes/modificarEstado/modificarEstado.controller.js')
          }]
        },
        controller: 'controladorModificarEstadoPaquete',
        controllerAs: 'vm'
      })
      
      .state('registrarRepartidor', {
        url: '/registrarRepartidor',
        templateUrl: './components/usuarios/repartidor/registrarRepartidor/registrarRepartidor.view.html',
        data: {
          pageTitle: 'Registrar cliente'
        },
        resolve: {
          load: ['$ocLazyLoad', ($ocLazyLoad) => {
            return $ocLazyLoad.load('./components/usuarios/repartidor/registrarRepartidor/registrarRepartidor.controller.js')
          }]
        },
        controller: 'controladorRegistrarRepartidor',
        controllerAs: 'vm'
      });

    $urlRouterProvider.otherwise('/');
  };
})();