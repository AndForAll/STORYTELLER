var angular = angular || {};

angular.module('app.main.play.controller', [])
.controller('MainPlayWindow', function($scope, $rootScope, $stateParams, socket, winServe) {
        console.log($scope.fable);
        console.log($stateParams);

        $scope.strytxt = $scope.fable.title
        $scope.var = '';

        $scope.testSocket = socket.CrteRm($scope.fable);
        console.log($scope.testSocket);
        console.log($rootScope.global);


        console.log($rootScope.global.counter);


        $scope.nextStep = function(){
        //   console.log($rootScope.global.counter);
          console.log('YOU PRESSED NEXT!');
          console.log($rootScope.global.counter);
          $scope.strytxt = $scope.fable.story[$rootScope.global.counter].main;
          $scope.var = $scope.fable.story[$rootScope.global.counter].var;
          $rootScope.global.counter = $rootScope.global.counter +1;
        }

        $scope.backStep = function(){
        //   console.log($rootScope.global.counter);
          console.log('YOU PRESSED BACK!');
          console.log($rootScope.global.counter);
          if($rootScope.global.counter > 0){
            $rootScope.global.counter = $rootScope.global.counter -1;
          }else {
            $rootScope.global.counter = 0;
          }
          $scope.strytxt = $scope.fable.story[$rootScope.global.counter].main;
          $scope.var = $scope.fable.story[$rootScope.global.counter].var;
        }

        $scope.moveWindow = function(xy, w, h, center){
          console.log('in moveWindow');
          if(w == 'full') {w = window.screen.availWidth - 40 };
          if(h == 'full') {h = window.screen.availWidth - 40 };

          if(center){
            var pos = winServe.winCenter(w,h);
            window.resizeTo(w,h);
            window.moveTo(pos.left,pos.top);
          }else {
            //get shit
            var pos = winServe.winPos(xy,w,h,center);
            window.resizeTo(w,h);
            window.moveTo(pos.left,pos.top);
          }

        };

        $scope.moveWindow('mb','full',300,false);

        $scope.parentWin = window.opener;
        console.log($scope.parentWin);

        // if(window.opener && !window.opener.closed){
        //   console.log('change location');
        //   window.opener.location.href="http://a1.dspnimg.com/data/l/f9c24364d8f59796a2b0454f4faa5023_xMRiecgv_l.jpg";
        // }

        $scope.$watch(function(){
          console.log('WATCHING WINDOW OPENER');
          console.log(window.opener.closed);
          return window.opener.closed;
        }, function(){
          if(window.opener.closed == true){
            // window.close();
            console.log('IN CLOSED');
            console.log(window.opener.closed);
          }
        });

        //
        // $scope.parentWin.onclose = function (){
        //   console.log('PARENT WINDOW CLOSED');
        // };
});
