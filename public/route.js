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
      });

    $urlRouterProvider.otherwise('/404');
  };
})();