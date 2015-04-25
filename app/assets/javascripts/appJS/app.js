var app = angular.module("sportApp", ['ui.router', 'templates', 'Devise','ngMap']);

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
      url: '/{branch-url}',
      templateUrl: 'appJS/booking/_booking.html',
      controller: 'bookingCtrl'
    });
  //Khoi phuc
  // $urlRouterProvider.otherwise('/');
}]);
