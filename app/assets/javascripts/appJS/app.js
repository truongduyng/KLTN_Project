var app = angular.module("sportApp", ['ui.router', 'templates', 'Devise','ngMap', 'ui.bootstrap']);

app.config(['$stateProvider', '$urlRouterProvider','$locationProvider',
  function($stateProvider, $urlRouterProvider, $locationProvider) {
    // $locationProvider.html5Mode(true);
    $stateProvider
    .state('home', {
      url: '',
      templateUrl: 'appJS/home/_home.html',
      controller: 'homeCtrl'
    })
    .state('booking',{
      url: '/:branch_url_alias',
      templateUrl: 'appJS/booking/_booking.html',
      controller: 'bookingCtrl',
      resolve: {
        branch: function($http, $stateParams){
          return $http.get("/"+$stateParams.branch_url_alias).success(function(data){
            return data;
         });
        }}
      })
  //Khoi phuc
  $urlRouterProvider.otherwise('home');
}]);
