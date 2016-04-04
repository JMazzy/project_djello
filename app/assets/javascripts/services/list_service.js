djello.factory('ListService', ['Restangular', 'BoardService', function(Restangular, BoardService) {
  var obj = {};

  obj.createList = function() {
    var board = BoardService.getCurrentBoard();
    Restangular.all('lists').post( { title: "Title...", description: "Description...", board_id: board.id } )
    .then( function(newList) {
      newList.cards = [];
      board.lists.push(newList);
    });
  };

  obj.updateList = function(list) {
    Restangular.one('lists', list.id)
    .patch( { title: list.title, description: list.description } )
    .then( function(updatedList) {
      list = updatedList;
    });
  };

  obj.deleteList = function(list) {
    var board = BoardService.getCurrentBoard();
    Restangular.one('lists', list.id)
    .remove()
    .then( function(deletedList) {
      for ( var l = 0; l < board.lists.length; l++ ) {
        if ( board.lists[l].id === deletedList.id ) {
          board.lists.splice(l, 1);
          break;
        }
      }
    });
  };

  return obj;
}]);
