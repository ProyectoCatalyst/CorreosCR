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