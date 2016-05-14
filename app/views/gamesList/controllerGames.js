angular.module('rezultatai', ['ngMaterial'])
.controller('AppCtrl', function($scope,$http, $rootScope) {

  $scope.admin = function() {
	 if($rootScope.admin == "1")
		 return true;
	 return false;
  }

   $scope.deleteGame = function (gameId) {
		$http.post("app/services/deleteGame.php?gameId=" + gameId)
			.success(function(data){
				console.log(data);
				getGames();
			 });
	  };

	getGames();
	function getGames(){
		$http.get("app/services/getLastGames.php").success(function(data){
			console.log(data)
		$scope.games = data;
		});
	};

});
