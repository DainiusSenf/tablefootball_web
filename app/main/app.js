'use strict';

var app = angular.module('BlankApp', ['ui.bootstrap', 'ui.router', 'ui.navbar', 'ngMaterial' , 'rezultatai', 'rankas', 'myPage', 'register','addGame']);

app.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/home');

    $stateProvider

        // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
            url: '/home',
            templateUrl: 'app/views/home/home.html'
        })

		.state('score', {
            url: '/score',
            templateUrl: 'app/views/gamesList/gamesList.html',
			      controller: 'AppCtrl as appCtrl'
        })

		.state('rank', {
            url: '/rank',
            templateUrl: 'app/views/rank/rank.html',
			      controller: 'RankCtrl'
        })

		.state('register', {
            url: '/register',
            templateUrl: 'app/views/register/register.html',
			      controller: 'registerCtrl'
        })

		.state('rules', {
            url: '/rules',
            templateUrl: 'app/views/rules/rules.html'
        })

		.state('videos', {
            url: '/videos',
            templateUrl: 'app/views/videos/videos.html'
        })

		.state('photos', {
            url: '/photos',
            templateUrl: 'app/views/photos.html'
        })

		.state('myPage', {
            url: '/myPage',
            templateUrl: 'app/views/myPage/myPage.html',
			         controller: 'myPageCtrl'
        })

		.state('addGame', {
            url: '/addGame',
            templateUrl: 'app/views/addGame/addGame.html',
			controller: 'AddGameCTRL'
        })
})
		.controller('NavigationController', function($scope,$rootScope,$location,$http) {

		  $scope.tree = [{
			name: "Videos",
			link: "videos"
		  }];

		  $scope.isActive = function(viewLocation) {
				return viewLocation === $location.path();
			};
			$scope.logedinValue = false;
			$scope.logedoutValue = true;

			 $scope.logedin = function() {
				$scope.logedoutValue = true;
				$scope.logedinValue = false;
			};

			 $scope.logedout = function() {
				$scope.logedinValue = true;
				$scope.logedoutValue = false;
				$scope.username = "";
				$scope.password = "";
			};

			 $scope.login = function() {
				$http.get("app/services/login.php?username=" + $scope.username+"&password=" + $scope.password).success(function(data){
				if(data.length == 1){
					$rootScope.logedinUserId = data[0].username;
					$rootScope.admin = data[0].admin;
					$scope.logedinValue = true;
					$scope.logedoutValue = false;
					alert("Login success");
				}
				else
					alert("Invalid login details");
			  });
			};



		});
