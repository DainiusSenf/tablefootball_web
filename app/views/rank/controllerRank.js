angular.module('rankas', ['ngMaterial'])

.controller('RankCtrl', function($scope,$http) {

	getUsers();
	function getUsers(){
		$http.get("app/services/getUsers.php").success(function(data){
			console.log(data)
		$scope.users = data;
		});
	};
});
