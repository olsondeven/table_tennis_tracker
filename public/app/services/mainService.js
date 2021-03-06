angular.module('app').service('mainService', function($http,$state) {
//info for singles games
    let pointScoreIndex = 0;
    let gameScoreIndex = 0;
    let matchScoreIndex = 0;
    let game = {
            startDate: null, //date stamp
            endDate: null,
            selectPoint: 11, //
            selectMatch: 3,
            selectType: 'single',
            matchWinner: null,
            matchLoser: null,
            totalPoint: 0,
            startSer: null,
            save: false,
            gameScoreCollection: [{winner:null, winScore:0, loser:null, lossScore:0, tracker:[]}],
            login: {
              currentUser: null
            },
            player1: {
                name: "Player1",
                curSer: false,
                matchScore: 0,
                gameScore: 0,
                foul: null,
                let: null,
                hasAcct: false,
                color: "red",//needs to be null
                pointsWon: [[]],
                pointsLoss: [[]]
            },
            player2: {
                name: "Player2",
                curSer: false,
                matchScore: 0,
                gameScore: 0,
                foul: null,
                let: null,
                hasAcct: false,
                color: "blue",//needs to be null
                pointsWon: [[]],
                pointsLoss: [[]]
            },
            team1: {
                teamName: null,
                foul: null,
                let: null,
                gameScore: null,
                matchScore: null,
                hasAcct: false,
                mate1: null,
                color: null,
                mate2: null,
                curSer: false
            },
            team2: {
                teamName: null,
                foul: null,
                let: null,
                color: null,
                gameScore: null,
                matchScore: null,
                hasAcct: false,
                mate1: null,
                mate2: null,
                curSer: false
            }
        }
//get/set/update/delete from controllers and views
    this.getGame = function() {
            return game;
        }
//set game settings
    this.setGame = function(prop, val, player) {
            var phraseOne = new RegExp(/name/gi);
            var phraseTwo = new RegExp(/color/gi);
            if (prop.search(phraseOne) != -1) {
              game[player].name = val;
            }else if(prop.search(phraseTwo) != -1){
              game[player].color = val;
            }else{
              game[prop] = val;
            }
        }
//set service
    this.setStartServe = function(prop) {
            game.startDate = new Date();
            if (prop === "player1") {
                game.startSer = "player1";
                game.player1.curSer = true;
            } else if(prop === "player2") {
                game.startSer = "player2";
                game.player2.curSer = true;
            }
            //doubles
            // if (prop === "team1") {
            //     game.startSer = "team1";
            //     game.team1.curSer = true;
            // } else if(prop === "team2"){
            //     game.startSer = "team2";
            //     game.team2.curSer = true;
            // }
            //doubles
        }
//add to personal score
//counter for index placement
    this.addPlayerScore = function(player) {
//adding up points
            let pushArr = {pointWin:null, pointDate:null, winSer:false};
            let pushTest = {time:null, service:false};

            if (player === 'player1') {
                pushArr.pointWin = game.player1.name;
                pushArr.pointDate = new Date();
                game.gameScoreCollection[gameScoreIndex].tracker.push(pushArr);
                if(game.player1.curSer){
                  game.gameScoreCollection[gameScoreIndex].tracker[pointScoreIndex].winSer = true;
                }


                game.player1.gameScore++;
                //test
                pushTest.time = new Date();
                if(game.player1.curSer === true){
                  pushTest.service = true;
                }
                pushTest.count = game.player1.gameScore;
                game.player1.pointsWon[gameScoreIndex].push(pushTest);

                if(pushTest.service != true){
                  pushTest.service = false;
                }
                game.player2.pointsLoss[gameScoreIndex].push(pushTest);
                //test
                game.totalPoint = game.player1.gameScore + game.player2.gameScore;
                serviceSwitch();
            }
            if (player === 'player2') {
                pushArr.pointWin = game.player2.name;
                pushArr.pointDate = new Date();
                //{winner:null, winScore:0, loser:null, lossScore:0, tracker:[]}
                game.gameScoreCollection[gameScoreIndex].tracker.push(pushArr);
                if(game.player2.curSer){
                  game.gameScoreCollection[gameScoreIndex].tracker[pointScoreIndex].winSer = true;
                }

                game.player2.gameScore++;
                //test
                pushTest.time = new Date();
                if(game.player2.curSer === true){
                  pushTest.service = true;
                }
                pushTest.count = game.player2.gameScore;
                game.player2.pointsWon[gameScoreIndex].push(pushTest);
                if(pushTest.service != true){
                  pushTest.service = false;
                }
                game.player1.pointsLoss[gameScoreIndex].push(pushTest);
                //test
                game.totalPoint = game.player1.gameScore + game.player2.gameScore;
                serviceSwitch();
            }

            if (game.player1.gameScore > (game.player2.gameScore + 1) && game.player1.gameScore > game.selectPoint-1) {
                return addMatch("player1");
            }
            if (game.player2.gameScore > (game.player1.gameScore + 1) && game.player2.gameScore > game.selectPoint-1) {
                return addMatch("player2");
            }
            pointScoreIndex++;
        }
//add match if won game
    function addMatch(player) {
        if (player === 'player1') {
            game.player1.matchScore++;
            game.gameScoreCollection[gameScoreIndex].winner = "player1";
            game.gameScoreCollection[gameScoreIndex].winScore = game.player1.gameScore;
            game.gameScoreCollection[gameScoreIndex].loser = "player2";
            game.gameScoreCollection[gameScoreIndex].lossScore = game.player2.gameScore;
            // game.gameScoreCollection.push(pushArr);
        } else if (player === "player2") {
            game.player2.matchScore++;
            game.gameScoreCollection[gameScoreIndex].winner = "player2";
            game.gameScoreCollection[gameScoreIndex].winScore = game.player2.gameScore;
            game.gameScoreCollection[gameScoreIndex].loser = "player1";
            game.gameScoreCollection[gameScoreIndex].lossScore = game.player1.gameScore;
            // game.gameScoreCollection.push(pushArr);
        }

//decide on match winner
        // if(game.player1.matchScore > (game.selectMatch-(game.selectMatch%2)-1)){
          if(game.player1.matchScore > (game.selectMatch/2)){
          game.matchWinner = "player1";
          game.matchLoser = "player2";
          return matchFinished();
        }

        // if(game.player2.matchScore > (game.selectMatch-(game.selectMatch%2)-1)){
            if(game.player2.matchScore > (game.selectMatch/2)){
          game.matchWinner = "player2";
          game.matchLoser = "player1";
          return matchFinished();
        }
        resetGame();
        let pushArr = {winner:null, winScore:0, loser:null, lossScore:0, tracker:[]};
        game.player1.pointsWon.push([]);
        game.player1.pointsLoss.push([]);
        game.player2.pointsWon.push([]);
        game.player2.pointsLoss.push([]);
        game.gameScoreCollection.push(pushArr);
    }

//switch service
    function serviceSwitch(index) {
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
        gameScoreIndex++;
        pointScoreIndex = 0; //for after looking at matchStats
        // gameScoreIndex = 0;
        // game.gameScoreCollection.push(pushArr);
        if (game.startSer === 'player1') {
            swal(game.player2.name + " serves first");
            game.startSer = 'player2';
            game.player1.curSer = false;
            game.player2.curSer = true;
        }else if (game.startSer === 'player2'){
            swal(game.player1.name + " serves first");
            game.startSer = 'player1';
            game.player1.curSer = true;
            game.player2.curSer = false;
        }
    }
//finish match
function matchFinished(){
  swal(game[game.matchWinner].name+" Won the match");
  game.endDate = new Date();
  console.log(game);
  $state.go('matchStats');
}
}); //closing
