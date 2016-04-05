djello.controller('CardCtrl', ['$scope', '$state', 'Restangular', 'Auth', 'BoardService', 'ListService', 'CardService', 'ModalService', 'close', function($scope, $state, Restangular, Auth, BoardService, ListService, CardService, ModalService, close) {

  $scope.board = BoardService.getCurrentBoard();
  $scope.cardData = CardService.getCardData();
  $scope.list = $scope.cardData.getCardList();
  $scope.card = $scope.cardData.getCurrentCard();
  $scope.memberToAdd;

  $scope.updateCard = function() {
    CardService.updateCard();
  }

  $scope.deleteCard = function(listID) {
    CardService.deleteCard(listID);
  }

  $scope.addMember = function() {
    for ( var m = 0; m < $scope.card.members.length; m++ ) {
      if ($scope.memberToAdd.username === $scope.card.members[m].username ) {
        return false;
      }
    }
    $scope.card.members.push($scope.memberToAdd);
  }

}]);
