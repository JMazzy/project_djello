djello.controller('ListCtrl', ['$scope', '$stateParams', 'board', function($scope, $stateParams, board) {

  $scope.board = board;
  $scope.lists = $scope.board.lists;
}])
