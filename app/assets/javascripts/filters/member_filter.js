// A filter to keep only kittens marked "playful"
djello.filter('memberOK', function() {

  // `activatePlayfulFilter` is a boolean the user
  //    can set in the DOM to turn on this filter
  return function( collection, otherCollection ) {

    var filteredCollection = []

    angular.forEach( collection, function( potentialMember ){
      var ok = true;
      angular.forEach( otherCollection, function( actualMember ) {
        if ( potentialMember.username === actualMember.username ) {
          ok = false;
        }
      })
      if ( ok ) {
        filteredCollection.push( potentialMember );
      }
    })

    return filteredCollection;

  };
});
