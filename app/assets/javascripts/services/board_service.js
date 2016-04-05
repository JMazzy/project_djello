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

  obj.addMember = function(member) {
    Restangular.all('board_memberships')
    .post( { board_id: _boards.currentBoard.id, member_id: member.id } )
    .then( function(newMembership) {
      _boards.currentBoard.members.push(newMembership.member);
    });
  }

  obj.removeMember = function(member) {
    Restangular.one('board_memberships', member.id) // should not be member id but membership id!!!!!
    .remove( { board_id: _boards.currentBoard.id, member_id: member.id } )
    .then( function(membership) {
      for ( var m = 0; m < _boards.currentBoard.members.length; m++ ) {
        if ( _boards.currentBoard.members[m].id === membership.member.id ) {
          _boards.currentBoard.members.splice(m,1);
        }
      }
    });
  }

  return obj;
}]);
