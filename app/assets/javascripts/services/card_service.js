djello.factory('CardService', ['Restangular', 'BoardService', 'ListService', 'ModalService', function(Restangular, BoardService, ListService, ModalService) {
  var obj = {};

  var _board = BoardService.getCurrentBoard();

  var _cardData = {
    cardList: null,
    currentCard: {
      id: null,
      title: null,
      description: null,
    },
    setCardList: function(list) {
      this.cardList = list;
    },
    getCardList: function() {
      return this.cardList;
    },
    setCurrentCard: function(card) {
      this.currentCard = card;
    },
    getCurrentCard: function() {
      return this.currentCard;
    },
  };

  obj.getCardData = function() {
    return _cardData;
  };

  obj.updateCard = function() {
    Restangular.one('cards', _cardData.currentCard.id)
    .patch({  title: _cardData.currentCard.title,
              description: _cardData.currentCard.description, })
    .then( function(updatedCard) {

    })
  };

  obj.createCard = function(listID) {
    _board = BoardService.getCurrentBoard();
    Restangular.all('cards').post( { title: "Title...", description: "Description...", list_id: listID } )
    .then( function(newCard) {
      _board.lists.forEach( function(list) {
        if ( list.id === listID ) {
          list.cards.push(newCard);
        }
      });
    });
  };

  obj.deleteCard = function(listID) {
    _board = BoardService.getCurrentBoard();
    Restangular.one('cards', _cardData.getCurrentCard().id)
    .remove()
    .then( function(deletedCard) {
      for ( var l = 0; l < _board.lists.length; l++ ) {
        if ( _board.lists[l].id === listID ) {
          for (var c = 0; c < _board.lists[l].cards.length; c++) {
            if (_board.lists[l].cards[c].id === _cardData.getCurrentCard().id) {
              _board.lists[l].cards.splice(c, 1);
              break;
            }
          }
        }
      }
    })
  };

  return obj;
}]);
