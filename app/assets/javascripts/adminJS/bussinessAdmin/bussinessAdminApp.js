var app = angular.module('sportaBussinessAdmin', ["ui.router", 'templates', 'Devise', 'sporta.services', 'sporta.directives', 'sporta.filters', 'ngMap', 'ngStorage', 'ui.bootstrap', 'flash', 'chart.js']);


// //config cho Angularj-chartjs
// app.config(['ChartJsProvider', function (ChartJsProvider) {
//     // Configure all charts
//     ChartJsProvider.setOptions({
//       colours: ['#97BBCD', '#DCDCDC', '#F7464A', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360']
//     });
// }]);

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

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
      branch: ['$http','$stateParams',function($http, $stateParams) {
        return $http.get("/" + $stateParams.branch_url_alias).success(function(data) {
          return data;
        });
      }]
    }
  })

  .state('branch_management', {
    url: '/quan-ly-chi-nhanh/:branch_url_alias',
    templateUrl: 'adminJS/bussinessAdmin/branch_management/_branch_management.html',
    controller: 'branchManageCtrl',
    resolve: {
      branch: ['$http','$stateParams', function($http, $stateParams) {
        return $http.get("/" + $stateParams.branch_url_alias).success(function(data) {
          return data;
        });
      }]
    }
  })

  .state("new_branch", {
    url: '/them-moi-chi-nhanh',
    templateUrl: 'adminJS/bussinessAdmin/branch_management/information/new/_new.html',
    controller: 'BAnewBranchCtrl',
  })

  .state('thongKe', {
    url: '/thong-ke',
    templateUrl: 'adminJS/bussinessAdmin/thong_ke/_thong_ke.html',
    controller: 'BAthongKeCtrl',
    resolve: {
      duLieuThongKe: ['BAthongKeService', function(BAthongKeService){
        console.log("in resolve BAthongKeCtrl");
        var currentMonth = (new Date()).getMonth() + 1;
        var currentYear = (new Date()).getFullYear();
        return BAthongKeService.getThongKeToanDoanhNghiep(currentMonth, currentYear);
      }],
      duLieuThongKeTheoNgayTrongTuan: ['BAthongKeService', function(thongKeService){
        var from = thongKeService.getMonday(new Date());
        var to = thongKeService.getSunday(new Date());
        return thongKeService.getThongKeTheoNgayTrongTuan(from, to);
      }],
    }
  });

  $urlRouterProvider.otherwise('');
}]);