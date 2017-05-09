angular.module("app").controller("matchStatsCtrl", function($scope, $stateParams, mainService, $rootScope) {
    $scope.game = mainService.getGame();
    if ($scope.game.matchWinner === "player1") {
        $scope.winner = $scope.game.player1;
        $scope.loser = $scope.game.player2;
    } else {
        $scope.winner = $scope.game.player2;
        $scope.loser = $scope.game.player1;
    }
    // console.log($scope.game.);
    //var for d3.js
    var width = "100%";
    var height = "100%";
    var maxNum = null;
    var serPoints = null;
    if($scope.game.selectPoint === 11){
      serPoints = 2;
    }else{
      serPoints = 5;
    }
    var gameScale = $scope.game.gameScoreCollection.length*2;
    // var gameScale = 6;
    console.log(gameScale);
    // var dataArray = [12,10,0,0,32,30,0,0,12,4]//,0,0,4,13,0,0,11,7,0,0,7,14,0,0,13,4];
    // var dataArrayColor = ["blue",'red','black','black','blue','red','black','black','blue','red']//,'black','black','blue','red','black','black','blue','red','black','black','blue','red','black','black','blue','red'];
    var dataArray = [];
    var dataArrayColor = [];
    //split up stats for display
    function splitStatsWinner(){
      for(var i = $scope.game.gameScoreCollection.length-1; i>=0; i--){
        if($scope.game.gameScoreCollection[i].winner === 'player1'){
          dataArray.push($scope.game.gameScoreCollection[i].winScore);
          dataArray.push($scope.game.gameScoreCollection[i].lossScore);
          dataArray.push(0);
          dataArray.push(0);
        }else{
          dataArray.push($scope.game.gameScoreCollection[i].lossScore);
          dataArray.push($scope.game.gameScoreCollection[i].winScore);
          dataArray.push(0);
          dataArray.push(0);
        }
        //push correct color to array
        dataArrayColor.push($scope.game.player1.color);
        dataArrayColor.push($scope.game.player2.color);
        dataArrayColor.push("black");
        dataArrayColor.push("black");
        // console.log(i);
      }
      maxNum = Math.max.apply(null, dataArray);

    }
    splitStatsWinner();
    // for(var i = dataArray.length-1; i>=0; i--){
    console.log(dataArray);
    console.log(dataArrayColor);
      if(dataArray[dataArray.length-1] === 0 && dataArray[dataArray.length-2] === 0){
        dataArray.splice(dataArray.length-1,1);
        dataArray.splice(dataArray.length-1,1);
        dataArrayColor.splice(dataArrayColor.length-1,1);
        dataArrayColor.splice(dataArrayColor.length-1,1);
      }
    // }
    console.log(dataArray);
    console.log(dataArrayColor);
    //create scale
    //declare width and height, let data declare this


    // var canvasMatch = d3.select(".match-graph-cont-complete")
    //   .append("svg")
    //   .attr("width",width)
    //   .attr("height",height);
    //
    // var widthScale = d3.scaleLinear()
    //   .domain([0,maxNum+1])//smallest value and largest value
    //   .range([0,width]);//0 to the width or height of graph
    //
    //
    //
    //
    // var bottomScale = d3.scaleLinear()
    //   .domain([0,maxNum+1])
    //   .range([0,(parseFloat(canvasMatch.style("width").replace(/px/gi,'')))]);
    //
    // var axisMatch = d3.axisBottom()
    //   .ticks(maxNum/serPoints)
    //   .scale(bottomScale);
    //
    //   var testHeight = (parseFloat(canvasMatch.style("height").replace(/px/gi,'')));
    //   var testHeight2 = ((testHeight/gameScale)/2);
    //   console.log(testHeight2);
    //   var testHeight3 = (testHeight/gameScale);
    //   // testHeight = (testHeight/5)/2;
    //   console.log(testHeight);
    //
    //   // var correctWord = ((parseFloat(canvasMatch.style("height").replace(/px/gi,'')))-testHeight3).toString();
    //   var correctWord = null;
    //   if(gameScale === 3){
    //     correctWord = ((parseFloat(canvasMatch.style("height").replace(/px/gi,'')))-testHeight2).toString();
    //   }else{
    //     correctWord = ((parseFloat(canvasMatch.style("height").replace(/px/gi,'')))-testHeight3).toString();
    //   }
    //   console.log(correctWord);
    // canvasMatch.append("g").attr("transform","translate(2,"+correctWord+")").call(axisMatch);
    //
    // // canvasMatch.append("g").attr("transform","translate(6,30)").call(axisLeft(y));
    //
    // var winningBars = canvasMatch.selectAll("rect")
    //   .data(dataArray)
    //   .enter()//this method returns placeholders for each data elements uses cb fn in attr
    //     .append("rect")
    //     // .attr("width", function(element){return element * 10;})
    //     .attr("width", function(element){return widthScale(element);})
    //     // .attr("height", (100/($scope.game.selectMatch/2)))
    //     // .attr("y", function(d,i){return i*(100/($scope.game.selectMatch/2));})//this offsets bars by 100px
    //     .attr("height", (testHeight2))
    //     .attr("y", function(d,i){return i*(testHeight2);})//this offsets bars by 100px
    //     // .attr("transform","translate(2,-20)")
    //     .data(dataArrayColor)
    //     .attr("fill", function(d){return d;});

// var testDataWonArray = [
//   {count: 1, time: 10},
//   {count: 2, time: 22},
//   {count: 3, time: 15},
//   {count: 4, time: 65},
//   {count: 5, time: 70},
//   {count: 6, time: 18},
//   {count: 7, time: 12},
//   {count: 8, time: 40}
// ]
// console.log(testDataWonArray);
// testDataWonArray.sort(function(a,b){
//   return a.time-b.time;
// });
// console.log(testDataWonArray);
//line graphs
var firstArrayWin = $scope.game.player1.pointsWon[0];
// firstArrayWin.sort(function(a,b){
//   return a.time-b.time;
// })
// firstArrayWin = d3.timeParse("%L/%M/%I").apply(null,firstArrayWin.time);
var parseDate = d3.timeParse("%L/%M/%I");
firstArrayWin.forEach(function(element,index){
   delete element.service;
});
console.log(firstArrayWin);
var h = 400;
var w = 600;

// var maxDate = $scope.game.endDate;
// var minDate = $scope.game.startDate;
// var maxDate = d3.min(testDataWonArray,function(d){return d.time});
// var minDate = d3.max(testDataWonArray,function(d){return d.time});
var maxDate = d3.min(firstArrayWin,function(d){return d.time});
var minDate = d3.max(firstArrayWin,function(d){return d.time});
var maxPoint = d3.max(firstArrayWin,function(d){return d.count});
var minPoint = d3.min(firstArrayWin,function(d){return d.count});
// var minPoint = d3.min(testDataWonArray,function(d){return d.count});
// var maxPoint = d3.max(testDataWonArray,function(d){return d.count});
console.log(maxDate,minDate);
console.log(maxPoint,minPoint);


var y = d3.scaleLinear()
  .domain([0,maxPoint])
  .range([height,0]);
var x = d3.scaleTime()
  .domain([minDate,maxDate])
  .range([0,width]);
var yAxis = d3.axisLeft(y);
var xAxis = d3.axisBottom(x);

var svg = d3.select('main').append('svg')
  .attr('height','100%')
  .attr('width','100%')
  .attr('style','background-color: gray');

var chartGroup = svg.append('g')
  .attr('transform', 'translate(50,50)');//50 from left, 50 from the top

var line = d3.line()
  .x(function(d){return x(d.time);})
  .y(function(d){return y(d.count);});

chartGroup.append('path').attr('d',line(firstArrayWin));
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
window.onresize = function(event) {
  bottomScale = d3.scaleLinear()
    .domain([0,maxNum+1])
    .range([0,(parseFloat(canvasMatch.style("width").replace(/px/gi,'')))]);

  axisMatch = d3.axisBottom()
    .ticks(maxNum/serPoints)
    .scale(bottomScale);

  canvasMatch.call(axisMatch);
};
}); //closing
