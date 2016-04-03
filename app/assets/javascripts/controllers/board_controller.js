djello.controller('BoardCtrl', ['$scope', '$state', 'Restangular', 'Auth', function($scope, $state, Restangular, Auth) {

  $scope.boards = Restangular.all('boards').getList().$object;
  $scope.board = $scope.boards[0];

  $scope.createBoard = function() {
    Restangular.all('boards').post( { title: $scope.board.title } )
    .then( function(newBoard) {
      $scope.boards.push(newBoard);
      $state.go("djello.boards");
    });
  };

  $scope.createList = function() {
    Restangular.all('lists').post( { title: $scope.list.title } )
    .then( function(newList) {
      $scope.board.lists.push(newList);
      $state.go("djello.boards");
    });
  };
}])
