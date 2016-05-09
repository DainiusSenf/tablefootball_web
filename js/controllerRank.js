angular.module('rankas', ['ngMaterial'])


.controller('RankCtrl', function($scope,$http) {
	
  
  
	getUsers(); 
	function getUsers(){
		$http.get("js/php/getUsers.php").success(function(data){
			console.log(data)
		$scope.tasks = data;
		console.log($scope.tasks)
		});
	};
});