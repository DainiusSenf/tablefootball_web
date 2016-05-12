angular.module('rezultatai', ['ngMaterial'])
.controller('AppCtrl', function($scope,$http, $rootScope) {
  this.colorTiles = (function() {
    var tiles = [];
    for (var i = 0; i < 46; i++) {
      tiles.push({
        color: randomColor(i),
        colspan: 3,
        rowspan: 3
      });
    }
    return tiles;
  })();
  
  function randomColor(i) {
	 var colour = (i%2 == 0 ? '#d3d3d3' : '#ffffff');
    return colour;
  }
  
  //$scope.isAdmin = isAdmin();
  $scope.admin = function() {
	 if($rootScope.admin == "1")
		 return true;
	 return false;
  }
  
   $scope.deleteGame = function (gameId) {
		$http.post("js/php/deleteGame.php?gameId=" + gameId)
			.success(function(data){
				console.log(data);
				getGames();
			 });
	  };
  
 
	
	
	getGames(); 
	function getGames(){
		$http.get("js/php/getLastGames.php").success(function(data){
			console.log(data)
		$scope.games = data;
		});
	};

});