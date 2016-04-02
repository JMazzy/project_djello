var djello = angular.module('djello', ['ui.router', 'restangular', 'Devise'])
.config(function(AuthProvider) {
    // Configure Auth service with AuthProvider
})

// .controller('myCtrl', function(Auth) {
//         // Use your configured Auth service.
//     });


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
      url: "",
      template: "<div ui-view></div>"
    })
    .state('djello.boards', {
      url: '/boards',
      templateUrl: 'templates/board.html',
      controller: 'BoardCtrl',
      resolve: {
        board: ['Restangular', '$stateParams', function(Restangular, $stateParams){
          return Restangular.one('boards', $stateParams.id).get();
        }]
      }
    })
    .state('djello.newboard', {
      url: '/new',
      templateUrl: 'templates/newboard.html',
      controller: 'BoardCtrl'
    })
    // .state('djello.boards.lists', {
    //   url: 'boards/:id/lists',
    //   templateUrl: 'templates/list.html',
    //   controller: 'ListCtrl',
    //   resolve: {
    //     board: ['Restangular', '$stateParams', function(Restangular, $stateParams){
    //       return Restangular.one('boards', $stateParams.id).get();
    //     }]
    //   }
    // })
    // .state('djello.boards.lists.new', {
    //   url: 'new',
    //   templateUrl: 'templates/newlist.html',
    //   controller: 'ListCtrl',
    //   resolve: {
    //     board: ['Restangular', '$stateParams', function(Restangular, $stateParams){
    //       return Restangular.one('boards', $stateParams.id).get();
    //     }]
    //   }
    // })

    $urlRouterProvider.otherwise('/boards');

  }]);
