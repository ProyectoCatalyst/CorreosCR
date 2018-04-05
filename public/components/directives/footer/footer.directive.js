(() => {
  'use strict';
  angular
  .module('correosCR')
  .directive('footerPrincipal', footerPrincipal);
  
  function footerPrincipal(){
    const footer = {
      templateUrl: '/components/directives/footer/footer.view.html',
      restrict: 'EA'
    };

    return footer;
  }
})();