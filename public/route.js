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
      })
      .state('main.registrarCarrier', {
        url: '/registrarCarrier',
        templateUrl: './components/carrier/registrarCarrier/registrarCarrier.view.html',
        data: {
          pageTitle: 'Registrar Carrier | Correos de Costa Rica'
        },
        resolve: {
          load: ['$ocLazyLoad', ($ocLazyLoad) => {
            return $ocLazyLoad.load('./components/carrier/registrarCarrier/registrarCarrier.controller.js')
          }]
        },
        controller: 'controladorRegistrarCarrier',
        controllerAs: 'vm'
      })
      
      .state('main.listarCarrier', {
        url: '/listarCarrier',
        templateUrl: './components/carrier/listarCarrier/listarCarrier.view.html',
        data: {
          pageTitle: 'Listar Carrier | Correos de Costa Rica'
        },
        resolve: {
          load: ['$ocLazyLoad', ($ocLazyLoad) => {
            return $ocLazyLoad.load('./components/carrier/listarCarrier/listarCarrier.controller.js')
          }]
        },
        params: {
          objCarrier: ''
        },
        
        controller: 'controladorlistaCarrier',
        controllerAs: 'vm'
      })
      
      .state('main.editarCarrier', {
        url: '/editarCarrier',
        templateUrl: './components/carrier/editarCarrier/editarCarrier.view.html',
        data: {
          pageTitle: 'Editar Carrier | Correos de Costa Rica'
        },
        resolve: {
          load: ['$ocLazyLoad', ($ocLazyLoad) => {
            return $ocLazyLoad.load('./components/carrier/editarCarrier/editarCarrier.controller.js')
          }]
        },
        params: {
          objCarrier: ''
        },
        
        controller: 'controladorEditarCarrier',
        controllerAs: 'vm'
      })

      .state('main.registroSucursales', {
        url: '/registroSucursales',
        templateUrl: './components/sucursales/registrarSucursal/registrarSucursal.view.html',
        data: {
          pageTitle: 'Registro Sucursal | Sucursal'
        },
        resolve: {
          load: ['$ocLazyLoad', ($ocLazyLoad) => {
            return $ocLazyLoad.load('./components/sucursales/registrarSucursal/registrarSucursal.controller.js')
          }]
        },
        controller: 'controladorRegistrarSucursal',
        controllerAs: 'vm'
      })


      .state('main.editarSucursal', {
        url: '/editarSucursal',
        templateUrl: './components/sucursales/editarSucursales/editarSucursal.view.html',
        data: {
          pageTitle: 'Editar Sucursal | Sucursal'
        },
        resolve: {
          load: ['$ocLazyLoad', ($ocLazyLoad) => {
            return $ocLazyLoad.load('./components/sucursales/editarSucursales/editarSucursal.controller.js')
          }]
        },
        params: {
          objSucursal: ''
        },
        controller: 'controladorEditarSucursal',
        controllerAs: 'vm'
      })

      .state('main.listarSucursales', {
        url: '/listarSucursales',
        templateUrl: './components/sucursales/listarSucursales/listarSucursales.view.html',
        data: {
          pageTitle: 'lista Sucursales | Sucursales'
        },
        resolve: {
          load: ['$ocLazyLoad', ($ocLazyLoad) => {
            return $ocLazyLoad.load('./components/sucursales/listarSucursales/listarSucursales.controller.js')
          }]
        },
        params: {
          objSucursal: ''
        },
        controller: 'controladorlistaSucursales',
        controllerAs: 'vm'
      })
      
      ;

    $urlRouterProvider.otherwise('/');
  };
})();