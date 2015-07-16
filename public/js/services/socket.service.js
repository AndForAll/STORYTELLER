var angular = angular || {};

angular.module('app.socket', [])
.factory('socket', function ($rootScope, utils) {
        var socket = io.connect();
    return {
      on: function (eventName, callback) {
        socket.on(eventName, function () {
          var args = arguments;
          $rootScope.$apply(function () {
            callback.apply(socket, args);
          });
        });
      },
      emit: function (eventName, data, callback) {
        socket.emit(eventName, data, function () {
          var args = arguments;
          $rootScope.$apply(function () {
            if (callback) {
              callback.apply(socket, args);
            }
          });
        })
      },
      //////WORKING
      CrteRm: function(data){
        if($rootScope.global.room == null){
          console.log('WE GONNA CREATE A ROOOOOOOm');
          var rmKey = utils.createRmId(4);

          socket.emit('send:rmcreate', {
            data:data,
            rmKey:rmKey
          }, function(res) {
            console.log('create room callback');
            console.log(res);
            $rootScope.global.room = res;
            return res;
          });
        }else {
          return $rootScope.global.room;
        };
        // return rmKey;
      }
  };
  });
