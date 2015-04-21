var app = angular.module("sportApp", ['ui.router', 'templates', 'Devise','ngMap']);

app.config(['$stateProvider', '$urlRouterProvider','$locationProvider',
  function($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'appJS/home/_home.html',
      controller: 'homeCtrl'
    })
    .state('createbussiness', {
      url: '/dang-ky-doanh-nghiep',
      templateUrl: 'appJS/createbussiness/_createbussiness.html',
      controller: 'createbussinessCtrl'
    })
    .state('searchresult',{
      url: '/ket-qua-tim-kiem',
      templateUrl: 'appJS/searchresult/_searchresult.html',
      controller: 'searchresultCtrl'
    })
    .state('booking',{
      url: '{user.username}',
      templateUrl: 'appJS/booking/_booking.html',
      controller: 'bookingCtrl'
    });
  //Khoi phuc
  // $urlRouterProvider.otherwise('/');
}]);
