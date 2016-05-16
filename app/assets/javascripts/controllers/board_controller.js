djello.controller('BoardCtrl', ['$scope', '$state', 'Restangular', 'Auth', 'BoardService', 'ListService', 'CardService', 'UserService', 'ModalService', function($scope, $state, Restangular, Auth, BoardService, ListService, CardService, UserService, ModalService) {

  $scope.userData = UserService.getUserData();
  $scope.userData.setUserList();
  $scope.users = $scope.userData.getUserList();

  $scope.memberToAdd;

  $scope.boards = BoardService.getBoardList();
  BoardService.setCurrentBoard( $scope.boards[0] );
  $scope.board = BoardService.getCurrentBoard();
  $scope.cardData = CardService.getCardData();

  Auth.currentUser().then(function(user) {
    $scope.user = user;
  }, function(error) {
    console.error();(error)
  });

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

  $scope.addMember = function() {
    BoardService.addMember( $scope.memberToAdd );
  }

  $scope.removeMember = function(member) {
    BoardService.removeMember(member)
  };

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
    CardService.createCard(listID, $scope.user)
  };

  $scope.showCardDetails = function(card, list) {
    $scope.cardData.setCurrentCard(card);
    $scope.cardData.setCardList(list);

    ModalService.showModal({
      templateUrl: "templates/card_details.html",
      controller: "CardCtrl",
      scope: $scope,
    }).then( function(modal) {
      modal.element.modal('show');
      modal.close.then(function(result) {
        $(".modal-backdrop").addClass("hidden");
      });
    });
  }
}])
