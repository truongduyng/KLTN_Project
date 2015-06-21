app.controller('searchCtrl', ['$scope', '$http','$state', 'branches', 'posts', 'listPostService', function($scope, $http, $state, branches, posts, listPostService){

  console.log(branches.data, posts.data);
  listPostService.posts = posts.data;

}]);