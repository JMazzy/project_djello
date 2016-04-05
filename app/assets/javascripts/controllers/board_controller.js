djello.controller('BoardCtrl', ['$scope', '$state', 'Restangular', 'Auth', 'BoardService', 'ListService', 'CardService', 'ModalService', function($scope, $state, Restangular, Auth, BoardService, ListService, CardService, ModalService) {

  $scope.boards = BoardService.getBoardList();
  $scope.board = BoardService.getCurrentBoard();
  $scope.cardData = CardService.getCardData();

  $scope.newBoard = function() {
    BoardService.newBoard();
  }

  $scope.createBoard = function() {
    BoardService.createBoard();
  };

  $scope.updateBoard = function() {
    BoardService.updateBoard();
  };

  $scope.deleteBoard = function(board) {
    BoardService.deleteBoard();
  };

  $scope.setBoard = function(board) {
    BoardService.setCurrentBoard(board);
  }

  $scope.createList = function() {
    ListService.createList();
  };

  $scope.updateList = function(list) {
    ListService.updateList(list);
  };

  $scope.deleteList = function(list) {
    ListService.deleteList(list);
  };

  $scope.createCard = function(listID) {
    CardService.createCard(listID)
  };

  $scope.showCardDetails = function(card, list) {
    $scope.cardData.setCurrentCard(card);
    $scope.cardData.setCardList(list);

    ModalService.showModal({
      templateUrl: "templates/card_details.html",
      controller: "CardCtrl",
    }).then( function(modal) {
      modal.element.modal('show');
      modal.close.then(function(result) {
        $(".modal-backdrop").addClass("hidden");
      });
    });
  }
}])
