angular.module('register', ['ngMaterial'])
.controller('registerCtrl', function($scope,$http) {
	
	 $scope.register = function () {
		$http.post("js/php/newUser.php?username=" + $scope.username+"&password=" + $scope.password+"&admin=0&email=" + $scope.email).success(function(data){
			console.log(data);
		  });
	  };

});