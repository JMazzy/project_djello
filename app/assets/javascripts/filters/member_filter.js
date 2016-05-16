djello.filter('memberOK', function() {

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
