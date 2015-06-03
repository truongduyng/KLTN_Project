var bussinessAdmin = angular.module('sportaBussinessAdmin', ["ui.router", 'templates', 'Devise', 'sporta.services', 'sporta.directives', 'sporta.filters', 'ngMap', 'ngStorage', 'ui.bootstrap', 'flash']);

bussinessAdmin.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state("home", {
      url: "",
      templateUrl: 'adminJS/bussinessAdmin/home/_home.html',
      controller: 'homeCtrl',
      resolve: {
        user: ['Auth',
          function(Auth) {
            return Auth.currentUser();
          }
        ],
        bussiness: ['bussinessService', function(bussinessSerivce) {
          return bussinessSerivce.get();
        }],
      }
    })

  .state('ticket_management', {
    url: '/quan-ly-ve/:branch_url_alias',
    templateUrl: 'adminJS/bussinessAdmin/tickets_management/_ticket.html',
    controller: 'ticketManageCtrl',
    resolve: {
      branch: function($http, $stateParams) {
        return $http.get("/" + $stateParams.branch_url_alias).success(function(data) {
          return data;
        });
      }
    }
  })

  .state('branch_management', {
    url: '/quan-ly-chi-nhanh/:branch_url_alias',
    templateUrl: 'adminJS/bussinessAdmin/branch_management/_branch_management.html',
    controller: 'branchManageCtrl',
    resolve: {
      branch: function($http, $stateParams) {
        return $http.get("/" + $stateParams.branch_url_alias).success(function(data) {
          return data;
        });
      }
    }
  })

  .state("new_branch", {
    url: '/them-moi-chi-nhanh',
    templateUrl: 'adminJS/bussinessAdmin/branch_management/information/new/_new.html',
    controller: 'BAnewBranchCtrl',
  });
}]);