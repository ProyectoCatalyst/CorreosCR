(() => {
  'use strict';
  angular
  .module('correosCR')
  .directive('menuLateral', menuLateral);
  
  menuLateral.$inject = ['$state', 'servicioInicioSesion'];
  
  function menuLateral($state, servicioInicioSesion){

    let sidebarController = function () {  
      const userAuth = servicioInicioSesion.getAuthUser();
      const vm = this;
      vm.rolUsuario = userAuth.getRol();
    };

    let sidebar = {
      templateUrl: '/components/directives/sidebar/sidebar.view.html',
      restrict: 'EA',
      controller: sidebarController,
      controllerAs: 'vm',
    };

    return sidebar;
  }
})();