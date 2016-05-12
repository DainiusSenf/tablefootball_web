angular.module('myPage', ['ngMaterial', 'ui.router','ngRoute'])
.controller('myPageCtrl', function ($scope, $rootScope, $http, $location,$route, $routeParams) {
	
	$route.reload();
	
	$scope.reload = function() {
		getUsers();
		getGames();
	}
  
	this.colorTiles = (function () {
		var tiles = [];
		for (var i = 0; i < 5; i++) {
			tiles.push({
				color : randomColor(i),
				colspan : 3,
				rowspan : 3
			});
		}
		return tiles;
	})();
	var userName = $location.search();
	function randomColor(i) {
		var colour = (i % 2 == 0 ? '#d3d3d3' : '#ffffff');
		return colour;
	}

	function getCurrentRank() {
		for (var i = 0; i < $scope.users.length; i++) {
			if ($rootScope.logedinUserId == $scope.users[i].username){
				$scope.currentElo = $scope.users[i].elo;
				$scope.currentUserName = $scope.users[i].username;
				$scope.username = userName.userId == undefined ? $scope.currentUserName : userName.userId;
				return i;
			}
		}
		return 0;
	};
	
	$scope.admin = function() {
	 if($rootScope.admin == "1")
		 return true;
	 return false;
  }

	
	function getStatistics() {
		if (userName.userId == undefined) {
				console.log("username1");
			console.log($scope.currentUserName);
				$http.get("js/php/getPlayerStatistic.php?player=" + $scope.currentUserName).success(function (data) {
					console.log(data)
					$scope.playerStatistics = data;
				});
		} else {
			$http.get("js/php/getPlayerStatistic.php?player=" + userName.userId).success(function (data) {
					console.log(data)
					$scope.playerStatistics = data;
				});
		}
		
	};
	
	$rootScope.$on('$locationChangeSuccess', function(event){
        var url = $location.url(),
            params = $location.search();
			userName = params;
	})

	getUsers();
	function getUsers() {
		$http.get("http://localhost/myApp-git/js/php/getUsers.php").success(function (data) {
			console.log(data)
			$scope.users = data;
			$scope.currentRank = getCurrentRank();
			getStatistics();
		});
	};

	getGames();
	function getGames() {
		if (userName.userId == undefined) {
			$http.get("js/php/getLastGames.php?userId=" + $rootScope.logedinUserId).success(function (data) {
				console.log(data)
				$scope.games = data;
			});
		} else {
			$http.get("js/php/getLastGames.php?username=" + userName.userId).success(function (data) {
				console.log(data)
				$scope.games = data;
			});
		}

	};

});