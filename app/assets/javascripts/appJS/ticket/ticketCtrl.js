app.controller('ticketCtrl', ['$scope', 'tickets', function($scope, tickets, items){
    $scope.branch = items;
    $scope.close_modal = function(){
      $scope.$close();
    };
    console.log(tickets.tickets);
    console.log(items);
}]);