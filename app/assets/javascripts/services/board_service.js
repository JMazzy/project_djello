djello.factory('BoardService', [ 'Restangular', '$state', function(Restangular, $state){
  var obj = {};

  var _boards = {
    boardList: Restangular.all('boards').getList().$object,
    currentBoard: {title: null},
  };

  obj.getBoardList = function() {
    return _boards.boardList;
  };

  obj.setCurrentBoard = function(board) {
    _boards.currentBoard = board;
  }

  obj.getCurrentBoard = function(board_id) {
    return _boards.currentBoard;
  };

  obj.newBoard = function() {
    _boards.currentBoard = {title: "New Board"}
  }

  obj.createBoard = function() {
    Restangular.all('boards').post( { title: _boards.currentBoard.title } )
    .then( function(newBoard) {
      newBoard.lists = [];
      _boards.boardList.push(newBoard);
      _boards.currentBoard = newBoard;
      $state.go("djello.boards");
    });
  };

  obj.updateBoard = function() {
    Restangular.one('boards', _boards.currentBoard.id)
    .patch( { title: _boards.currentBoard.title} )
    .then( function(updatedBoard) {
      updatedBoard.lists = [];
      _boards.boardList.push(updatedBoard);
      _boards.currentBoard = updatedBoard;
      $state.go("djello.boards");
    });
  };

  obj.deleteBoard = function() {
    _boards.currentBoard.remove().then( function(deletedBoard) {
      for ( var b = 0; b < _boards.boardList.length; b++) {
        if ( _boards.boardList[b].id === deletedBoard.id) {
          _boards.boardList.splice(b, 1)
          break;
        }
      }
    });
  };

  return obj;
}]);
