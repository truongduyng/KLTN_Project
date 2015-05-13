app.controller('ticketCtrl', ['$scope', 'tickets', 'ticket', 'branch', 'Auth', function($scope, tickets, ticket, branch, Auth){
  Auth.currentUser().then(function(user) {
    $scope.user = user;
  }, function(error) {
  });
  $scope.address = branch.branch.address;
  $scope.branchname = branch.branch.name;
  $scope.close_modal = function(){
    $scope.$close();
  };
  console.log(ticket, $scope.address);
}]);