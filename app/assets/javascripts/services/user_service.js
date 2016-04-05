djello.factory('UserService', [ 'Restangular', '$state', function(Restangular, $state){

  var obj = {};

  var _userData = {
    userList: [],

    getUserList: function() {
      return this.userList;
    },

    setUserList: function() {
      this.userList = Restangular.all('users')
      .getList().$object
    },
  }

  obj.getUserData = function() {
    return _userData;
  }

  return obj;

}]);
