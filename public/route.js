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

      .state('main.perfil', {
        url: '/miPerfil',
        templateUrl: './components/usuarios/perfil/perfil.view.html',
        data: {
          pageTitle: 'Mi perfil'
        }
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


      .state('main.editarUsuario', {
        url: '/editarUsuario',
        templateUrl: './components/usuarios/editarUsuario/editarUsuario.view.html',
        data: {
          pageTitle: 'Editar'
        },
        resolve: {
          load: ['$ocLazyLoad', ($ocLazyLoad) => {
            return $ocLazyLoad.load('./components/usuarios/editarUsuario/editarUsuario.controller.js')
          }]
        },
        controller: 'controladorEditarUsuario',
        controllerAs: 'vm'
      });

    $urlRouterProvider.otherwise('/');
  };
})();