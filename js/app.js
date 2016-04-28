'use strict';

var app = angular.module('BlankApp', ['ui.bootstrap', 'ui.router', 'ui.navbar', 'ngMaterial' , 'rezultatai', 'rankas', 'myPage', 'register','addGame']);

app.config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/home');
    
    $stateProvider
        
        // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
            url: '/home',
            templateUrl: 'views/home.html'
        })
        
        // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
        .state('about', {
            url: '/about',
            templateUrl: 'views/about.html'      
        })
		
		/*.state('login', {
            url: '/login',
            templateUrl: 'views/login.html'      
        })
		*/
		.state('score', {
            url: '/score',
            templateUrl: 'views/score-list.html',
			controller: 'AppCtrl as appCtrl'
        })
		
		.state('rankingas', {
            url: '/rankingas',
            templateUrl: 'views/rankingas.html',
			controller: 'RankCtrl'			
        })
		
		.state('register', {
            url: '/register',
            templateUrl: 'views/register.html',
			controller: 'registerCtrl'		      
        })
		
		.state('rules', {
            url: '/rules',
            templateUrl: 'views/rules.html'      
        })
		
		.state('videos', {
            url: '/videos',
            templateUrl: 'views/videos.html'      
        })
		
		.state('photos', {
            url: '/photos',
            templateUrl: 'views/photos.html'      
        })
		
		.state('myPage', {
            url: '/myPage',
            templateUrl: 'views/myPage.html',
			controller: 'myPageCtrl'			
        })
		
		.state('addGame', {
            url: '/addGame',
            templateUrl: 'views/addGame.html',
			controller: 'AddGameCTRL'					
        })
})
		.controller('NavigationController', function($scope,$location,$http) {

		  $scope.tree = [{
			name: "Videos",
			link: "videos"
		  }, {
			name: "Photos",
			link: "photos"
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
				$http.get("js/php/login.php?username=" + $scope.username+"&password=" + $scope.password).success(function(data){
				if(data.length == 1){
					$scope.logedinValue = true;
					$scope.logedoutValue = false;
					alert("Login success");
				}
				else
					alert("Invalid login details");
			  });
			};
			
			
				
		});
