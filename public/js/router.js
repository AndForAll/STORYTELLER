var angular = angular || {};

angular.module('app.router', [])
  .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('Home', {
        url: '/',
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl'
      })

      .state('Play', {
        // abstract: true,
        url:'/{id}/',
        templateUrl: 'views/play.html',
        controller: function($scope, $stateParams, utils, $rootScope, $state){
          console.log($stateParams);

          $scope.fable = utils.findById($rootScope.global.fables, $stateParams.id);
          $scope.title = $scope.fable.title;
          $rootScope.global.counter = 0;
          $state.go('Play.main');
        }
      })

      .state('Play.main',{
        //as a child of play & no url will display at /play
        url: 'play',
        views: {
          '': {
            templateUrl: 'views/play.main.html',
            controller:'MainPlayWindow'
          },
          'menu': {
            templateProvider: function(){
             return '<div class="button"><h1 class="menuIcon" ng-click="menuOpen()">|||</h1></div>';
            },
            controller:function($scope,$rootScope,winServe){
              $scope.menuOpen = function(){
                console.log('THAT WORKED');
                winServe.closeAll();
              }
            }
          }
        } // end of views
      })
    // Set default state
    $urlRouterProvider.otherwise('/');
  });
