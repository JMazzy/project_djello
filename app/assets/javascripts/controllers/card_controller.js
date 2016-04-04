djello.controller('CardCtrl', ['$scope', '$state', 'Restangular', 'Auth', 'BoardService', 'ListService', 'ModalService', 'close', function($scope, $state, Restangular, Auth, BoardService, ListService, ModalService, close) {

  $scope.closeCardDetails = function() {
    // close("Success!");
    console.log("closed")
  }

}]);
