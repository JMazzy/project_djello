djello.factory('ActivityService', [ 'Restangular', '$state', function(Restangular, $state){
  var obj = {};

  obj.createActivity = function(user, card, description) {
    Restangular.all('activities')
    .post( { user_id: user.id, card_id: card.id, description: description } )
    .then( function( newActivity ) {
      card.activities.push(newActivity);
    });
  };

  return obj;
}]);
