'use strict';

angular.module('app', ['ui.router']).config(function ($stateProvider, $urlRouterProvider) {
  //default router
  //home page and landing page
  $stateProvider.state('home', {
    url: '/',
    templateUrl: './app/routes/home/homeTemp.html',
    controller: 'homeCtrl'
  });

  $urlRouterProvider.otherwise('/');
}); //closing
'use strict';

angular.module('app').service('mainService', function ($http) {
  //info for singles games
  var game = {
    date: null, //date stamp
    selectPoint: null, //
    selectMatch: null,
    selectType: null,
    player1: {
      name: null,
      gameScore: null,
      matchScore: null,
      foul: null,
      let: null,
      hasAcct: false
    },
    player2: {
      name: null,
      gameScore: null,
      matchScore: null,
      foul: null,
      let: null,
      hasAcct: false
    },
    matchWinner: null,
    matchLoser: null,
    curSer: null,
    startSer: null,
    save: false,
    login: {
      currentUser: null
    },
    switchSer: null,
    tiebreaker: null,
    team1: {
      teamName: null,
      foul: null,
      let: null,
      gameScore: null,
      matchScore: null,
      hasAcct: false,
      selectedSErvice: null,
      mate1: null,
      mate2: null
    },
    team2: {
      teamName: null,
      foul: null,
      let: null,
      gameScore: null,
      matchScore: null,
      hasAcct: false,
      selectedSErvice: null,
      mate1: null,
      mate2: null
    }
  };
  //get/set/update/delete from controllers and views
  this.getGame = function () {
    return game;
  };
  this.setGame = function (target) {};
}); //closing
'use strict';

angular.module('app').controller('flipCtrl', function ($scope, $stateParams, mainService, $rootScope) {
  $scope.test = "HELLO WORLD";
}); //closing
'use strict';

angular.module('app').controller('gameCtrl', function ($scope, $stateParams, mainService, $rootScope) {
  $scope.test = "HELLO WORLD";
}); //closing
'use strict';

angular.module('app').controller('homeCtrl', function ($scope, $stateParams, mainService, $rootScope) {
  $scope.test = "HELLO WORLD";
}); //closing
'use strict';

angular.module('app').controller('matchCtrl', function ($scope, $stateParams, mainService, $rootScope) {
  $scope.test = "HELLO WORLD";
}); //closing
'use strict';

angular.module('app').controller('pointCtrl', function ($scope, $stateParams, mainService, $rootScope) {
  $scope.test = "HELLO WORLD";
}); //closing
//# sourceMappingURL=bundle.js.map
