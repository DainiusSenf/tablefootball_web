angular.module('addGame', ['ngMaterial'])
.controller('AddGameCTRL', function($scope, $http) {
	getUsers(); 
	function getUsers(){
		$http.get("http://localhost/myApp-git/js/php/getUsers.php").success(function(data){
			console.log(data)
		$scope.users = data;
		console.log($scope.users);
		});
	};
	
	$scope.submit = function () {
		$query = "js/php/addGame.php?player1=" + $scope.player1+"&player2=" + $scope.player2+"&player3=" + $scope.player3+
		+ "$player4=" + $scope.player4 + "$score1=" + $scope.score1 + "$score2=" + $scope.score2;
		$http.post($query).success(function(data){
			console.log(data);
		  });
	  };
	
 

});