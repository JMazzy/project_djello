djello.controller('BoardCtrl', ['$scope', '$state', 'Restangular', 'Auth', 'BoardService', 'ListService', function($scope, $state, Restangular, Auth, BoardService, ListService) {

  $scope.boards = BoardService.getBoardList();
  $scope.board = BoardService.getCurrentBoard();

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
    Restangular.all('cards').post( { title: "Title...", description: "Description...", list_id: listID } )
    .then( function(newCard) {
      $scope.board.lists.forEach( function(list) {
        if ( list.id === listID ) {
          list.cards.push(newCard);
        }
      });
    });
  };
}])
