var angular = angular || {};

angular.module('myApp', ['ui.router',
  'app.router',
  'app.play.controller',
  'app.home.controller',
  'app.main.play.controller',
  'app.utils.service',
  'app.socket',
  'app.window.service'
  ])

  .run(function($rootScope, $state, $stateParams){
    console.log('RUN RUN RUN RUN');


    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
    //create a fables object so we can simulate having a database with them in
    $rootScope.global = {};
    $rootScope.global.fables = [{
      title: 'THE COUNTRY MAN & THE BAFFOON',
      id: 01,
      story: [{
        main: 'Once upon a',
        var: 'titty'
      },
      {
        main: 'There lived a',
        var: 'nipple'
      }]
    },{
      title: 'TORTOISE AND THE HARE',
      id: 02,
      story: [{
        main: 'Once upon a',
        var: 'titty'
      },
      {
        main: 'There lived a',
        var: 'nipple'
      }]
    }];

    $rootScope.global.openWins = {};
    $rootScope.global.openDialogs={};

  });
