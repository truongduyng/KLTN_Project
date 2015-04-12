app.controller('createbussinessCtrl', ['$scope', '$http', '$state', '$location',
  function($scope, $http, $state, $location){
   $scope.requestbussiness = function() {
    if(!$scope.name || $scope.cate === '') {return ;}
    $http.post('/bussiness-create.json',{
     name: $scope.name,
     category: $scope.cate,
     description: $scope.description,
   }).then(function(data){
     $location.path("/");
     $state.go('home');
   },function(){
     alert("error");
   });
 };
}]);