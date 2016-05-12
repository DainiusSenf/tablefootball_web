angular.module('addGame', ['ngMaterial'])
.controller('AddGameCTRL', function ($scope, $rootScope, $http) {
	getUsers();
	function getUsers() {
		$http.get("http://localhost/myApp-git/js/php/getUsers.php").success(function (data) {
			console.log(data)
			$scope.users = data;
			console.log($scope.users);
		});
	};
	$scope.isDisabled = function () {
		if ($scope.player1 == undefined || $scope.player2 == undefined || $scope.player3 == undefined || $scope.player4 == undefined ||
			$scope.score1 == undefined || $scope.score2 == undefined) {
			return false;
		} else {
			return true;
		}
	}

	$scope.submit = function () {
		$query = "js/php/addGame.php?player1=" + $scope.player1 + "&player2=" + $scope.player2 + "&player3=" + $scope.player3
			 + "&player4=" + $scope.player4 + "&score1=" + $scope.score1 + "&score2=" + $scope.score2;

		if ($scope.player1 == undefined || $scope.player2 == undefined || $scope.player3 == undefined || $scope.player4 == undefined ||
			$scope.score1 == '' || $scope.score2 == '' || $scope.score1 == undefined || $scope.score2 == undefined) {
			alert("All fields must be filled");
			return;
		}

		if ($scope.player1 != $scope.player2 && $scope.player1 != $scope.player3 && $scope.player1 != $scope.player4
			 && $scope.player2 != $scope.player3 && $scope.player2 != $scope.player4
			 && $scope.player3 != $scope.player4) {
			$http.post($query).success(function (data) {
				console.log(data);
				if ($scope.score1 == $scope.score2)
					winnerTeam = 0;
				else if ($scope.score1 > $scope.score2)
					winnerTeam = 1;
				else
					winnerTeam = 2;
				getPlayers();
				

			});
		} else {
			alert("Same player can't be selected twice");
		}

	};
	var winnerTeam,
	player1newElo,
	player2newElo,
	player3newElo,
	player4newElo,
	player1eloChange,
	player2eloChange,
	player3eloChange,
	player4eloChange;;
	
	function updatePlayerStatistic(player, elo) {
		
		$http.get("js/php/getPlayerStatistic.php?player=" + player).success(function(data){
			console.log("Player statistics");
			console.log(data);
			
			$scope.playerStatistic = data;
			if(data.length > 0){
				var oldELo3 = $scope.playerStatistic[0].highestElo;;
				var highestElo = getHighestElo(elo,oldELo3);
				var gamesCount = parseInt($scope.playerStatistic[0].gamesCount) + 1;
				if( winnerTeam == 1){
					if((player == $scope.player1 || player == $scope.player2)){
						var gamesWon = parseInt($scope.playerStatistic[0].gamesWon)+ 1;
						var gamesLost = $scope.playerStatistic[0].gamesLost;
						var winStreak = getWinStreak(true,$scope.playerStatistic[0].winStreak);
					} else {
						var gamesWon = $scope.playerStatistic[0].gamesWon;
						var gamesLost = parseInt($scope.playerStatistic[0].gamesLost)+ 1;
						var winStreak = getWinStreak(false,$scope.playerStatistic[0].winStreak);
					}
				} else if( winnerTeam == 2){
					if((player == $scope.player3 || player == $scope.player4)){
						var gamesWon = parseInt($scope.playerStatistic[0].gamesWon) + 1;
						var gamesLost = $scope.playerStatistic[0].gamesLost;
						var winStreak = getWinStreak(true,$scope.playerStatistic[0].winStreak);
					} else {
						var gamesWon = $scope.playerStatistic[0].gamesWon;
						var gamesLost = parseInt($scope.playerStatistic[0].gamesLost) + 1;
						var winStreak = getWinStreak(false,$scope.playerStatistic[0].winStreak);
					}
				} else {
					var winStreak = getWinStreak(false,$scope.playerStatistic[0].winStreak);
				}
				var oldLowestElo = $scope.playerStatistic[0].lowestElo;
				var lowestElo = getLowestElo(elo,oldLowestElo);
				var winRate = getWinRate(gamesCount,gamesWon);
				var highestRank = getHighestRank(player);
				
				$query = "js/php/updatePlayerStatistic.php?player=" + player + 
				"&highestElo=" + highestElo + "&lowestElo=" + lowestElo + "&gamesCount=" + gamesCount + "&gamesWon=" + gamesWon + "&gamesLost=" + gamesLost +"&winRate=" + winRate +"&winStreak=" + winStreak+"&highestRank=" + highestRank;
				$http.post($query).success(function (data) {
					console.log(data);
				});
			} else {
				$query = "js/php/createPlayerStatistic.php?player=" + player + 
				"&highestElo=" + elo + "&lowestElo=" + elo + "&gamesCount=" + 0 + "&gamesWon=" + 0 + "&gamesLost=" + 0 +"&winRate=" + 0 +"&winStreak=" + 0;
				$http.post($query).success(function (data) {
					console.log("created statistic");
					console.log(data);
					if(data.length > 0)
						updatePlayerStatistic(player,elo);
				});
				
				
			}
			
		});
		
	}
	
	function getHighestRank(player){
		for(var i=0;i < $scope.users.length;i++){
			if(player == $scope.users[i].username)
				return i+1;
		}
		return 0;
	};
	
	function getWinRate(totalGames, gamesWon){
		return gamesWon / totalGames;
	};
	
	function getLowestElo(newElo, oldElo2){
		return newElo < oldElo2 ? newElo : oldElo2;
	};
	
	function getHighestElo(newElo, oldElo3){
		return newElo > oldElo3 ? newElo : oldElo3;
	};
	
	function getWinStreak(win,winStreak){
		if(win && winStreak >=0)
			return winStreak++;
		else if(!win && winStreak <=0)
			return winStreak--;
		return 0;
	};

	function updatePlayerElo(player, elo) {
		console.log(elo);
		$query = "js/php/updatePlayerElo.php?player=" + player + "&elo=" + elo;
		$http.post($query).success(function (data) {
			console.log(data);
		});
	}


	function getPlayers() {
		$query = "js/php/getPlayersElo.php?player1=" + $scope.player1 + "&player2=" + $scope.player2 + "&player3=" + $scope.player3
			 + "&player4=" + $scope.player4;
		$http.post($query).success(function (data) {
			if (winnerTeam == 0)
				draw(data);
			else if (winnerTeam == 1)
				firstTeamWon(data);
			else if (winnerTeam == 2)
				secondTeamWon(data);

			updatePlayerElo($scope.player1, player1newElo);
			updatePlayerElo($scope.player2, player2newElo);
			updatePlayerElo($scope.player3, player3newElo);
			updatePlayerElo($scope.player4, player4newElo);
			getUsers();
			updatePlayerStatistic($scope.player1, player1newElo);
			updatePlayerStatistic($scope.player2, player2newElo);
			updatePlayerStatistic($scope.player3, player3newElo);
			updatePlayerStatistic($scope.player4, player4newElo);
		});
	}

	function firstTeamWon(data) {
		for (var i = 0; i < data.length; i++) {
			if ($scope.player1 == data[i].username) {
				player1newElo = getELOwin(data[i].elo, 30, data[2].elo, data[3].elo);
			} else if ($scope.player2 == data[i].username) {
				player2newElo = getELOwin(data[i].elo, 30, data[2].elo, data[3].elo);
			} else if ($scope.player3 == data[i].username) {
				player3newElo = getELOlose(data[i].elo, 30, data[0].elo, data[1].elo);
			} else if ($scope.player4 == data[i].username) {
				player4newElo = getELOlose(data[i].elo, 30, data[0].elo, data[1].elo);
			}
		}

	}

	function secondTeamWon(data) {
		for (var i = 0; i < data.length; i++) {
			if ($scope.player1 == data[i].username) {
				player1newElo = getELOlose(data[i].elo, 30, data[2].elo, data[3].elo);
			} else if ($scope.player2 == data[i].username) {
				player2newElo = getELOlose(data[i].elo, 30, data[2].elo, data[3].elo);
			} else if ($scope.player3 == data[i].username) {
				player3newElo = getELOwin(data[i].elo, 30, data[0].elo, data[1].elo);
			} else if ($scope.player4 == data[i].username) {
				player4newElo = getELOwin(data[i].elo, 30, data[0].elo, data[1].elo);
			}
		}

	}

	function draw(data) {
		for (var i = 0; i < data.length; i++) {
			if ($scope.player1 == data[i].username) {
				player1newElo = getELOdraw(data[i].elo, 30, data[2].elo, data[3].elo);
			} else if ($scope.player2 == data[i].username) {
				player2newElo = getELOdraw(data[i].elo, 30, data[2].elo, data[3].elo);
			} else if ($scope.player3 == data[i].username) {
				player3newElo = getELOdraw(data[i].elo, 30, data[0].elo, data[1].elo);
			} else if ($scope.player4 == data[i].username) {
				player4newElo = getELOdraw(data[i].elo, 30, data[0].elo, data[1].elo);
			}
		}

	}

	function getELOdraw(oldElo, K, oppositePlayer1Elo, oppositePlayer2Elo) {
		return parseInt(oldElo) + K * (0.5 - expectedOutcome(oldElo, avarageTeamElo(oppositePlayer1Elo, oppositePlayer2Elo)));
	};

	function getELOlose(oldElo, K, oppositePlayer1Elo, oppositePlayer2Elo) {
		return parseInt(oldElo) + K * (0 - expectedOutcome(oldElo, avarageTeamElo(oppositePlayer1Elo, oppositePlayer2Elo)));
	};

	function getELOwin(oldElo, K, oppositePlayer1Elo, oppositePlayer2Elo) {
		return parseInt(oldElo) + K * (1 - expectedOutcome(oldElo, avarageTeamElo(oppositePlayer1Elo, oppositePlayer2Elo)));
	};

	function expectedOutcome(playerElo, otherTeamPlayersEloAvg) {
		return 1 / (1 + Math.pow(10, ((parseInt(otherTeamPlayersEloAvg) - parseInt(playerElo)) / 400)));
	};

	function avarageTeamElo(oppositePlayer1Elo, oppositePlayer2Elo) {
		var asas = (parseInt(oppositePlayer1Elo) + parseInt(oppositePlayer2Elo));
		return asas / 2;
	};

});