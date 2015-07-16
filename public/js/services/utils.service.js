var angular = angular || {};

angular.module('app.utils.service', [])
.factory('utils', function(){
  return {
    // Util for finding video objct by it's id from an array
    findById: function(a, id){
      for (var i = 0; i < a.length; i++) {
        if (a[i].id == id) {
          return a[i];
        }
      }
      return null;
    },
    createRmId: function(n){
      return Math.random().toString(36).substr(2,n);
    }
  };
});
