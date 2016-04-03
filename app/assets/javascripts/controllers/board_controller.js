djello.controller('BoardCtrl', ['$scope', '$state', 'Restangular', 'Auth', function($scope, $state, Restangular, Auth) {

  $scope.boards = Restangular.all('boards').getList().$object;
  $scope.board = $scope.boards[0];

  $scope.createBoard = function() {
    Restangular.all('boards').post( { title: $scope.board.title } )
    .then( function(newBoard) {
      newBoard.lists = [];
      $scope.boards.push(newBoard);
      $scope.board = $scope.boards[-1];
      $state.go("djello.boards");
    });
  };

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
          console.log(list)
          console.log(list.cards)
          console.log(listID, list.id)
          list.cards.push(newCard);
        }
      });
    });
  };
}])
