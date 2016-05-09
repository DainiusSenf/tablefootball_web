angular.module('myPage', ['ngMaterial','ui.router'])
.controller('myPageCtrl', function($scope,$rootScope,$http,$location) {
  this.colorTiles = (function() {
    var tiles = [];
    for (var i = 0; i < 5; i++) {
      tiles.push({
        color: randomColor(i),
        colspan: 3,
        rowspan: 3
      });
    }
    return tiles;
  })();
  var userName = $location.search();
	
  function randomColor(i) {
	 var colour = (i%2 == 0 ? '#d3d3d3' : '#ffffff');
    return colour;
  }
  
	getGames(); 
	function getGames(){
		if(userName == undefined){
			$http.get("js/php/getLastGames.php?userId="+$rootScope.logedinUserId).success(function(data){
				console.log(data)
			$scope.games = data;
			});
		} else {
			$http.get("js/php/getLastGames.php?username="+userName.userId).success(function(data){
				console.log(data)
			$scope.games = data;
			});
		}
		
	};

});