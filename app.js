
const app = angular.module('myApp', ["ngRoute"])



// const HomeController = function ($scope, $http) {

//   $scope.users = []
//   $scope.searchQuery = "";

//   console.log("sdfsdf");

//   $http.get('https://api.github.com/search/users?q=a')
//     .then(function (response) {
//       $scope.users = response.data.items;
//       console.log(response.data.items)
//     })
//     .catch(function (error) {
//       console.error('Error retrieving data:', error);
//     });


//   $scope.searchUser = function () {


//     $http.get(`https://api.github.com/search/users?q=${$scope.searchQuery}`)
//       .then(function (response) {
//         $scope.users = response.data.items;

//         console.log(response.data.items)
//       })
//       .catch(function (error) {
//         console.error('Error retrieving data:', error);
//       });
//   }
// }

// const UserController = function ($scope, $routeParams) {
//   console.log("hgvvyuh hvj hvj h");
//   $scope.user = $routeParams.userName;
// }



app.config([
  "$routeProvider",
  function ($routeProvider) {
    $routeProvider
    .when("/",{
      templateUrl:"home.html",
      controller:"HomeController"
    })
     .when("/profile/:userName", {
        templateUrl:"user.html",
        controller:"UserController",
    })
  }])
  app.controller("HomeController",
            ["$scope",
             "$http",
             "$rootScope",
            function ($scope, $http,$rootScope) {

              $rootScope.users = []
              $scope.searchQuery = "";
            
              console.log("sdfsdf");
            
              $http.get('https://api.github.com/search/users?q=a')
                .then(function (response) {
                  $rootScope.users = response.data.items;
                  //console.log(response.data.items)
                })
                .catch(function (error) {
                  console.error('Error retrieving data:', error);
                });
            
            
              $scope.searchUser = function () {
            
            
                $http.get(`https://api.github.com/search/users?q=${$scope.searchQuery}`)
                  .then(function (response) {
                    $rootScope.users = response.data.items;
                    console.log($scope.users)
                    
                  })
                  .catch(function (error) {
                    console.error('Error retrieving data:', error);
                  });
              }
            }
          ])
  app.controller("UserController",
      [ "$scope",
         "$routeParams",
         "$http",
         function ($scope, $routeParams,$http) {
           
           $scope.user = $routeParams.userName;
           $scope.details = {};
           
           $http.get(`https://api.github.com/users/${$scope.user}`)
           .then(function(response){
              $scope.details = response.data;
              console.log(response.data)    
           }).catch(function(e){
               console.log(e);
           })
            

        }
        
      ]);

// angular.module("myApp",["ngRoute"]).config([
//      $routeProvider, function($routeProvider){
//         $routeProvider.when("/something",{
//             template:'user.html',

//         })
//      }
// ])

