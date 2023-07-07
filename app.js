
const app = angular.module('myApp', ["ngRoute"])


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
              const per_page = 20;
              $scope.cur_page = 1;
  const url = `https://api.github.com/search/users?q=a&per_page=${per_page}&page=${$scope.cur_page}`;

              console.log("sdfsdf");
            
              $http.get(url)
                .then(function (response) {
                  $rootScope.users = response.data.items;
                    console.log($rootScope.users)
                    $scope.cur_page++;
                })
                .catch(function (error) {
                  console.error('Error retrieving data:', error);
                });
              
              window.addEventListener("scroll",() => {
                const {scrollTop,clientHeight,scrollHeight} = document.documentElement;
              
                const api_url = `https://api.github.com/search/users?q=${$scope.searchQuery.length === 0 ? "a" : $scope.searchQuery}&per_page=${per_page}&page=${$scope.cur_page}`
                
                if ( scrollTop +  clientHeight >= scrollHeight - 10) {
                    
                  $http.get(api_url)
                        .then(function (response) {
                             $rootScope.users = [...$rootScope.users,...response.data.items];
                             $scope.cur_page++;
                            console.log($rootScope.users)
                      })
                       .catch(function (error) {
                    console.error('Error retrieving data:', error);
                  });
                }
              
              
              });
            
    $scope.searchUser = function () {
         $scope.cur_page = 1;   
         const search_api_url = `https://api.github.com/search/users?q=${$scope.searchQuery}&per_page=${per_page}&page=${$scope.cur_page}`; 
          $http.get(search_api_url)
                  .then(function (response) {
                    $rootScope.users = response.data.items;
                    $scope.cur_page++;
                    console.log($rootScope.users)
                    
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
         "$rootScope",
         function ($scope, $routeParams,$http,$rootScope) {
           
           $rootScope.user = $routeParams.userName;
           $rootScope.details = {};
           $rootScope.repos = [];
           window.scrollTo({top:0});
           $http.get(`https://api.github.com/users/${$scope.user}`)
           .then(function(response){
              $rootScope.details = response.data;
              console.log(response.data)
              return $http.get(response.data.repos_url);    
           }).then(function(response){
              console.log(response.data);  
             $rootScope.repos = response.data;
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

