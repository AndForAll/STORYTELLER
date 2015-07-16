var angular = angular || {};

angular.module('app.home.controller', [])
.controller('HomeCtrl', function($scope, $rootScope, $stateParams, socket, winServe) {
  ///////////////////
  //////V A R S/////
  $scope.title = 'STORYTELLER';
  $scope.fables = $rootScope.global.fables;

  /////////////////////////////////
  //////S O C K E T  S T U F F/////
  socket.on('init', function(data){
    console.log(data);
  });

  //////////////////////////////////////////////
  //////F U N C T I O N S  F O R  S C O P E/////
  $scope.startPlayState = function(id){
    console.log('IT WAS CLICKED');
    console.log(id);
    //open menu
    var windowProfile = 'width=800,height=600,left =300,top =100';
    var url = 'http://localhost:3000/#/'+id+'/';
    var name = 'main';

    //WORKS FUCK YES
    winServe.openWin(url,name,windowProfile);
    //works
    // $scope.window = window.open(url,'mainWin','toolbar=0,scrollbars=0,location=0,statusbar=0,menubar=0,resizable=0,'+windowProfile);
  };

  //testing close all open windows
  //WORKS!!!!
  $scope.closeWindows= function(){
    console.log('close windows');
    winServe.closeAll($rootScope.global.openWins);
  };

  // // //so that on close it will close child windows
  // window.onclose = function(){
  //   console.log('ON CLOSE');
  //   winServe.closeAll($rootScope.global.openWins);
  // }

});
