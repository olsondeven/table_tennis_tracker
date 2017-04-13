'use strict';

angular.module('app', ['ui.router']).config(function ($stateProvider, $urlRouterProvider) {
  //default router
  //home page and landing page
  $stateProvider.state('home', {
    url: '/',
    templateUrl: './app/routes/home/homeTemp.html',
    controller: 'homeCtrl'
  }).state('flip', {
    url: '/flip',
    templateUrl: './app/routes/flip/flipTemp.html',
    controller: 'flipCtrl'
  }).state('player1', {
    url: '/player1',
    templateUrl: './app/routes/player1settings/player1settingsTemp.html',
    controller: 'player1settingsCtrl'
  }).state('player2', {
    url: '/player2',
    templateUrl: './app/routes/player2settings/player2settingsTemp.html',
    controller: 'player2settingsCtrl'
  }).state('game', {
    url: '/game',
    templateUrl: './app/routes/game/gameTemp.html',
    controller: 'gameCtrl'
  }).state('matchStats', {
    url: '/matchStats',
    templateUrl: './app/routes/matchStats/matchStatsTemp.html',
    controller: 'matchStatsCtrl'
  }).state('type', {
    url: '/type',
    templateUrl: './app/routes/type/typeTemp.html',
    controller: 'typeCtrl'
  }).state('match', {
    url: '/match',
    templateUrl: './app/routes/match/matchTemp.html',
    controller: 'matchCtrl'
  }).state('point', {
    url: '/point',
    templateUrl: './app/routes/point/pointTemp.html',
    controller: 'pointCtrl'
  });

  $urlRouterProvider.otherwise('/');
}); //closing
'use strict';

angular.module('app').service('mainService', function ($http, $state) {
    //info for singles games
    var game = {
        startDate: null, //date stamp
        endDate: null,
        selectPoint: 11, //
        selectMatch: 3,
        selectType: null,
        player1: {
            name: "Player1",
            curSer: false,
            matchScore: 0,
            gameScore: 0,
            foul: null,
            let: null,
            hasAcct: false,
            color: null
        },
        player2: {
            name: "Player2",
            curSer: false,
            matchScore: 0,
            gameScore: 0,
            foul: null,
            let: null,
            hasAcct: false,
            color: null
        },
        matchWinner: null,
        matchLoser: null,
        totalPoint: 0,
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
            selectedService: null,
            mate1: null,
            mate2: null
        }
    };
    //get/set/update/delete from controllers and views
    this.getGame = function () {
        return game;
    };
    //set game settings
    this.setGame = function (prop, val) {
        if (prop === 'player1.name') {
            game.player1.name = val;
        } else if (prop === 'player1.color') {
            game.player1.color = val;
        } else if (prop === 'player2.name') {
            game.player2.name = val;
        } else if (prop === 'player2.color') {
            game.player2.color = val;
        } else {
            game[prop] = val;
        }
    };
    //set service
    this.setStartServe = function (prop) {
        if (prop === "player1") {
            game.startSer = "player1";
            game.player1.curSer = true;
        } else {
            game.startSer = "player2";
            game.player2.curSer = true;
        }
    };
    //add to personal score
    this.addPlayerScore = function (player) {
        //adding up points

        if (player === 'player1') {
            game.player1.gameScore++;
            game.totalPoint = game.player1.gameScore + game.player2.gameScore;
            serviceSwitch();
        }
        if (player === 'player2') {
            game.player2.gameScore++;
            game.totalPoint = game.player1.gameScore + game.player2.gameScore;
            serviceSwitch();
        }

        if (game.player1.gameScore > game.player2.gameScore + 1 && game.player1.gameScore >= game.selectPoint) {
            return addMatch("player1");
        }
        if (game.player2.gameScore > game.player1.gameScore + 1 && game.player2.gameScore >= game.selectPoint) {
            return addMatch("player2");
        }
    };
    //add match if won game
    function addMatch(player) {
        if (player === 'player1') {
            game.player1.matchScore++;
            swal(game.player1.name + " won the game");
        } else if (player === "player2") {
            game.player2.matchScore++;
            swal(game.player2.name + " won the game");
        }

        //decide on match winner
        if (game.player1.matchScore > game.selectMatch - game.selectMatch % 2 - 1) {
            game.matchWinner = "player1";
            return matchFinished();
        }

        if (game.player2.matchScore > game.selectMatch - game.selectMatch % 2 - 1) {
            game.matchWinner = "player2";
            return matchFinished();
        }
        resetGame();
    }

    //switch service
    function serviceSwitch() {
        if (game.selectPoint === 11 && game.totalPoint >= 20) {
            game.player1.curSer = !game.player1.curSer;
            game.player2.curSer = !game.player2.curSer;
        } else if (game.selectPoint === 11 && game.totalPoint % 2 === 0) {
            game.player1.curSer = !game.player1.curSer;
            game.player2.curSer = !game.player2.curSer;
        }
        //if game point is set to 21
        if (game.selectPoint === 11 && game.totalPoint >= 40) {
            game.player1.curSer = !game.player1.curSer;
            game.player2.curSer = !game.player2.curSer;
        } else if (game.selectPoint === 21 && game.totalPoint % 5 === 0) {
            game.player1.curSer = !game.player1.curSer;
            game.player2.curSer = !game.player2.curSer;
        }
    }
    //reset for new game
    function resetGame() {
        game.player1.gameScore = 0;
        game.player2.gameScore = 0;
        if (game.startSer === 'player1') {
            swal(game.player2.name + " serves first");
            game.startSer = 'player2';
            game.player1.curSer = false;
            game.player2.curSer = true;
        } else {
            swal(game.player1.name + " serves first");
            game.startSer = 'player1';
            game.player1.curSer = true;
            game.player2.curSer = false;
        }
    }
    //finish match
    function matchFinished() {
        swal(game.matchWinner + " Won the match");
        $state.go('matchStats');
    }
}); //closing
"use strict";
"use strict";
"use strict";
'use strict';

