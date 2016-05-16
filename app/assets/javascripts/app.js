var djello = angular.module('djello', [ 'ui.router',
                                        'restangular',
                                        'Devise',
                                        'xeditable',
                                        'angularModalService']);

djello.config('AuthProvider', [function(AuthProvider) {
  AuthProvider.loginPath('/auth/login.json');
  AuthProvider.loginMethod('GET');
  AuthProvider.resourceName('user');
}])

djello.factory('_', ['$window', function($window) {
  return $window._; // assumes underscore has already been loaded on the page
}]);

// Restangular Config
djello.config( ['RestangularProvider', function(RestangularProvider) {

  RestangularProvider.setBaseUrl('/api/v1');
  RestangularProvider.setRequestSuffix('.json');

}]);

djello.run('editableOptions', 'editableThemes', [function(editableOptions, editableThemes) {
  editableOptions.theme = 'bs3';
  editableThemes.bs3.buttonsClass = 'btn-xs';
}]);

djello.config(['$urlRouterProvider', '$stateProvider',
  function($urlRouterProvider, $stateProvider){

    $stateProvider

    .state("djello", {
      url: "/",
      template: "<div ui-view></div>"
    })
    .state('djello.boards', {
      url: 'boards',
      templateUrl: 'templates/board.html',
      controller: 'BoardCtrl'
    })
    .state('djello.newboard', {
      url: 'new',
      templateUrl: 'templates/newboard.html',
      controller: 'BoardCtrl'
    })

    $urlRouterProvider.otherwise('boards');

  }]);
