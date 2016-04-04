djello.controller('BoardCtrl', ['$scope', '$state', 'Restangular', 'Auth', 'BoardService', function($scope, $state, Restangular, Auth, BoardService) {

  $scope.boards = BoardService.getBoardList();
  $scope.board = BoardService.getCurrentBoard();

  $scope.newBoard = function() {
    BoardService.newBoard();
  }

  $scope.createBoard = function() {
    BoardService.createBoard();
  };

  $scope.deleteBoard = function(board) {
    BoardService.deleteBoard();
  };

  $scope.setBoard = function(board) {
    BoardService.setCurrentBoard(board);
  }

  $scope.createList = function() {
    Restangular.all('lists').post( { title: "Title...", description: "Description...", board_id: $scope.board.id } )
    .then( function(newList) {
      newList.cards = [];
      $scope.board.lists.push(newList);
    });
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
