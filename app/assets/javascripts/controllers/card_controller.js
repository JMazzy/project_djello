djello.controller('CardCtrl', ['$scope', '$state', 'Restangular', 'Auth', 'BoardService', 'ListService', 'CardService', 'ModalService', 'close', function($scope, $state, Restangular, Auth, BoardService, ListService, CardService, ModalService, close) {

  $scope.board = BoardService.getCurrentBoard();
  $scope.cardData = CardService.getCardData();
  $scope.list = $scope.cardData.getCardList();
  $scope.card = $scope.cardData.getCurrentCard();
  $scope.memberToAdd;

  $scope.updateCard = function() {
    CardService.updateCard();
  };

  $scope.deleteCard = function(listID) {
    CardService.deleteCard(listID);
  };

  $scope.addMember = function() {
    CardService.addMember($scope.memberToAdd);
  };

  $scope.removeMember = function(member) {
    CardService.removeMember(member)
  };

}]);