angular.module('app').controller('flipCtrl', function ($scope, $stateParams, mainService, $rootScope) {
  $scope.game = mainService.getGame();
  $scope.random = function () {
    // let ranNum = Math.floor(Math.random()*2+1);
    if (Math.floor(Math.random() * 2 + 1) === 1) {
      mainService.setStartServe('player1');
      swal($scope.game.player1.name + " serves first");
      //date
    } else {
      mainService.setStartServe('player2');
      swal($scope.game.player2.name + " serves first");
      //date
    }
  };
  $scope.selectService = function (val) {
    console.log(val);
    mainService.setStartServe(val);
    if (val === 'player1') {
      swal($scope.game.player1.name + " serves first");
    } else {
      swal($scope.game.player2.name + " serves first");
    }
    //date
  };
}); //closing
'use strict';

angular.module('app').controller('gameCtrl', function ($scope, $stateParams, mainService, $rootScope) {
  $scope.setPlayerScore = function (prop) {
    mainService.addPlayerScore(prop);
    $scope.game = mainService.getGame();
  };
  $scope.game = mainService.getGame();
}); //closing
'use strict';

angular.module('app').controller('homeCtrl', function ($scope, $stateParams, mainService, $rootScope) {
  $scope.test = "HELLO WORLD";
  $scope.login = function (user, pass) {};
}); //closing
'use strict';

angular.module('app').controller('matchCtrl', function ($scope, $stateParams, mainService, $rootScope) {
  $scope.selectMatch = function (val) {
    mainService.setGame('selectMatch', val);
  };
}); //closing
"use strict";

angular.module("app").controller("matchStatsCtrl", function ($scope, $stateParams, mainService, $rootScope) {
  $scope.test = "help";
}); //closing
'use strict';

angular.module('app').controller("player1settingsCtrl", function ($scope, $state, $stateParams, mainService, $rootScope) {
  var color = null;
  $scope.colorArray = ['red', 'blue', 'green', 'purple', 'yellow'];
  $scope.selectColor = function (val) {
    color = val;
    console.log(color);
  };
  $scope.selectName = function (val) {
    console.log('fired', color, val);
    if (!color || !val) {
      return swal('Please select color and choose name');
    } else {
      mainService.setGame('player1.name', val);
      mainService.setGame('player1.color', color);
      $state.go('player2');
    }
  };
}); //closing
'use strict';

angular.module('app').controller("player2settingsCtrl", function ($scope, $state, $stateParams, mainService, $rootScope) {
  var color = null;
  $scope.colorArray = ['red', 'blue', 'green', 'purple', 'yellow'];
  $scope.selectColor = function (val) {
    color = val;
    console.log(color);
  };
  $scope.selectName = function (val) {
    console.log('fired', color, val);
    if (!color || !val) {
      return swal('Please select color and choose name');
    } else {
      mainService.setGame('player2.name', val);
      mainService.setGame('player2.color', color);
      $state.go('flip');
    }
  };
}); //closing
'use strict';

angular.module('app').controller('pointCtrl', function ($scope, $stateParams, mainService, $rootScope) {
  $scope.selectPoint = function (val) {
    mainService.setGame('selectPoint', val);
    if (val === 11) {
      mainService.setGame('switchSer', 2);
    } else {
      mainService.setGame('switchSer', 5);
    }
  };
}); //closing
'use strict';

angular.module('app').controller('typeCtrl', function ($scope, $stateParams, mainService, $rootScope) {
  $scope.setType = function (val) {
    // console.log(val, "fired");
    mainService.setGame("selectType", val);
  };
}); //closing
//# sourceMappingURL=bundle.js.map
