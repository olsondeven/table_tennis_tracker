angular.module("app").controller("matchStatsCtrl", function($scope, $stateParams, mainService, $rootScope) {
    $scope.game = mainService.getGame();
    if ($scope.game.matchWinner === "player1") {
        $scope.winner = $scope.game.player1;
        $scope.loser = $scope.game.player2;
    } else {
        $scope.winner = $scope.game.player2;
        $scope.loser = $scope.game.player1;
    }
    //var for d3.js
    var width = "100%";
    var height = "100%";
    var maxNum = null;
    // var testArray = [0,12,10,0,32,30,0];
    // var testArrayColor = ["black","blue",'red','black','blue','red','black'];
    var testArray = [0];
    var testArrayColor = ["black"];

    // function splitStatsWinner(){
    //   for(var i = $scope.game.gameScoreCollection.length-1; i>=0; i--){
    //     testArray.push($scope.game.gameScoreCollection[i].winScore);
    //     testArray.push($scope.game.gameScoreCollection[i].lossScore);
    //     testArray.push(0);
    //     //push correct color to array
    //     if($scope.game.gameScoreCollection[i].winner === "player1"){
    //       testArrayColor.push($scope.game.player1.color);
    //       testArrayColor.push($scope.game.player2.color);
    //       testArrayColor.push("black");
    //     }else{
    //       testArrayColor.push($scope.game.player2.color);
    //       testArrayColor.push($scope.game.player1.color);
    //       testArrayColor.push("black");
    //     }
    //     // console.log(i);
    //   }
    //   maxNum = Math.max.apply(null, testArray);
    //
    // }
    // splitStatsWinner();
    function splitStatsWinner(){
      for(var i = $scope.game.gameScoreCollection.length-1; i>=0; i--){
        if($scope.game.gameScoreCollection[i].winner === 'player1'){
          testArray.push($scope.game.gameScoreCollection[i].winScore);
          testArray.push($scope.game.gameScoreCollection[i].lossScore);
          testArray.push(0);
        }else{
          testArray.push($scope.game.gameScoreCollection[i].lossScore);
          testArray.push($scope.game.gameScoreCollection[i].winScore);
          testArray.push(0);
        }
        //push correct color to array
        testArrayColor.push($scope.game.player1.color);
        testArrayColor.push($scope.game.player2.color);
        testArrayColor.push("black");
        // console.log(i);
      }
      maxNum = Math.max.apply(null, testArray);

    }
    splitStatsWinner();



    //create scale
    //declare width and height, let data declare this
    var widthScale = d3.scaleLinear()
      .domain([0,maxNum+1])//smallest value and largest value
      .range([0,width]);//0 to the width or height of graph
    //gradient for bars
    // var color = d3.scaleLinear()
    //   .domain([0,45])
    //   .range(["blue","red"]);

//Full match graph
    var canvasMatch = d3.select(".match-graph-cont-complete")
      .append("svg")
      .attr("width",width)
      .attr("height",height)
      .attr("style","border: 1px solid red");

    var winningBars = canvasMatch.selectAll("rect")
      .data(testArray)
      .enter()//this method returns placeholders for each data elements uses cb fn in attr
        .append("rect")
        // .attr("width", function(element){return element * 10;})
        .attr("width", function(element){return widthScale(element);})
        .attr("height", (50/($scope.game.selectMatch/2)))
        .attr("y", function(d,i){return i*(50/($scope.game.selectMatch/2));})//this offsets bars by 100px
        .data(testArrayColor)
        // .attr("fill", function(d){console.log(d);return d;});
        .attr("fill", function(d){return d;});


//     //create canvas for loser graph
//     var canvas = d3.select(".match-graph-cont-loser")
//       .append("svg")
//       .attr("width",width)
//       .attr("height",height);
//     //data for loser stats
//     var dataArray = [0,20,40,50,70];
//     //display data on graph
//     var bars = canvas.selectAll("rect")
//             .data(dataArray)
//             .enter()//this method returns placeholders for each data elements uses cb fn in attr
//               .append("rect")
//               // .attr("width", function(element){return element * 10;})
//               .attr("width", function(element){return widthScale(element);})
//               .attr("height", 50)
//               .attr("y", function(d,i){return i*100;})//this offsets bars by 100px
//               .attr("fill", $scope.loser.color);
//     //Charts D3.js
//     //d3.select(#) select by ref. to class, element/tag, or id ex("p"),(".hello-world"),("#red-box")
//
//     // d3.select("p").text("helloWorld");
//
//     //d3 append adds to element
//     //text will write text into that element
//
//     // d3.select(".match-graph-cont")
//     //   .append("p")
//     //   // .style("background-color","red")
//     //   .attr("style","color: blue; background-color: red;")
//     //   .text("is this working");
//
//
//     //to create svg you have to append to the document
//     var canvas = d3.select(".match-graph-cont-winner")
//         .append("svg")
//         // .style("background-color","red")
//         // .attr("style","width: 100%; height: 100%; color: blue; background-color: red;");
//         // .attr("style", "width: 100%; height: 100%;");
//         // .attr("style", "background-color:purple;")
//         .attr("width",width)
//         .attr("height",height);
//     //cx,cy is center x-axis and y-axis
//     //r is for radius
//     //fill is background color for svg
//     // var circle = canvas.append("circle")
//     //     .attr("cx", 250)
//     //     .attr("cy", 250)
//     //     .attr("r", 50)
//     //     .attr("fill", "red");
//     //
//     // var line = canvas.append("line")
//     //     .attr("x1", 0)
//     //     .attr("y1", 100)
//     //     .attr("x2", 400)
//     //     .attr("y2", 400)
//     //     .attr("stroke", "green")
//     //     .attr("stroke-width", 10);
//     var dataArray = [20,40,50,70,600];
//     var bars = canvas.selectAll("rect")
//         .data(dataArray)
//         .enter()//this method returns placeholders for each data elements uses cb fn in attr
//           .append("rect")
//           .attr("width", function(element){return widthScale(element);})
//           .attr("height", 50)
//           .attr("y", function(d,i){return i*100;})//this offsets bars by 100px
//           .attr("fill", $scope.winner.color);
//
// //d3.js scale
//
//
//     // console.log(d3);
}); //closing
