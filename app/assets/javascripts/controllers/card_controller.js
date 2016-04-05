djello.controller('CardCtrl', ['$scope', '$state', 'Restangular', 'Auth', 'BoardService', 'ListService', 'CardService', 'ModalService', 'close', function($scope, $state, Restangular, Auth, BoardService, ListService, CardService, ModalService, close) {

  $scope.cardData = CardService.getCardData();
  $scope.card = $scope.cardData.getCurrentCard();

  $scope.updateCard = function() {
    CardService.updateCard();
  }

}]);
