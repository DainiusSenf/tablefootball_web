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
	
	$scope.submit = function ($scope) {
		$query = "js/php/addGame.php?player1=" + $scope.player1+"&player2=" + $scope.player2+"&player3=" + $scope.player3+
		+ "$player4=" + $scope.player4 + "$score1=" + $scope.score1 + "$score2=" + $scope.score2;
		if($scope.player1 != $scope.player2 && $scope.player1 != $scope.player3 && $scope.player1 != $scope.player4
			&& $scope.player2 != $scope.player3 && $scope.player2 != $scope.player4
			&& $scope.player3 != $scope.player4){
			console.log("food");
		} else {
			console.log("asd");
			console.log($scope.player1);
			console.log($scope.player2);
			console.log($scope.player3);
			console.log($scope.player4);
		}
		$http.post($query).success(function(data){
			console.log(data);
		  });
	  };
	
 

});