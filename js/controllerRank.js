angular.module('rankas', ['ngMaterial'])


.controller('RankCtrl', function($scope,$http) {
	
  this.players = (function() {
    var playersList = [];
    for (var i = 0; i < 12; i++) {
      playersList.push({
        place: i,
        score: i*3,
        name: "Jonas"
      });
    }
    return playersList;
  })();
  
  getTask(); // Load all available tasks
	function getTask(){
		$http.get("http://localhost/myApp/js/php/api.php").success(function(data){
			console.log(data)
		$scope.tasks = data;
		console.log($scope.tasks)
		});
	};
  
/*  getUsers();
  function getUsers() {
    // this is where the JSON from api.php is consumed
    $http.get('js/api.php').
        success(function(data) {
			console.log("success");
			console.log(data);

            // here the data from the api is assigned to a variable named users
            $scope.users = data;
        });
	};
*/

});