var djello = angular.module('djello', ['ui.router', 'restangular', 'Devise']);

djello.config(function(AuthProvider) {
    // Configure Auth service with AuthProvider
})

djello.factory('_', ['$window', function($window) {
  return $window._; // assumes underscore has already been loaded on the page
}]);

// Restangular Config
djello.config( ['RestangularProvider', function(RestangularProvider) {

  RestangularProvider.setBaseUrl('/api/v1');
  RestangularProvider.setRequestSuffix('.json');

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
