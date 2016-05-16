djello.factory('CardService', ['Restangular', 'BoardService', 'ListService', 'ActivityService', function(Restangular, BoardService, ListService, ActivityService) {
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

  obj.createCard = function(listID, user) {
    _board = BoardService.getCurrentBoard();
    Restangular.all('cards').post( { title: null, description: null, list_id: listID } )
    .then( function(newCard) {
      BoardService.addCardToList(listID, newCard);
    });
  };

  obj.deleteCard = function(listID) {
    _board = BoardService.getCurrentBoard();
    Restangular.one('cards', _cardData.getCurrentCard().id)
    .remove()
    .then( function(deletedCard) {
      BoardService.removeCardFromList(listID, deletedCard.id)
    })
  };

  obj.addMember = function(member) {
    Restangular.all('card_memberships')
    .post( { card_id: _cardData.currentCard.id, member_id: member.id } )
    .then( function(newMembership) {
      _cardData.currentCard.members.push( newMembership.member );
      var description = member.username + " was added as a member."
      ActivityService.createActivity( member, _cardData.currentCard, description)
    });
  }

  obj.removeMember  = function(member) {
    Restangular.one('card_memberships', member.id) // should not be member id but membership id!!!!!
    .remove( { card_id: _cardData.currentCard.id, member_id: member.id } )
    .then( function(membership) {
      for ( var m = 0; m < _cardData.currentCard.members.length; m++ ) {
        if ( _cardData.currentCard.members[m].id === membership.member.id ) {
          _cardData.currentCard.members.splice(m,1);
        }
      }
      var description = member.username + " was removed as member."
      ActivityService.createActivity( member, _cardData.currentCard, description)
    });
  }

  return obj;
}]);
